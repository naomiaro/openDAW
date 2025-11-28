var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AudioRegionBoxAdapter_instances, _AudioRegionBoxAdapter_terminator, _AudioRegionBoxAdapter_context, _AudioRegionBoxAdapter_box, _AudioRegionBoxAdapter_durationConverter, _AudioRegionBoxAdapter_loopOffsetConverter, _AudioRegionBoxAdapter_loopDurationConverter, _AudioRegionBoxAdapter_changeNotifier, _AudioRegionBoxAdapter_fileAdapter, _AudioRegionBoxAdapter_fileSubscription, _AudioRegionBoxAdapter_tempoSubscription, _AudioRegionBoxAdapter_eventCollectionSubscription, _AudioRegionBoxAdapter_isSelected, _AudioRegionBoxAdapter_constructing, _AudioRegionBoxAdapter_dispatchChange;
import { asEnumValue, Notifier, Option, safeExecute, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { TimeBase, TimeBaseConverter } from "@opendaw/lib-dsp";
import { Propagation } from "@opendaw/lib-box";
import { AudioPlayback } from "@opendaw/studio-enums";
import { AudioRegionBox } from "@opendaw/studio-boxes";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { AudioFileBoxAdapter } from "../../audio/AudioFileBoxAdapter";
import { ValueEventCollectionBoxAdapter } from "../collection/ValueEventCollectionBoxAdapter";
export class AudioRegionBoxAdapter {
    constructor(context, box) {
        _AudioRegionBoxAdapter_instances.add(this);
        this.type = "audio-region";
        _AudioRegionBoxAdapter_terminator.set(this, void 0);
        _AudioRegionBoxAdapter_context.set(this, void 0);
        _AudioRegionBoxAdapter_box.set(this, void 0);
        _AudioRegionBoxAdapter_durationConverter.set(this, void 0);
        _AudioRegionBoxAdapter_loopOffsetConverter.set(this, void 0);
        _AudioRegionBoxAdapter_loopDurationConverter.set(this, void 0);
        _AudioRegionBoxAdapter_changeNotifier.set(this, void 0);
        _AudioRegionBoxAdapter_fileAdapter.set(this, Option.None);
        _AudioRegionBoxAdapter_fileSubscription.set(this, Terminable.Empty);
        _AudioRegionBoxAdapter_tempoSubscription.set(this, Terminable.Empty);
        _AudioRegionBoxAdapter_eventCollectionSubscription.set(this, Terminable.Empty);
        _AudioRegionBoxAdapter_isSelected.set(this, void 0);
        _AudioRegionBoxAdapter_constructing.set(this, void 0);
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_terminator, new Terminator(), "f");
        const { timeBase, position, duration, loopOffset, loopDuration } = box;
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_durationConverter, TimeBaseConverter.aware(context.tempoMap, timeBase, position, duration), "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_loopOffsetConverter, TimeBaseConverter.aware(context.tempoMap, timeBase, position, loopOffset), "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_loopDurationConverter, TimeBaseConverter.aware(context.tempoMap, timeBase, position, loopDuration), "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_changeNotifier, new Notifier(), "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_constructing, true, "f");
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this)
        }), __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").file.catchupAndSubscribe((pointerField) => {
            __classPrivateFieldSet(this, _AudioRegionBoxAdapter_fileAdapter, pointerField.targetVertex.map(vertex => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, AudioFileBoxAdapter)), "f");
            __classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileSubscription, "f").terminate();
            __classPrivateFieldSet(this, _AudioRegionBoxAdapter_fileSubscription, __classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileAdapter, "f").mapOr(adapter => adapter.getOrCreateLoader().subscribe(() => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this)), Terminable.Empty), "f");
        }), __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.catchupAndSubscribe(owner => {
            __classPrivateFieldGet(this, _AudioRegionBoxAdapter_tempoSubscription, "f").terminate();
            if (asEnumValue(owner.getValue(), TimeBase) === TimeBase.Seconds) {
                __classPrivateFieldSet(this, _AudioRegionBoxAdapter_tempoSubscription, context.tempoMap.subscribe(() => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this)), "f");
            }
        }), __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.trackBoxAdapter.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const track = this.trackBoxAdapter.unwrap();
                if (__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").position.address.equals(update.address)) {
                    track.regions.onIndexingChanged();
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this);
                }
                else {
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this);
                }
            }
        }), __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").events.catchupAndSubscribe(({ targetVertex }) => {
            __classPrivateFieldGet(this, _AudioRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
            __classPrivateFieldSet(this, _AudioRegionBoxAdapter_eventCollectionSubscription, targetVertex.match({
                none: () => Terminable.Empty,
                some: ({ box }) => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxAdapters
                    .adapterFor(box, ValueEventCollectionBoxAdapter)
                    .subscribeChange(() => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this))
            }), "f");
            __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this);
        }), {
            terminate: () => {
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileSubscription, "f").terminate();
                __classPrivateFieldSet(this, _AudioRegionBoxAdapter_fileSubscription, Terminable.Empty, "f");
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_tempoSubscription, "f").terminate();
                __classPrivateFieldSet(this, _AudioRegionBoxAdapter_tempoSubscription, Terminable.Empty, "f");
            }
        });
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_constructing, false, "f");
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) {
        return safeExecute(visitor.visitAudioRegionBoxAdapter, this);
    }
    onSelected() {
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_isSelected, true, "f");
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this);
    }
    onDeselected() {
        __classPrivateFieldSet(this, _AudioRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_instances, "m", _AudioRegionBoxAdapter_dispatchChange).call(this);
    }
    get isSelected() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_isSelected, "f"); }
    get box() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").position.getValue(); }
    get duration() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_durationConverter, "f").toPPQN(); }
    get complete() { return this.position + this.duration; }
    get loopOffset() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopOffsetConverter, "f").toPPQN(); }
    get loopDuration() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopDurationConverter, "f").toPPQN(); }
    get offset() { return this.position - this.loopOffset; }
    get mute() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").hue.getValue(); }
    get gain() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").gain.getValue(); }
    get file() { return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileAdapter, "f").unwrap("Cannot access file."); }
    get timeBase() { return asEnumValue(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.getValue(), TimeBase); }
    get label() {
        if (__classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileAdapter, "f").isEmpty()) {
            return "No Audio File";
        }
        const state = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_fileAdapter, "f").unwrap().getOrCreateLoader().state;
        if (state.type === "progress") {
            return `${Math.round(state.progress * 100)}%`;
        }
        if (state.type === "error") {
            return String(state.reason);
        }
        return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").label.getValue();
    }
    get isMirrowed() { return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false); }
    get canMirror() { return true; }
    get trackBoxAdapter() {
        return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").regions.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get hasCollection() { return this.optCollection.nonEmpty(); }
    get optCollection() {
        return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, ValueEventCollectionBoxAdapter));
    }
    set position(value) { __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").position.setValue(value); }
    set duration(value) { __classPrivateFieldGet(this, _AudioRegionBoxAdapter_durationConverter, "f").fromPPQN(value); }
    set loopOffset(value) { __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopOffsetConverter, "f").fromPPQN(value); }
    set loopDuration(value) { __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopDurationConverter, "f").fromPPQN(value); }
    get playback() { return asEnumValue(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").playback.getValue(), AudioPlayback); }
    setPlayback(value, keepCurrentStretch = false) {
        const wasMusical = this.timeBase === TimeBase.Musical;
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").playback.setValue(value);
        if (value === AudioPlayback.NoSync) {
            if (wasMusical) {
                if (keepCurrentStretch) {
                    const duration = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_durationConverter, "f").toSeconds();
                    const loopDuration = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopDurationConverter, "f").toSeconds();
                    const loopOffset = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopOffsetConverter, "f").toSeconds();
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.setValue(TimeBase.Seconds);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").duration.setValue(duration);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopDuration.setValue(loopDuration);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopOffset.setValue(loopOffset);
                }
                else {
                    // Reset to 100% playback speed (original file speed)
                    const fileDuration = this.file.endInSeconds - this.file.startInSeconds;
                    const currentLoopDurationSeconds = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopDurationConverter, "f").toSeconds();
                    const scale = fileDuration / currentLoopDurationSeconds;
                    const currentDurationSeconds = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_durationConverter, "f").toSeconds();
                    const currentLoopOffsetSeconds = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopOffsetConverter, "f").toSeconds();
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.setValue(TimeBase.Seconds);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").duration.setValue(currentDurationSeconds * scale);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopDuration.setValue(fileDuration);
                    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopOffset.setValue(currentLoopOffsetSeconds * scale);
                }
            }
        }
        else {
            // Switching TO musical (Pitch/Timestretch/AudioFit)
            if (!wasMusical) {
                const duration = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_durationConverter, "f").toPPQN();
                const loopDuration = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopDurationConverter, "f").toPPQN();
                const loopOffset = __classPrivateFieldGet(this, _AudioRegionBoxAdapter_loopOffsetConverter, "f").toPPQN();
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.setValue(TimeBase.Musical);
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").duration.setValue(duration);
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopOffset.setValue(loopOffset);
                __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopDuration.setValue(loopDuration);
            }
        }
    }
    copyTo(params) {
        const eventCollection = this.optCollection.unwrap("Cannot make copy without event-collection");
        const eventTarget = params?.consolidate === true
            ? eventCollection.copy().box.owners
            : eventCollection.box.owners;
        return __classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxAdapters.adapterFor(AudioRegionBox.create(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.timeBase.setValue(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").timeBase.getValue());
            box.position.setValue(params?.position ?? __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").position.getValue());
            // TODO Respect time-base.
            box.duration.setValue(params?.duration ?? __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").duration.getValue());
            box.loopOffset.setValue(params?.loopOffset ?? __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopOffset.getValue());
            box.loopDuration.setValue(params?.loopDuration ?? __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").loopDuration.getValue());
            box.regions.refer(params?.track ?? __classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").regions.targetVertex.unwrap());
            box.file.refer(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").file.targetVertex.unwrap());
            box.events.refer(eventTarget);
            box.mute.setValue(this.mute);
            box.hue.setValue(this.hue);
            box.label.setValue(this.label);
            box.gain.setValue(this.gain);
        }), AudioRegionBoxAdapter);
    }
    consolidate() {
        // TODO This needs to done by creating a new audio file
    }
    canFlatten(_regions) { return false; }
    flatten(_regions) {
        // TODO This needs to done by creating a new audio file
        return Option.None;
    }
    terminate() {
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
        __classPrivateFieldGet(this, _AudioRegionBoxAdapter_terminator, "f").terminate();
    }
    toString() { return `{AudioRegionBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _AudioRegionBoxAdapter_box, "f").address.uuid)}}`; }
}
_AudioRegionBoxAdapter_terminator = new WeakMap(), _AudioRegionBoxAdapter_context = new WeakMap(), _AudioRegionBoxAdapter_box = new WeakMap(), _AudioRegionBoxAdapter_durationConverter = new WeakMap(), _AudioRegionBoxAdapter_loopOffsetConverter = new WeakMap(), _AudioRegionBoxAdapter_loopDurationConverter = new WeakMap(), _AudioRegionBoxAdapter_changeNotifier = new WeakMap(), _AudioRegionBoxAdapter_fileAdapter = new WeakMap(), _AudioRegionBoxAdapter_fileSubscription = new WeakMap(), _AudioRegionBoxAdapter_tempoSubscription = new WeakMap(), _AudioRegionBoxAdapter_eventCollectionSubscription = new WeakMap(), _AudioRegionBoxAdapter_isSelected = new WeakMap(), _AudioRegionBoxAdapter_constructing = new WeakMap(), _AudioRegionBoxAdapter_instances = new WeakSet(), _AudioRegionBoxAdapter_dispatchChange = function _AudioRegionBoxAdapter_dispatchChange() {
    if (__classPrivateFieldGet(this, _AudioRegionBoxAdapter_constructing, "f")) {
        return;
    }
    __classPrivateFieldGet(this, _AudioRegionBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.regions?.dispatchChange();
};
