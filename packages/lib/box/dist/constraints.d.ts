import { float, int } from "@opendaw/lib-std";
export declare namespace Constraints {
    type Int32 = {
        min: int;
        max: int;
    } | {
        length: int;
    } | {
        values: Array<int>;
    } | "non-negative" | "positive" | "index" | "any";
    type Float32 = {
        min: float;
        max: float;
        scaling: "linear" | "exponential";
    } | {
        min: float;
        mid: float;
        max: float;
        scaling: "decibel";
    } | "unipolar" | "bipolar" | "decibel" | "non-negative" | "positive" | "any";
    const clampInt32: (constraint: Constraints.Int32, value: int) => int;
    const clampFloat32: (constraint: Constraints.Float32, value: float) => float;
}
//# sourceMappingURL=constraints.d.ts.map