import {Voice} from "./Voice"
import {NoteEvent, ppqn} from "@naomiarotest/lib-dsp"

export interface VoicingHost {
    create(): Voice
    computeFrequency(event: NoteEvent): number
    get glideTime(): ppqn
}