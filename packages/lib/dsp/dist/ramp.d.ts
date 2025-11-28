import { int } from "@opendaw/lib-std";
import { StereoMatrix } from "./stereo";
import { Mixing } from "./mixing";
export interface Ramp<T> {
    set(target: T, smooth?: boolean): void;
    get(): T;
    moveAndGet(): T;
    isFixed(value: T): boolean;
    isInterpolating(): boolean;
}
export declare namespace Ramp {
    export const linear: (sampleRate: number, durationInSeconds?: number) => LinearRamp;
    export const stereoMatrix: (sampleRate: number, durationInSeconds?: number) => StereoMatrixRamp;
    class LinearRamp implements Ramp<number> {
        #private;
        constructor(length: int);
        set(target: number, smooth?: boolean): void;
        get(): number;
        moveAndGet(): number;
        isFixed(value: number): boolean;
        isInterpolating(): boolean;
    }
    export class StereoMatrixRamp implements Ramp<Readonly<StereoMatrix.Matrix>> {
        #private;
        constructor(length: int);
        update(params: StereoMatrix.Params, mixing: Mixing, smooth?: boolean): void;
        processFrames(source: StereoMatrix.Channels, target: StereoMatrix.Channels, fromIndex: int, toIndex: int): void;
        set(target: Readonly<StereoMatrix.Matrix>, smooth?: boolean): void;
        get(): Readonly<StereoMatrix.Matrix>;
        moveAndGet(): Readonly<StereoMatrix.Matrix>;
        isFixed(value: Readonly<StereoMatrix.Matrix>): boolean;
        isInterpolating(): boolean;
    }
    export {};
}
//# sourceMappingURL=ramp.d.ts.map