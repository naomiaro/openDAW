import { int } from "@opendaw/lib-std";
export declare class FFT {
    #private;
    static reverse(i: int): number;
    constructor(n: int);
    process(real: Float32Array, imag: Float32Array): void;
}
//# sourceMappingURL=fft.d.ts.map