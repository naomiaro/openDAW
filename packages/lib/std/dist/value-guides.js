import { Arrays } from "./arrays";
import { NumberComparator } from "./comparators";
import { assert, isDefined } from "./lang";
import { clamp } from "./math";
import { BinarySearch } from "./binary-search";
export var ValueGuide;
(function (ValueGuide) {
    ValueGuide.create = (option) => {
        if (isDefined(option)) {
            if (isDefined(option?.snap)) {
                return ValueGuide.snap(option?.trackLength, option?.snap?.snapLength, Array.isArray(option?.snap?.threshold)
                    ? option?.snap.threshold
                    : [option?.snap?.threshold]);
            }
            else {
                return ValueGuide.identity(option?.trackLength);
            }
        }
        else {
            return ValueGuide.identity();
        }
    };
    ValueGuide.snap = (trackLength = DEFAULT_TRACK_LENGTH, snapLength = DEFAULT_SNAP_LENGTH, thresholds) => new Snap(trackLength, snapLength / trackLength, thresholds);
    ValueGuide.identity = (trackLength = DEFAULT_TRACK_LENGTH) => new Identity(trackLength);
    const DEFAULT_TRACK_LENGTH = 128;
    const DEFAULT_SNAP_LENGTH = 24;
    class Identity {
        length;
        #x = NaN;
        #value = NaN;
        #ratio = 1.0;
        constructor(length) {
            this.length = length;
        }
        begin(value) { this.#value = this.#x = value; }
        moveBy(delta) {
            assert(!isNaN(this.#value), () => "value has never been set");
            this.#x += delta / this.length * this.#ratio;
            this.#value = clamp(this.#x, 0.0, 1.0);
        }
        ratio(value) { this.#ratio = value; }
        value() {
            assert(!isNaN(this.#value), () => "value has never been set");
            return this.#value;
        }
        disable() { }
        enable() { }
    }
    class Snap {
        #length;
        #margin;
        #thresholds;
        #ranges;
        #x = NaN; // unhinged floating value including the snapping margin
        #value = NaN; // clamped normalised, exposable value
        #ratio = 1.0;
        #enabled = true;
        constructor(length, margin, thresholds) {
            assert(margin > 0.0, () => `margin(${margin}) must be greater then 0`);
            assert(Arrays.isSorted(thresholds), () => "thresholds are not sorted");
            assert(margin < length, () => `margin(${margin}) must be lower then length(${length})`);
            this.#length = length;
            this.#margin = margin;
            this.#thresholds = thresholds;
            this.#ranges = thresholds.map((x, index) => x + index * this.#margin);
        }
        begin(value) {
            this.#x = this.#enabled ? this.valueToX(value) : value;
            this.#value = value;
        }
        moveBy(delta) {
            assert(isFinite(this.#value) && isFinite(this.#x), () => "value has never been set (moveBy)");
            this.#x += delta / this.#length * this.#ratio;
            this.#value = this.#enabled ? this.xToValue(this.#x) : clamp(this.#x, 0.0, 1.0);
        }
        ratio(value) { this.#ratio = value; }
        value() {
            assert(isFinite(this.#value), () => "value has never been set (value)");
            return this.#value;
        }
        disable() {
            if (!this.#enabled) {
                return;
            }
            this.#enabled = false;
            this.#x = this.xToValue(this.#x);
        }
        enable() {
            if (this.#enabled) {
                return;
            }
            this.#enabled = true;
            this.#x = this.valueToX(this.#x);
        }
        valueToX(value) {
            const index = BinarySearch.rightMost(this.#thresholds, value, NumberComparator);
            if (index < 0) {
                return value;
            }
            else {
                const range = this.#ranges[index];
                const threshold = this.#thresholds[index];
                return value === threshold ? range + this.#margin / 2.0 : range + this.#margin + (value - threshold);
            }
        }
        xToValue(x) {
            const clamped = clamp(x, 0.0, 1.0 + this.#margin * this.#thresholds.length);
            const index = BinarySearch.rightMost(this.#ranges, clamped, NumberComparator);
            if (index < 0) {
                return clamped;
            }
            else {
                const range = this.#ranges[index];
                const threshold = this.#thresholds[index];
                if (clamped > range + this.#margin) {
                    return clamped - (range + this.#margin) + threshold;
                }
                else {
                    return threshold;
                }
            }
        }
        get margin() { return this.#margin; }
    }
})(ValueGuide || (ValueGuide = {}));
