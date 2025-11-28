import { ppqn } from "./ppqn";
import { int } from "@opendaw/lib-std";
export declare class Glide {
    #private;
    constructor();
    reset(): void;
    init(frequency: number): void;
    currentFrequency(): number;
    glideTo(targetFrequency: number, glideDuration: ppqn): void;
    process(freqBuffer: Float32Array, bpm: number, fromIndex: int, toIndex: int): void;
    advance(bpm: number, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=glide.d.ts.map