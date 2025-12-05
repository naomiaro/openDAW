import {
    asEnumValue,
    int,
    Maybe,
    Notifier,
    Observer,
    Option,
    safeExecute,
    Subscription,
    Terminable,
    Terminator,
    UUID
} from "@naomiarotest/lib-std"
import {ppqn, TimeBase, TimeBaseConverter} from "@naomiarotest/lib-dsp"
import {Address, Field, PointerField, Propagation, Update} from "@naomiarotest/lib-box"
import {AudioPlayback, Pointers} from "@naomiarotest/studio-enums"
import {AudioRegionBox} from "@naomiarotest/studio-boxes"
import {LoopableRegionBoxAdapter, RegionBoxAdapter, RegionBoxAdapterVisitor} from "../RegionBoxAdapter"
import {TrackBoxAdapter} from "../TrackBoxAdapter"
import {BoxAdaptersContext} from "../../BoxAdaptersContext"
import {AudioFileBoxAdapter} from "../../audio/AudioFileBoxAdapter"
import {MutableRegion} from "./MutableRegion"
import {ValueEventCollectionBoxAdapter} from "../collection/ValueEventCollectionBoxAdapter"

type CopyToParams = {
    track?: Field<Pointers.RegionCollection>
    position?: ppqn
    duration?: ppqn
    loopOffset?: ppqn
    loopDuration?: ppqn
    consolidate?: boolean
}

export class AudioRegionBoxAdapter implements LoopableRegionBoxAdapter<ValueEventCollectionBoxAdapter>, MutableRegion {
    readonly type = "audio-region"

    readonly #terminator: Terminator

    readonly #context: BoxAdaptersContext
    readonly #box: AudioRegionBox

    readonly #durationConverter: TimeBaseConverter
    readonly #loopOffsetConverter: TimeBaseConverter
    readonly #loopDurationConverter: TimeBaseConverter
    readonly #changeNotifier: Notifier<void>

    #fileAdapter: Option<AudioFileBoxAdapter> = Option.None
    #fileSubscription: Terminable = Terminable.Empty
    #tempoSubscription: Terminable = Terminable.Empty
    #eventCollectionSubscription: Subscription = Terminable.Empty

    #isSelected: boolean
    #constructing: boolean

