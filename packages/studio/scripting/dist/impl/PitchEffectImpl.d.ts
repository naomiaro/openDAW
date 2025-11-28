import { PitchEffect } from "../Api";
import { float, int } from "@opendaw/lib-std";
export declare class PitchEffectImpl implements PitchEffect {
    readonly key: "pitch";
    label: string;
    octaves: int;
    semiTones: int;
    cents: float;
    enabled: boolean;
    constructor(props?: Partial<PitchEffect>);
}
//# sourceMappingURL=PitchEffectImpl.d.ts.map