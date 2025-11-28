import { int } from "@opendaw/lib-std";
import { Mixing } from "./mixing";
export declare namespace StereoMatrix {
    type Matrix = {
        ll: number;
        rl: number;
        lr: number;
        rr: number;
    };
    type Params = {
        gain: number;
        panning: number;
        stereo: number;
        invertL: boolean;
        invertR: boolean;
        swap: boolean;
    };
    type Channels = [Float32Array, Float32Array];
    const zero: () => Matrix;
    const identity: () => Matrix;
    const update: (m: Matrix, { gain, panning, invertL, invertR, stereo, swap }: Params, mixing?: Mixing) => void;
    const panningToGains: (panning: number, mixing: Mixing) => [number, number];
    const applyFrame: (m: Matrix, l: number, r: number) => [number, number];
    const processFrames: (m: Matrix, source: Channels, target: Channels, fromIndex: int, toIndex: int) => void;
    const replaceFrames: (m: Matrix, [ch0, ch1]: Channels, fromIndex: int, toIndex: int) => void;
}
//# sourceMappingURL=stereo.d.ts.map