    constructor(context: BoxAdaptersContext, box: AudioRegionBox) {
        this.#context = context
        this.#box = box

        this.#terminator = new Terminator()
        const {timeBase, position, duration, loopOffset, loopDuration} = box
        this.#durationConverter = TimeBaseConverter.aware(context.tempoMap, timeBase, position, duration)
        this.#loopOffsetConverter = TimeBaseConverter.aware(context.tempoMap, timeBase, position, loopOffset)
        this.#loopDurationConverter = TimeBaseConverter.aware(context.tempoMap, timeBase, position, loopDuration)
        this.#changeNotifier = new Notifier<void>()

        this.#isSelected = false
        this.#constructing = true

        this.#terminator.ownAll(
            this.#box.pointerHub.subscribe({
                onAdded: () => this.#dispatchChange(),
                onRemoved: () => this.#dispatchChange()
            }),
            this.#box.file.catchupAndSubscribe((pointerField: PointerField<Pointers.AudioFile>) => {
                this.#fileAdapter = pointerField.targetVertex.map(vertex =>
                    this.#context.boxAdapters.adapterFor(vertex.box, AudioFileBoxAdapter))
                this.#fileSubscription.terminate()
                this.#fileSubscription = this.#fileAdapter.mapOr(adapter =>
                    adapter.getOrCreateLoader().subscribe(() => this.#dispatchChange()), Terminable.Empty)
            }),
            this.#box.timeBase.catchupAndSubscribe(owner => {
                this.#tempoSubscription.terminate()
                if (asEnumValue(owner.getValue(), TimeBase) === TimeBase.Seconds) {
                    this.#tempoSubscription = context.tempoMap.subscribe(() => this.#dispatchChange())
                }
            }),
            this.#box.subscribe(Propagation.Children, (update: Update) => {
                if (this.trackBoxAdapter.isEmpty()) {return}
                if (update.type === "primitive" || update.type === "pointer") {
                    const track = this.trackBoxAdapter.unwrap()
                    if (this.#box.position.address.equals(update.address)) {
                        track.regions.onIndexingChanged()
                        this.#dispatchChange()
                    } else {
                        this.#dispatchChange()
                    }
                }
            }),
            this.#box.events.catchupAndSubscribe(({targetVertex}) => {
                this.#eventCollectionSubscription.terminate()
                this.#eventCollectionSubscription = targetVertex.match({
                    none: () => Terminable.Empty,
                    some: ({box}) => this.#context.boxAdapters
                        .adapterFor(box, ValueEventCollectionBoxAdapter)
                        .subscribeChange(() => this.#dispatchChange())
                })
                this.#dispatchChange()
            }),
            {
                terminate: (): void => {
                    this.#fileSubscription.terminate()
                    this.#fileSubscription = Terminable.Empty
                    this.#tempoSubscription.terminate()
                    this.#tempoSubscription = Terminable.Empty
                }
            }
        )
        this.#constructing = false
    }

    subscribeChange(observer: Observer<void>): Subscription {return this.#changeNotifier.subscribe(observer)}

    accept<R>(visitor: RegionBoxAdapterVisitor<R>): Maybe<R> {
        return safeExecute(visitor.visitAudioRegionBoxAdapter, this)
    }

    onSelected(): void {
        this.#isSelected = true
        this.#dispatchChange()
    }

    onDeselected(): void {
        this.#isSelected = false
        this.#dispatchChange()
    }

    get isSelected(): boolean {return this.#isSelected}

    get box(): AudioRegionBox {return this.#box}
    get uuid(): UUID.Bytes {return this.#box.address.uuid}
    get address(): Address {return this.#box.address}
    get position(): ppqn {return this.#box.position.getValue()}
    get duration(): ppqn {return this.#durationConverter.toPPQN()}
    get complete(): ppqn {return this.position + this.duration}
    get loopOffset(): ppqn {return this.#loopOffsetConverter.toPPQN()}
    get loopDuration(): ppqn {return this.#loopDurationConverter.toPPQN()}
    get offset(): ppqn {return this.position - this.loopOffset}
    get mute(): boolean {return this.#box.mute.getValue()}
    get hue(): int {return this.#box.hue.getValue()}
    get gain(): number {return this.#box.gain.getValue()}
    get file(): AudioFileBoxAdapter {return this.#fileAdapter.unwrap("Cannot access file.")}
    get timeBase(): TimeBase {return asEnumValue(this.#box.timeBase.getValue(), TimeBase)}
    get label(): string {
        if (this.#fileAdapter.isEmpty()) {return "No Audio File"}
        const state = this.#fileAdapter.unwrap().getOrCreateLoader().state
        if (state.type === "progress") {return `${Math.round(state.progress * 100)}%`}
        if (state.type === "error") {return String(state.reason)}
        return this.#box.label.getValue()
    }
    get isMirrowed(): boolean {return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false)}
    get canMirror(): boolean {return true}
    get trackBoxAdapter(): Option<TrackBoxAdapter> {
        return this.#box.regions.targetVertex
            .map(vertex => this.#context.boxAdapters.adapterFor(vertex.box, TrackBoxAdapter))
    }
    get hasCollection() {return this.optCollection.nonEmpty()}
    get optCollection(): Option<ValueEventCollectionBoxAdapter> {
        return this.#box.events.targetVertex
            .map(vertex => this.#context.boxAdapters.adapterFor(vertex.box, ValueEventCollectionBoxAdapter))
    }
    set position(value: ppqn) {this.#box.position.setValue(value)}
    set duration(value: ppqn) {this.#durationConverter.fromPPQN(value)}
    set loopOffset(value: ppqn) {this.#loopOffsetConverter.fromPPQN(value)}
    set loopDuration(value: ppqn) {this.#loopDurationConverter.fromPPQN(value)}
    get playback(): AudioPlayback {return asEnumValue(this.#box.playback.getValue(), AudioPlayback)}

    setPlayback(value: AudioPlayback, keepCurrentStretch: boolean = false) {
        const wasMusical = this.timeBase === TimeBase.Musical
        this.#box.playback.setValue(value)
        if (value === AudioPlayback.NoSync) {
            if (wasMusical) {
                if (keepCurrentStretch) {
                    const duration = this.#durationConverter.toSeconds()
                    const loopDuration = this.#loopDurationConverter.toSeconds()
                    const loopOffset = this.#loopOffsetConverter.toSeconds()
                    this.#box.timeBase.setValue(TimeBase.Seconds)
                    this.#box.duration.setValue(duration)
                    this.#box.loopDuration.setValue(loopDuration)
                    this.#box.loopOffset.setValue(loopOffset)
                } else {
                    // Reset to 100% playback speed (original file speed)
                    const fileDuration = this.file.endInSeconds - this.file.startInSeconds
                    const currentLoopDurationSeconds = this.#loopDurationConverter.toSeconds()
                    const scale = fileDuration / currentLoopDurationSeconds
                    const currentDurationSeconds = this.#durationConverter.toSeconds()
                    const currentLoopOffsetSeconds = this.#loopOffsetConverter.toSeconds()
                    this.#box.timeBase.setValue(TimeBase.Seconds)
                    this.#box.duration.setValue(currentDurationSeconds * scale)
                    this.#box.loopDuration.setValue(fileDuration)
                    this.#box.loopOffset.setValue(currentLoopOffsetSeconds * scale)
                }
            }
        } else {
            // Switching TO musical (Pitch/Timestretch/AudioFit)
            if (!wasMusical) {
                const duration = this.#durationConverter.toPPQN()
                const loopDuration = this.#loopDurationConverter.toPPQN()
                const loopOffset = this.#loopOffsetConverter.toPPQN()
                this.#box.timeBase.setValue(TimeBase.Musical)
                this.#box.duration.setValue(duration)
                this.#box.loopOffset.setValue(loopOffset)
                this.#box.loopDuration.setValue(loopDuration)
            }
        }
    }

    copyTo(params?: CopyToParams): AudioRegionBoxAdapter {
        const eventCollection = this.optCollection.unwrap("Cannot make copy without event-collection")
        const eventTarget = params?.consolidate === true
            ? eventCollection.copy().box.owners
            : eventCollection.box.owners
        return this.#context.boxAdapters.adapterFor(
            AudioRegionBox.create(this.#context.boxGraph, UUID.generate(), box => {
                box.timeBase.setValue(this.#box.timeBase.getValue())
                box.position.setValue(params?.position ?? this.#box.position.getValue())
                // TODO Respect time-base.
                box.duration.setValue(params?.duration ?? this.#box.duration.getValue())
                box.loopOffset.setValue(params?.loopOffset ?? this.#box.loopOffset.getValue())
                box.loopDuration.setValue(params?.loopDuration ?? this.#box.loopDuration.getValue())
                box.regions.refer(params?.track ?? this.#box.regions.targetVertex.unwrap())
                box.file.refer(this.#box.file.targetVertex.unwrap())
                box.events.refer(eventTarget)
                box.mute.setValue(this.mute)
                box.hue.setValue(this.hue)
                box.label.setValue(this.label)
                box.gain.setValue(this.gain)
            }), AudioRegionBoxAdapter)
    }

    consolidate(): void {
        // TODO This needs to done by creating a new audio file
    }
    canFlatten(_regions: ReadonlyArray<RegionBoxAdapter<unknown>>): boolean {return false}
    flatten(_regions: ReadonlyArray<RegionBoxAdapter<unknown>>): Option<AudioRegionBox> {
        // TODO This needs to done by creating a new audio file
        return Option.None
    }

    terminate() {
        this.#eventCollectionSubscription.terminate()
        this.#terminator.terminate()
    }

    toString(): string {return `{AudioRegionBoxAdapter ${UUID.toString(this.#box.address.uuid)}}`}

    #dispatchChange(): void {
        if (this.#constructing) {return}
        this.#changeNotifier.notify()
        this.trackBoxAdapter.unwrapOrNull()?.regions?.dispatchChange()
    }
}