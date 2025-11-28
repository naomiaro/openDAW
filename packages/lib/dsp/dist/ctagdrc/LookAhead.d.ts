import { int } from "@opendaw/lib-std";
export declare class LookAhead {
    #private;
    constructor(sampleRate: number, delay: number, blockSize: int);
    process(src: Float32Array, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=LookAhead.d.ts.map