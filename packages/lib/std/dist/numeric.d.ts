import { byte, float, int, short } from "./lang";
export declare namespace Integer {
    const MIN_VALUE: -0x80000000;
    const MAX_VALUE: 2147483647;
    const toByte: (value: number) => byte;
    const toShort: (value: number) => short;
    const toInt: (value: number) => int;
}
export declare namespace Float {
    /**
     * Returns a representation of the specified floating-point value
     * according to the IEEE 754 floating-point "single format" bit layout.
     * @param value a floating-point number.
     * @returns the bits that represent the floating-point number.
     */
    const floatToIntBits: (value: float) => int;
    const intBitsToFloat: (value: int) => float;
    const floatToRawIntBits: (value: float) => int;
    const toFloat32: (value: number) => float;
}
export declare namespace Float16 {
    const floatToIntBits: (value: float) => int;
    const intBitsToFloat: (bits: int) => float;
}
export declare namespace Float64 {
    const float64ToLongBits: (value: number) => bigint;
    const longBitsToFloat64: (value: bigint) => number;
    const float64ToRawLongBits: (value: number) => bigint;
    const clamp: (value: number) => number;
}
//# sourceMappingURL=numeric.d.ts.map