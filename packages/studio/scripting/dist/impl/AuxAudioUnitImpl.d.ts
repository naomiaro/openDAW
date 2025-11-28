import { AuxAudioUnit, GroupAudioUnit, Send } from "../Api";
import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
export declare class AuxAudioUnitImpl extends AudioUnitImpl implements AuxAudioUnit {
    #private;
    readonly kind: "auxiliary";
    label: string;
    constructor(props?: Partial<GroupAudioUnit>);
    addSend(target: AuxAudioUnit | GroupAudioUnit, props?: Partial<Send>): Send;
    removeSend(send: Send): void;
    get sends(): ReadonlyArray<SendImpl>;
}
//# sourceMappingURL=AuxAudioUnitImpl.d.ts.map