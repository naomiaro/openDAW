import {assert, Bits, isInstanceOf, Option, SortedSet, UUID} from "@naomiarotest/lib-std"
import {AudioBuffer, LoopableRegion, RenderQuantum} from "@naomiarotest/lib-dsp"
import {
    AudioClipBoxAdapter,
    AudioData,
    AudioRegionBoxAdapter,
    SampleLoader,
    TapeDeviceBoxAdapter,
    TrackBoxAdapter,
    TrackType
} from "@naomiarotest/studio-adapters"
import {EngineContext} from "../../EngineContext"
import {AudioGenerator, Block, BlockFlag, ProcessInfo, Processor} from "../../processing"
import {AbstractProcessor} from "../../AbstractProcessor"
import {PeakBroadcaster} from "../../PeakBroadcaster"
import {AutomatableParameter} from "../../AutomatableParameter"
import {NoteEventTarget} from "../../NoteEventSource"
import {DeviceProcessor} from "../../DeviceProcessor"

type Lane = { adapter: TrackBoxAdapter, lastRead: number, lastStepSize: number }

export class TapeDeviceProcessor extends AbstractProcessor implements DeviceProcessor, AudioGenerator {
    readonly #adapter: TapeDeviceBoxAdapter
    readonly #audioOutput: AudioBuffer
    readonly #peaks: PeakBroadcaster
    readonly #lanes: SortedSet<UUID.Bytes, Lane>

    readonly #fadeLength: number = 128

    constructor(context: EngineContext, adapter: TapeDeviceBoxAdapter) {
        super(context)

        this.#adapter = adapter
        this.#audioOutput = new AudioBuffer(2)
        this.#peaks = this.own(new PeakBroadcaster(context.broadcaster, adapter.address))
        this.#lanes = UUID.newSet<Lane>(({adapter: {uuid}}) => uuid)

        this.ownAll(
            this.#adapter.deviceHost().audioUnitBoxAdapter().tracks.catchupAndSubscribe({
                onAdd: (adapter: TrackBoxAdapter) => this.#lanes.add({adapter, lastRead: NaN, lastStepSize: 0.0}),
                onRemove: (adapter: TrackBoxAdapter) => this.#lanes.removeByKey(adapter.uuid),
                onReorder: (_adapter: TrackBoxAdapter) => {}
            }),
            context.registerProcessor(this)
        )
    }

    get noteEventTarget(): Option<NoteEventTarget & DeviceProcessor> {return Option.None}

    reset(): void {
        this.#peaks.clear()
        this.#audioOutput.clear()
        this.eventInput.clear()
    }

    get uuid(): UUID.Bytes {return this.#adapter.uuid}
    get incoming(): Processor {return this}
    get outgoing(): Processor {return this}
    get audioOutput(): AudioBuffer {return this.#audioOutput}

    process({blocks}: ProcessInfo): void {
        this.#audioOutput.clear(0, RenderQuantum)
        const [outL, outR] = this.#audioOutput.channels()
        this.#lanes.forEach(lane => blocks.forEach((block) => {
            const {adapter} = lane
            if (adapter.type !== TrackType.Audio || !adapter.enabled.getValue()) {return}
            const {p0, p1, flags} = block
            if (!Bits.every(flags, BlockFlag.transporting | BlockFlag.playing)) {return}
            const intervals = this.context.clipSequencing.iterate(adapter.uuid, p0, p1)
            for (const {optClip, sectionFrom, sectionTo} of intervals) {
                optClip.match({
                    none: () => {
                        for (const region of adapter.regions.collection.iterateRange(p0, p1)) {
                            if (region.mute || !isInstanceOf(region, AudioRegionBoxAdapter)) {continue}
                            const loader: SampleLoader = region.file.getOrCreateLoader()
                            const optData = loader.data
                            if (optData.isEmpty()) {return}
                            const data = optData.unwrap()
                            for (const cycle of LoopableRegion.locateLoops(region, p0, p1)) {
                                this.#processPass(this.#audioOutput, data, cycle, block, lane)
                            }
                        }
                    },
                    some: clip => {
                        if (!isInstanceOf(clip, AudioClipBoxAdapter)) {return}
                        const optData = clip.file.getOrCreateLoader().data
                        if (optData.isEmpty()) {return}
                        const data = optData.unwrap()
                        for (const cycle of LoopableRegion.locateLoops({
                            position: 0.0,
                            loopDuration: clip.duration,
                            loopOffset: 0.0,
                            complete: Number.POSITIVE_INFINITY
                        }, sectionFrom, sectionTo)) {
                            this.#processPass(this.#audioOutput, data, cycle, block, lane)
                        }
                    }
                })
            }
        }))

        this.#audioOutput.assertSanity()
        this.#peaks.process(outL, outR)
    }

    parameterChanged(_parameter: AutomatableParameter): void {}

    #processPass(output: AudioBuffer,
                 data: AudioData,
                 cycle: LoopableRegion.LoopCycle,
                 {p0, p1, s0, s1}: Block,
                 lane: Lane): void {
        const [outL, outR] = output.channels()
        const {numberOfFrames, frames} = data
        const framesL = frames[0]
        const framesR = frames.length === 1 ? frames[0] : frames[1]
        const sn = s1 - s0
        const pn = p1 - p0
        const wp0 = numberOfFrames * cycle.resultStartValue
        const wp1 = numberOfFrames * cycle.resultEndValue
        const r0 = (cycle.resultStart - p0) / pn
        const r1 = (cycle.resultEnd - p0) / pn
        const bp0 = s0 + sn * r0
        const bp1 = s0 + sn * r1
        const bpn = (bp1 - bp0) | 0
        const stepSize = (wp1 - wp0) / bpn
        assert(s0 <= bp0 && bp1 <= s1, `Out of bounds ${bp0}, ${bp1}`)
        const fading = !Number.isFinite(lane.lastRead) || Math.abs(wp0 - (lane.lastRead + stepSize)) > 2.0
        for (let i = 0 | 0, j = bp0 | 0; i < bpn; i++, j++) {
            const readNew = wp0 + i * stepSize
            const readNewInt = readNew | 0
            let lNew = 0.0, rNew = 0.0
            if (readNewInt >= 0 && readNewInt < numberOfFrames - 1) {
                const alpha = readNew - readNewInt
                const fL = framesL[readNewInt]
                const fR = framesR[readNewInt]
                lNew = fL + alpha * (framesL[readNewInt + 1] - fL)
                rNew = fR + alpha * (framesR[readNewInt + 1] - fR)
            }
            if (fading && i < this.#fadeLength && Number.isFinite(lane.lastRead)) {
                const fadeIn = i / this.#fadeLength
                const fadeOut = 1.0 - fadeIn
                const readOld = lane.lastRead + i * lane.lastStepSize
                const readOldInt = readOld | 0
                if (readOldInt >= 0 && readOldInt < numberOfFrames - 1) {
                    const alpha = readOld - readOldInt
                    const fL = framesL[readOldInt]
                    const fR = framesR[readOldInt]
                    const lOld = fL + alpha * (framesL[readOldInt + 1] - fL)
                    const rOld = fR + alpha * (framesR[readOldInt + 1] - fR)
                    outL[j] += fadeOut * lOld + fadeIn * lNew
                    outR[j] += fadeOut * rOld + fadeIn * rNew
                } else {
                    outL[j] += lNew
                    outR[j] += rNew
                }
            } else {
                outL[j] += lNew
                outR[j] += rNew
            }
        }
        lane.lastRead = wp0 + (bpn - 1) * stepSize
        lane.lastStepSize = stepSize
    }
}