import { int } from "@opendaw/lib-std";
import { AuxAudioUnit, GroupAudioUnit, InstrumentAudioUnit, Instruments, OutputAudioUnit, Project } from "../Api";
import { ApiImpl } from "./ApiImpl";
import { InstrumentAudioUnitImpl } from "./InstrumentAudioUnitImpl";
import { AuxAudioUnitImpl } from "./AuxAudioUnitImpl";
import { GroupAudioUnitImpl } from "./GroupAudioUnitImpl";
export declare class ProjectImpl implements Project {
    #private;
    readonly output: OutputAudioUnit;
    name: string;
    bpm: number;
    timeSignature: {
        numerator: int;
        denominator: int;
    };
    constructor(api: ApiImpl, name: string);
    openInStudio(): void;
    addInstrumentUnit<KEY extends keyof Instruments>(name: KEY, props?: Partial<Instruments[KEY]>): InstrumentAudioUnit;
    addAuxUnit(props?: Partial<GroupAudioUnit>): AuxAudioUnit;
    addGroupUnit(props?: Partial<GroupAudioUnit>): GroupAudioUnit;
    get instrumentUnits(): ReadonlyArray<InstrumentAudioUnitImpl>;
    get auxUnits(): ReadonlyArray<AuxAudioUnitImpl>;
    get groupUnits(): ReadonlyArray<GroupAudioUnitImpl>;
}
//# sourceMappingURL=ProjectImpl.d.ts.map