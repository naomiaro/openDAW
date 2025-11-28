export declare class SmoothingFilter {
    #private;
    constructor(sampleRate: number);
    process(sample: number): void;
    setAlpha(a: number): void;
    setAlphaWithTime(timeInSeconds: number): void;
    getState(): number;
}
//# sourceMappingURL=SmoothingFilter.d.ts.map