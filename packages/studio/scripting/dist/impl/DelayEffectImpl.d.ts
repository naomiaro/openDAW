import { DelayEffect } from "../Api";
export declare class DelayEffectImpl implements DelayEffect {
    readonly key: "delay";
    label: string;
    enabled: boolean;
    delay: number;
    feedback: number;
    cross: number;
    filter: number;
    wet: number;
    dry: number;
    constructor(props?: Partial<DelayEffect>);
}
//# sourceMappingURL=DelayEffectImpl.d.ts.map