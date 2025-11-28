import { int } from "@opendaw/lib-std";
import { StereoMatrix } from "./stereo";
export declare class ResamplerMono {
    #private;
    constructor(factor: 2 | 4 | 8);
    reset(): void;
    upsample(input: Float32Array, output: Float32Array, fromIndex: int, toIndex: int): void;
    downsample(input: Float32Array, output: Float32Array, fromIndex: int, toIndex: int): void;
}
export declare class ResamplerStereo {
    #private;
    constructor(factor: 2 | 4 | 8);
    reset(): void;
    upsample(input: StereoMatrix.Channels, output: StereoMatrix.Channels, fromIndex: int, toIndex: int): void;
    downsample(input: StereoMatrix.Channels, output: StereoMatrix.Channels, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=resampler.d.ts.map