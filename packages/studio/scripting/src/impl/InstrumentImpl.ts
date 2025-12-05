import {Instrument, InstrumentAudioUnit, Instruments} from "../Api"
import {InstrumentFactories} from "@naomiarotest/studio-adapters"

export class InstrumentImpl implements Instrument {
    readonly audioUnit: InstrumentAudioUnit
    readonly name: InstrumentFactories.Keys

    readonly props?: Partial<Instruments[keyof Instruments]>

    constructor(audioUnit: InstrumentAudioUnit, name: keyof Instruments, props?: Partial<Instruments[keyof Instruments]>) {
        this.audioUnit = audioUnit
        this.name = name
        this.props = props
    }
}
