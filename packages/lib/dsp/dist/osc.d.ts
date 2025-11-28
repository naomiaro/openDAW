import { ClassicWaveform } from "./classic-waveform";
export declare class BandLimitedOscillator {
    #private;
    constructor(sampleRate: number);
    generate(output: Float32Array, frequency: number, waveform: ClassicWaveform, fromIndex: number, toIndex: number): void;
    generateFromFrequencies(output: Float32Array, freqBuffer: Float32Array, waveform: ClassicWaveform, fromIndex: number, toIndex: number): void;
}
//# sourceMappingURL=osc.d.ts.map