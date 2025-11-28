import { Instrument, InstrumentAudioUnit, Instruments } from "../Api";
import { InstrumentFactories } from "@opendaw/studio-adapters";
export declare class InstrumentImpl implements Instrument {
    readonly audioUnit: InstrumentAudioUnit;
    readonly name: InstrumentFactories.Keys;
    readonly props?: Partial<Instruments[keyof Instruments]>;
    constructor(audioUnit: InstrumentAudioUnit, name: keyof Instruments, props?: Partial<Instruments[keyof Instruments]>);
}
//# sourceMappingURL=InstrumentImpl.d.ts.map