import { unitValue } from "@opendaw/lib-std";
export declare class BiquadCoeff {
    a1: number;
    a2: number;
    b0: number;
    b1: number;
    b2: number;
    constructor();
    identity(): void;
    setLowpassParams(cutoff: unitValue, resonance?: number): this;
    setHighpassParams(cutoff: unitValue, resonance?: number): this;
    setNormalizedCoefficients(b0: number, b1: number, b2: number, a0: number, a1: number, a2: number): this;
    setLowShelfParams(frequency: unitValue, db_gain: number): this;
    setHighShelfParams(frequency: unitValue, db_gain: number): this;
    setPeakingParams(frequency: number, q: number, db_gain: number): this;
    setAllpassParams(frequency: unitValue, q: number): this;
    setNotchParams(frequency: unitValue, q: number): this;
    setBandpassParams(frequency: unitValue, q: number): this;
    getFrequencyResponse(frequency: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void;
}
//# sourceMappingURL=biquad-coeff.d.ts.map