import { int } from "@opendaw/lib-std";
import { StereoMatrix } from "./stereo";
export declare class Crusher {
    #private;
    constructor(sampleRate: number);
    process(input: StereoMatrix.Channels, output: StereoMatrix.Channels, from: int, to: int): void;
    setCrush(value: number): void;
    setBitDepth(bits: int): void;
    setBoost(db: number): void;
    setMix(mix: number): void;
    reset(): void;
}
//# sourceMappingURL=crusher.d.ts.map