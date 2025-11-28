import { assert, BinarySearch, NumberComparator, quantizeFloor } from "@opendaw/lib-std";
export var Groove;
(function (Groove) {
    Groove.Identity = {
        warp: (position) => position,
        unwarp: (position) => position
    };
})(Groove || (Groove = {}));
export class GroovePattern {
    #func;
    constructor(func) { this.#func = func; }
    warp(position) { return this.#transform(true, position); }
    unwarp(position) { return this.#transform(false, position); }
    #transform(forward, position) {
        const duration = this.#func.duration();
        const start = quantizeFloor(position, duration);
        const normalized = (position - start) / duration;
        const transformed = forward ? this.#func.fx(normalized) : this.#func.fy(normalized);
        return start + transformed * duration;
    }
}
export class QuantisedGrooveFunction {
    #values;
    constructor(values) {
        assert(values.length >= 2, "Must have at least two values [0, 1]");
        assert(values[0] === 0.0, "First entry must be zero");
        assert(values[values.length - 1] === 1.0, "Last entry must be one");
        this.#values = values;
    }
    fx(x) {
        if (x <= 0.0) {
            return 0.0;
        }
        if (x >= 1.0) {
            return 1.0;
        }
        const idxFloat = x * (this.#values.length - 1);
        const idxInteger = idxFloat | 0;
        const valueFloor = this.#values[idxInteger];
        const alpha = idxFloat - idxInteger;
        return valueFloor + alpha * (this.#values[idxInteger + 1] - valueFloor);
    }
    fy(y) {
        if (y <= 0.0) {
            return 0.0;
        }
        if (y >= 1.0) {
            return 1.0;
        }
        const index = BinarySearch.rightMost(this.#values, y, NumberComparator);
        const curr = this.#values[index];
        const next = this.#values[index + 1];
        const alpha = (y - curr) / (next - curr);
        return (index + alpha) / (this.#values.length - 1);
    }
}
export class GrooveChain {
    #grooves;
    constructor(grooves) { this.#grooves = grooves; }
    warp(position) {
        for (let i = 0; i < this.#grooves.length; i++) {
            position = this.#grooves[i].warp(position);
        }
        return position;
    }
    unwarp(position) {
        for (let i = this.#grooves.length - 1; i >= 0; i--) {
            position = this.#grooves[i].unwarp(position);
        }
        return position;
    }
}
