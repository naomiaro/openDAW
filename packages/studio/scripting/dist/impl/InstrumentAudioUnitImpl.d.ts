import { AuxAudioUnit, GroupAudioUnit, Instrument, InstrumentAudioUnit, Instruments, Send } from "../Api";
import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
import { InstrumentImpl } from "./InstrumentImpl";
export declare class InstrumentAudioUnitImpl extends AudioUnitImpl implements InstrumentAudioUnit {
    #private;
    readonly kind: "instrument";
    instrument: InstrumentImpl;
    constructor(instrumentName: keyof Instruments, props?: Partial<Instruments[keyof Instruments]>);
    setInstrument(instrumentName: keyof Instruments, props?: Partial<Instruments[keyof Instruments]>): Instrument;
    addSend(target: AuxAudioUnit | GroupAudioUnit, props?: Partial<Send>): Send;
    removeSend(send: Send): void;
    get sends(): ReadonlyArray<SendImpl>;
}
//# sourceMappingURL=InstrumentAudioUnitImpl.d.ts.map