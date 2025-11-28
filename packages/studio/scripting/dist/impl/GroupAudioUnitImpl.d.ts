import { AuxAudioUnit, GroupAudioUnit, Send } from "../Api";
import { AudioUnitImpl } from "./AudioUnitImpl";
import { SendImpl } from "./SendImpl";
export declare class GroupAudioUnitImpl extends AudioUnitImpl implements GroupAudioUnit {
    #private;
    readonly kind: "group";
    label: string;
    constructor(props?: Partial<GroupAudioUnit>);
    addSend(target: AuxAudioUnit | GroupAudioUnit, props?: Partial<Send>): Send;
    removeSend(send: Send): void;
    get sends(): ReadonlyArray<SendImpl>;
}
//# sourceMappingURL=GroupAudioUnitImpl.d.ts.map