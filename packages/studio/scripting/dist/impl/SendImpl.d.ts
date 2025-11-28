import { bipolar } from "@opendaw/lib-std";
import { AuxAudioUnit, GroupAudioUnit, Send } from "../Api";
export declare class SendImpl implements Send {
    readonly target: AuxAudioUnit | GroupAudioUnit;
    amount: number;
    pan: bipolar;
    mode: "pre" | "post";
    constructor(target: AuxAudioUnit | GroupAudioUnit, props?: Partial<Send>);
}
//# sourceMappingURL=SendImpl.d.ts.map