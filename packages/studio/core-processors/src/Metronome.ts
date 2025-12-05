import {BlockFlag, ProcessInfo} from "./processing"
import {AudioBuffer, Fragmentor, PPQN, RenderQuantum} from "@naomiarotest/lib-dsp"
import {assert, Bits, int, TAU} from "@naomiarotest/lib-std"
import {TimeInfo} from "./TimeInfo"
import {TimelineBoxAdapter} from "@naomiarotest/studio-adapters"

export class Metronome {
    readonly #timelineBoxAdapter: TimelineBoxAdapter
    readonly #timeInfo: TimeInfo
    readonly #output = new AudioBuffer()
    readonly #clicks: Click[] = []

    constructor(timelineBoxAdapter: TimelineBoxAdapter, timeInfo: TimeInfo) {
        this.#timelineBoxAdapter = timelineBoxAdapter
        this.#timeInfo = timeInfo
    }

    process({blocks}: ProcessInfo): void {
        blocks.forEach(({p0, p1, bpm, s0, s1, flags}) => {
            if (this.#timeInfo.metronomeEnabled && Bits.every(flags, BlockFlag.transporting)) {
                const [nominator, denominator] = this.#timelineBoxAdapter.signature
                const stepSize = PPQN.fromSignature(1, denominator)
                for (const position of Fragmentor.iterate(p0, p1, stepSize)) {
                    assert(p0 <= position && position < p1, () => `${position} out of bounds (${p0}, ${p1})`)
                    const distanceToEvent = Math.floor(PPQN.pulsesToSamples(position - p0, bpm, sampleRate))
                    this.#clicks.push(new Click(position, s0 + distanceToEvent, nominator, denominator))
                }
            }
            this.#output.clear(s0, s1)
            for (let i = this.#clicks.length - 1; i >= 0; i--) {
                const processor = this.#clicks[i]
                if (processor.processAdd(this.#output, s0, s1)) {
                    this.#clicks.splice(i, 1)
                }
            }
        })
    }

    get output(): AudioBuffer {return this.#output}
}

class Click {
    readonly #frequency: number

    #position: int = 0 | 0
    #startIndex: int = 0 | 0

    constructor(timeCode: number, startIndex: int, nominator: int, denominator: int) {
        assert(startIndex >= 0 && startIndex < RenderQuantum, `${startIndex} out of bounds`)
        this.#frequency = PPQN.toParts(timeCode, nominator, denominator).beats === 0 ? 880.0 : 440.0
        this.#startIndex = startIndex
    }

    processAdd(buffer: AudioBuffer, start: int, end: int): boolean {
        const [l, r] = buffer.channels()
        const attack = Math.floor(0.002 * sampleRate)
        const release = Math.floor(0.050 * sampleRate)
        for (let index = Math.max(this.#startIndex, start); index < end; index++) {
            const env = Math.min(this.#position / attack, 1.0 - (this.#position - attack) / release)
            const amp = Math.sin(this.#position / sampleRate * TAU * this.#frequency) * 0.25 * env * env
            l[index] += amp
            r[index] += amp
            if (++this.#position > attack + release) {return true}
        }
        this.#startIndex = 0
        return false
    }
}