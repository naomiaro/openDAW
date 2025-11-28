import { BiquadCoeff } from "./biquad-coeff";
import { int } from "@opendaw/lib-std";
export interface BiquadProcessor {
    reset(): void;
    process(coeff: BiquadCoeff, source: Float32Array, target: Float32Array, fromIndex: int, toIndex: int): void;
    processFrame(coeff: BiquadCoeff, x: number): number;
}
export declare class BiquadMono implements BiquadProcessor {
    #private;
    reset(): void;
    process({ a1, a2, b0, b1, b2 }: BiquadCoeff, source: Float32Array, target: Float32Array, fromIndex: int, toIndex: int): void;
    processFrame({ a1, a2, b0, b1, b2 }: BiquadCoeff, x: number): number;
}
export declare class BiquadStack implements BiquadProcessor {
    #private;
    constructor(maxOrder: int);
    get order(): int;
    set order(value: int);
    reset(): void;
    process(coeff: BiquadCoeff, source: Float32Array, target: Float32Array, fromIndex: int, toIndex: int): void;
    processFrame(coeff: BiquadCoeff, x: number): number;
}
export declare class ModulatedBiquad {
    #private;
    constructor(minFreq: number, maxFreq: number, sampleRate: number);
    get order(): number;
    set order(value: number);
    reset(): void;
    process(input: Float32Array, output: Float32Array, cutoffs: Float32Array, q: number, fromIndex: number, toIndex: number): void;
}
//# sourceMappingURL=biquad-processor.d.ts.map