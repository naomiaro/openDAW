import {SampleLoaderManager, SoundfontLoaderManager} from "@naomiarotest/studio-adapters"
import {AudioWorklets} from "../AudioWorklets"

export interface ProjectEnv {
    audioContext: AudioContext
    audioWorklets: AudioWorklets
    sampleManager: SampleLoaderManager
    soundfontManager: SoundfontLoaderManager
}