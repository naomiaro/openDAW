import { int } from "@opendaw/lib-std";
export type ppqn = number;
export type seconds = number;
export type samples = number;
export type bpm = number;
export declare const PPQN: {
    readonly Bar: number;
    readonly Quarter: 960;
    readonly SemiQuaver: number;
    readonly fromSignature: (nominator: int, denominator: int) => number;
    readonly toParts: (ppqn: ppqn, nominator?: int, denominator?: int) => {
        readonly bars: number;
        readonly beats: number;
        readonly semiquavers: number;
        readonly ticks: number;
    };
    readonly secondsToPulses: (seconds: seconds, bpm: bpm) => ppqn;
    readonly pulsesToSeconds: (pulses: ppqn, bpm: bpm) => seconds;
    readonly secondsToBpm: (seconds: seconds, pulses: ppqn) => bpm;
    readonly samplesToPulses: (samples: samples, bpm: bpm, sampleRate: number) => ppqn;
    readonly pulsesToSamples: (pulses: ppqn, bpm: bpm, sampleRate: number) => number;
    readonly toString: (pulses: ppqn, nominator?: int, denominator?: int) => string;
};
//# sourceMappingURL=ppqn.d.ts.map