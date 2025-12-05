import {NoteEvent, ppqn} from "@naomiarotest/lib-dsp"
import {int} from "@naomiarotest/lib-std"

export type UINoteEvent = NoteEvent & {
    isSelected: boolean
    complete: ppqn
    chance: number
    playCount: int
    playCurve: number
}