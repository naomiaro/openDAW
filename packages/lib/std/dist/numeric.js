const dataView = new DataView(new ArrayBuffer(8));
export var Integer;
(function (Integer) {
    Integer.MIN_VALUE = -0x80000000;
    Integer.MAX_VALUE = 0x7fffffff;
    Integer.toByte = (value) => {
        dataView.setInt8(0, value);
        return dataView.getInt8(0);
    };
    Integer.toShort = (value) => {
        dataView.setInt16(0, value);
        return dataView.getInt16(0);
    };
    Integer.toInt = (value) => {
        dataView.setInt32(0, value);
        return dataView.getInt32(0);
    };
})(Integer || (Integer = {}));
export var Float;
(function (Float) {
    const EXP_BIT_MASK = 2139095040;
    const SIGNIFICANT_BIT_MASK = 8388607;
    const ARRAY_BUFFER = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT);
    const FLOAT_VIEW = new Float32Array(ARRAY_BUFFER);
    const INT_VIEW = new Int32Array(ARRAY_BUFFER);
    /**
     * Returns a representation of the specified floating-point value
     * according to the IEEE 754 floating-point "single format" bit layout.
     * @param value a floating-point number.
     * @returns the bits that represent the floating-point number.
     */
    Float.floatToIntBits = (value) => {
        const result = Float.floatToRawIntBits(value);
        if ((result & EXP_BIT_MASK) === EXP_BIT_MASK && (result & SIGNIFICANT_BIT_MASK) !== 0) {
            return 0x7fc00000;
        }
        return result;
    };
    Float.intBitsToFloat = (value) => {
        INT_VIEW[0] = value;
        return FLOAT_VIEW[0];
    };
    Float.floatToRawIntBits = (value) => {
        FLOAT_VIEW[0] = value;
        return INT_VIEW[0];
    };
    Float.toFloat32 = (value) => {
        dataView.setFloat32(0, value);
        return dataView.getFloat32(0);
    };
})(Float || (Float = {}));
export var Float16;
(function (Float16) {
    Float16.floatToIntBits = (value) => {
        const bits = Float.floatToIntBits(value);
        const sign = bits >>> 16 & 0x8000;
        let val = (bits & 0x7fffffff) + 0x1000;
        if (val >= 0x47800000) {
            if ((bits & 0x7fffffff) >= 0x47800000) {
                if (val < 0x7f800000) {
                    return sign | 0x7c00;
                }
                return sign | 0x7c00 | (bits & 0x007fffff) >>> 13;
            }
            return sign | 0x7bff;
        }
        if (val >= 0x38800000) {
            return sign | val - 0x38000000 >>> 13;
        }
        if (val < 0x33000000) {
            return sign;
        }
        val = (bits & 0x7fffffff) >>> 23;
        return sign | ((bits & 0x7fffff | 0x800000) + (0x800000 >>> val - 102) >>> 126 - val);
    };
    Float16.intBitsToFloat = (bits) => {
        let mantissa = bits & 0x03ff;
        let exp = bits & 0x7c00;
        if (exp === 0x7c00) {
            exp = 0x3fc00;
        }
        else if (exp !== 0) {
            exp += 0x1c000;
            if (mantissa === 0 && exp > 0x1c400) {
                return Float.intBitsToFloat((bits & 0x8000) << 16 | exp << 13 | 0x3ff);
            }
        }
        else if (mantissa !== 0) {
            exp = 0x1c400;
            do {
                mantissa <<= 1;
                exp -= 0x400;
            } while ((mantissa & 0x400) === 0);
            mantissa &= 0x3ff;
        }
        return Float.intBitsToFloat((bits & 0x8000) << 16 | (exp | mantissa) << 13);
    };
})(Float16 || (Float16 = {}));
export var Float64;
(function (Float64) {
    const EXP_BIT_MASK = 9218868437227405312n;
    const SIGNIFICANT_BIT_MASK = 4503599627370495n;
    const ARRAY_BUFFER = new ArrayBuffer(BigInt64Array.BYTES_PER_ELEMENT);
    const FLOAT64_VIEW = new Float64Array(ARRAY_BUFFER);
    const LONG_VIEW = new BigInt64Array(ARRAY_BUFFER);
    Float64.float64ToLongBits = (value) => {
        const result = Float64.float64ToRawLongBits(value);
        if ((result & EXP_BIT_MASK) === EXP_BIT_MASK && (result & SIGNIFICANT_BIT_MASK) !== 0n) {
            return 0x7ff8000000000000n;
        }
        return result;
    };
    Float64.longBitsToFloat64 = (value) => {
        LONG_VIEW[0] = value;
        return FLOAT64_VIEW[0];
    };
    Float64.float64ToRawLongBits = (value) => {
        FLOAT64_VIEW[0] = value;
        return LONG_VIEW[0];
    };
    Float64.clamp = (value) => {
        dataView.setFloat64(0, value);
        return dataView.getFloat64(0);
    };
})(Float64 || (Float64 = {}));
