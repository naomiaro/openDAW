import { asDefined, panic } from "./lang";
import { clamp } from "./math";
import { Integer } from "./numeric";
class Linear {
    #min;
    #max;
    #range;
    constructor(min, max) {
        this.#min = min;
        this.#max = max;
        this.#range = max - min;
    }
    x(y) { return (this.clamp(y) - this.#min) / this.#range; }
    y(x) { return this.#min + clamp(x, 0.0, 1.0) * this.#range; }
    clamp(y) { return clamp(y, this.#min, this.#max); }
    floating() { return true; }
}
class LinearInteger {
    #min;
    #max;
    #range;
    constructor(min, max) {
        this.#min = clamp(Math.round(min), Integer.MIN_VALUE, Integer.MAX_VALUE);
        this.#max = clamp(Math.round(max), Integer.MIN_VALUE, Integer.MAX_VALUE);
        this.#range = this.#max - this.#min;
    }
    x(y) { return (this.clamp(y) - this.#min) / this.#range; }
    y(x) { return this.#min + Math.round(clamp(x, 0.0, 1.0) * this.#range); }
    clamp(y) { return clamp(Math.round(y), this.#min, this.#max); }
    floating() { return false; }
}
class Exponential {
    #min;
    #max;
    #range;
    constructor(min, max) {
        this.#min = min;
        this.#max = max;
        this.#range = Math.log(max / min);
    }
    x(y) { return Math.log(clamp(y, this.#min, this.#max) / this.#min) / this.#range; }
    y(x) { return this.#min * Math.exp(clamp(x, 0.0, 1.0) * this.#range); }
    clamp(y) { return Math.min(this.#max, Math.max(this.#min, y)); }
    floating() { return true; }
}
class Values {
    #values;
    constructor(values) {
        this.#values = values;
    }
    x(y) {
        const index = this.#values.findIndex(value => value === y);
        return index === -1
            ? panic(`Could not find index for ${y}`)
            : index / (this.#values.length - 1);
    }
    y(x) {
        const index = Math.round(clamp(x, 0.0, 1.0) * (this.#values.length - 1));
        return index > -1
            ? asDefined(this.#values.at(index), `Could not find value for ${x}`)
            : panic(`Index ${index} is out of box.`);
    }
    clamp(y) { return y; }
    floating() { return false; }
}
class Decibel {
    #min;
    #max;
    #a;
    #b;
    #c;
    /**
     * @param min The lowest decibel value
     * @param mid The decibel value in the center
     * @param max The highest decibel value
     */
    constructor(min, mid, max) {
        this.#min = min;
        this.#max = max;
        const min2 = min * min;
        const max2 = max * max;
        const mid2 = mid * mid;
        const tmp0 = min + max - 2.0 * mid;
        const tmp1 = max - mid;
        this.#a = ((2.0 * max - mid) * min - mid * max) / tmp0;
        this.#b = (tmp1 * min2 + (mid2 - max2) * min + mid * max2 - mid2 * max)
            / (min2 + (2.0 * max - 4.0 * mid) * min + max2 - 4.0 * mid * max + 4.0 * mid2);
        this.#c = -tmp1 / tmp0;
    }
    y(x) {
        if (x <= 0.0) {
            return Number.NEGATIVE_INFINITY;
        }
        if (x >= 1.0) {
            return this.#max;
        }
        return this.#a - this.#b / (x + this.#c);
    }
    x(y) {
        if (this.#min >= y) {
            return 0.0;
        }
        if (this.#max <= y) {
            return 1.0;
        }
        return -this.#b / (y - this.#a) - this.#c;
    }
    clamp(y) { return Math.min(this.#max, y); }
    floating() { return true; }
}
export var ValueMapping;
(function (ValueMapping) {
    ValueMapping.linear = (min, max) => new Linear(min, max);
    ValueMapping.linearInteger = (min, max) => new LinearInteger(min, max);
    ValueMapping.exponential = (min, max) => new Exponential(min, max);
    ValueMapping.values = (values) => new Values(values);
    ValueMapping.decibel = (min, mid, max) => new Decibel(min, mid, max);
    const Bool = new class {
        x(y) { return y ? 1.0 : 0.0; }
        y(x) { return x >= 0.5; }
        clamp(y) { return y; }
        floating() { return false; }
    };
    const Unipolar = ValueMapping.linear(0.0, 1.0);
    const Bipolar = ValueMapping.linear(-1.0, 1.0);
    ValueMapping.bool = Bool;
    const DefaultDecibelInstance = ValueMapping.decibel(-72.0, -12.0, 0.0);
    ValueMapping.unipolar = () => Unipolar;
    ValueMapping.bipolar = () => Bipolar;
    ValueMapping.DefaultDecibel = DefaultDecibelInstance;
})(ValueMapping || (ValueMapping = {}));
