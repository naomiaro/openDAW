import {AudioDeviceProcessor} from "./AudioDeviceProcessor"
import {AudioInput} from "./processing"
import {int} from "@naomiarotest/lib-std"
import {AudioEffectDeviceAdapter} from "@naomiarotest/studio-adapters"

export interface AudioEffectDeviceProcessor extends AudioDeviceProcessor, AudioInput {
    index(): int
    adapter(): AudioEffectDeviceAdapter
}