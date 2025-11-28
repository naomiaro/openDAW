import { ByteArrayInput, float, int, Nullable } from "@opendaw/lib-std";
export interface Peaks {
    readonly stages: ReadonlyArray<Peaks.Stage>;
    readonly data: ReadonlyArray<Int32Array>;
    readonly numFrames: int;
    readonly numChannels: int;
    nearest(unitsPerPixel: number): Nullable<Peaks.Stage>;
}
export declare namespace Peaks {
    class Stage {
        readonly shift: int;
        readonly numPeaks: int;
        readonly dataOffset: int;
        constructor(shift: int, numPeaks: int, dataOffset: int);
        unitsEachPeak(): int;
    }
    const unpack: (bits: int, index: 0 | 1) => float;
}
export declare class SamplePeaks implements Peaks {
    readonly stages: ReadonlyArray<Peaks.Stage>;
    readonly data: ReadonlyArray<Int32Array>;
    readonly numFrames: int;
    readonly numChannels: int;
    static from(input: ByteArrayInput): Peaks;
    static readonly None: SamplePeaks;
    static readonly findBestFit: (numFrames: int, width?: int) => Uint8Array;
    constructor(stages: ReadonlyArray<Peaks.Stage>, data: ReadonlyArray<Int32Array>, numFrames: int, numChannels: int);
    nearest(unitsPerPixel: number): Nullable<Peaks.Stage>;
    toArrayBuffer(): ArrayBufferLike;
    toString(): string;
}
//# sourceMappingURL=Peaks.d.ts.map