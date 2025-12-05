import {bipolar, Id, int, unitValue} from "@naomiarotest/lib-std"
import {AudioBuffer, NoteEvent, ppqn} from "@naomiarotest/lib-dsp"
import {Block} from "../processing"

export interface Voice {
    readonly id: int
    readonly gate: boolean
    readonly currentFrequency: number

    start(event: Id<NoteEvent>, frequency: number, gain: unitValue, spread: bipolar): void
    stop(): void
    forceStop(): void
    startGlide(targetFrequency: number, glideDuration: ppqn): void
    process(output: AudioBuffer, block: Block, fromIndex: int, toIndex: int): boolean
}