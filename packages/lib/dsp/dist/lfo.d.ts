import { ClassicWaveform } from "./classic-waveform";
export declare class LFO {
    #private;
    readonly sampleRate: number;
    constructor(sampleRate: number);
    fill(buffer: Float32Array, shape: ClassicWaveform, frequency: number, fromIndex: number, toIndex: number): void;
    reset(): void;
}
//# sourceMappingURL=lfo.d.ts.map