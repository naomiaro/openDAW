import {int} from "@naomiarotest/lib-std"

export interface PeakMeterProcessorOptions {
    sab: SharedArrayBuffer
    numberOfChannels: int
    rmsWindowInSeconds: number
    valueDecay: number
}