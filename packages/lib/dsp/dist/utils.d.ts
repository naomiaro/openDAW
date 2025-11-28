import { unitValue } from "@opendaw/lib-std";
export declare const midiToHz: (note?: number, baseFrequency?: number) => number;
export declare const hzToMidi: (hz: number, baseFrequency?: number) => number;
export declare const dbToGain: (db: number) => number;
export declare const gainToDb: (gain: number) => number;
export declare const velocityToGain: (velocity: unitValue) => number;
export declare const barsToBpm: (bars: number, duration: number) => number;
export declare const bpmToBars: (bpm: number, duration: number) => number;
export declare const estimateBpm: (duration: number, maxBpm?: number) => number;
export declare const semitoneToHz: (semitones: number) => number;
export declare const hzToSemitone: (hz: number) => number;
//# sourceMappingURL=utils.d.ts.map