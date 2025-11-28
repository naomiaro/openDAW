import { int } from "@opendaw/lib-std";
export declare class RMS {
    #private;
    constructor(n: int);
    pushPop(x: number): number;
    processBlock(buffer: Float32Array, fromIndex: int, toIndex: int): number;
    clear(): void;
}
//# sourceMappingURL=rms.d.ts.map