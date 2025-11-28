import { Notifier } from "./notifier";
export class Range {
    #changeNotifier = new Notifier();
    #padding;
    #minimum;
    #min = 0.0;
    #max = 1.0;
    #width;
    constructor(options) {
        this.#minimum = options?.minimum ?? Number.EPSILON;
        this.#padding = options?.padding ?? 0.0;
        this.#width = this.#padding + 1.0;
    }
    get padding() { return this.#padding; }
    get minimum() { return this.#minimum; }
    set minimum(value) {
        this.#minimum = value;
        if (this.#min + this.#minimum > this.#max) {
            this.#min = Math.max(0.0, this.#max - this.#minimum);
            this.#max = this.#min + this.#minimum;
        }
        this.#changeNotifier.notify(this);
    }
    subscribe(observer) { return this.#changeNotifier.subscribe(observer); }
    terminate() { this.#changeNotifier.terminate(); }
    moveTo(value) {
        let delta = value - this.#min;
        if (this.#min + delta < 0.0) {
            delta = -this.#min;
        }
        else if (this.#max + delta > 1.0) {
            delta = 1.0 - this.#max;
        }
        this.set(this.#min + delta, this.#max + delta);
    }
    moveBy(delta) {
        if (this.#min + delta < 0.0) {
            delta = -this.#min;
        }
        if (this.#max + delta > 1.0) {
            delta = 1.0 - this.#max;
        }
        this.set(this.#min + delta, this.#max + delta);
    }
    get min() { return this.#min; }
    set min(value) {
        if (value < 0.0) {
            this.set(0.0, this.#max);
        }
        else if (value + this.#minimum > this.#max) {
            this.set(this.#max - this.#minimum, this.#max);
        }
        else {
            this.set(value, this.#max);
        }
    }
    get max() { return this.#max; }
    set max(value) {
        if (value > 1.0) {
            this.set(this.#min, 1.0);
        }
        else if (value < this.#min + this.#minimum) {
            this.set(this.#min, this.#min + this.#minimum);
        }
        else {
            this.set(this.#min, value);
        }
    }
    get length() { return this.#max - this.#min; }
    get valuesPerPixel() { return this.length / this.innerWidth; }
    get center() { return (this.#min + this.#max) * 0.5; }
    set center(value) {
        const range = this.#max - this.#min;
        const rangeHalf = range / 2.0;
        let min = value - rangeHalf;
        let max = value + rangeHalf;
        if (min < 0.0) {
            min = 0.0;
            max = range;
        }
        if (max > 1.0) {
            min = 1.0 - range;
            max = 1.0;
        }
        this.set(min, max);
    }
    scaleBy(scale, position) {
        if (scale === 0.0) {
            return;
        }
        const range = this.#max - this.#min;
        const s = this.#min + (this.#min - position) * scale;
        const e = this.#max + (this.#max - position) * scale;
        if (scale > 0.0) {
            if (s < 0.0) {
                this.set(0.0, range * Math.pow(2.0, scale));
            }
            else if (e > 1.0) {
                this.set(1.0 - range * Math.pow(2.0, scale), 1.0);
            }
            else {
                this.set(s, e);
            }
        }
        else if (e - s < this.#minimum) {
            const ratio = (this.#minimum - range) / range;
            this.set(this.#min + (this.#min - position) * ratio, this.#max + (this.#max - position) * ratio);
        }
        else {
            this.set(s, e);
        }
    }
    xToValue(x) { return this.#min + (x - this.#padding) / this.innerWidth * this.length; }
    valueToX(value) { return this.#padding + (value - this.#min) / this.length * this.innerWidth; }
    showAll() { this.set(0.0, 1.0); }
    overlaps(start, complete) { return complete > this.#min && start < this.#max; }
    set width(value) {
        if (this.#width === value) {
            return;
        }
        this.#width = value;
        this.#changeNotifier.notify(this);
    }
    get width() { return this.#width; }
    get innerWidth() { return this.#width - this.#padding; }
    set(min, max) {
        const clampMin = Math.max(0.0, min);
        const clampMax = Math.min(1.0, max);
        if (this.#min !== clampMin || this.#max !== clampMax) {
            this.#min = clampMin;
            this.#max = clampMax;
            this.#changeNotifier.notify(this);
        }
    }
}
