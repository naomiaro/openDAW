/**
 * BPM detector (90-180 BPM) for a mono Float32Array.
 * Port of Mark Hills bpm(1) with a light "low-BPM penalty" to dodge ½-tempo aliases.
 */
export declare namespace BPMTools {
    type Options = Partial<{
        interval: number;
        scanSteps: number;
        scanSamples: number;
        minBPM: number;
        maxBPM: number;
    }>;
    export function detect(buf: Float32Array, sampleRate: number, options?: Options): number;
    export {};
}
//# sourceMappingURL=bpm-tools.d.ts.map