import { BoxGraph } from "@opendaw/lib-box";
import { Attempt, int } from "@opendaw/lib-std";
export declare namespace Validator {
    const isTimeSignatureValid: (numerator: int, denominator: int) => Attempt<[int, int], string>;
    const MIN_BPM = 30;
    const MAX_BPM = 1000;
    const clampBpm: (bpm: number) => number;
    const hasOverlappingRegions: (boxGraph: BoxGraph) => boolean;
}
//# sourceMappingURL=Validator.d.ts.map