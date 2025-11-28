import { Notifier, panic, Range, Terminator } from "@opendaw/lib-std";
export class TimelineRange {
    #terminator;
    #range;
    #notifier;
    #valueAxis;
    #maxUnits = 1.0;
    #minimum = 1.0;
    constructor(options) {
        this.#terminator = new Terminator();
        this.#range = this.#terminator.own(new Range(options));
        this.#notifier = this.#terminator.own(new Notifier());
        this.#valueAxis = {
            valueToAxis: (value) => this.unitToX(Math.max(0, value)),
            axisToValue: (x) => Math.max(0, this.xToUnit(x))
        };
        this.#terminator.own(this.#range.subscribe(() => this.#notifier.notify(this)));
    }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    get minUnits() { return 0; }
    set minUnits(_) {
        panic("minUnits not implemented");
    }
    get maxUnits() { return this.#maxUnits; }
    set maxUnits(value) {
        if (this.#maxUnits === value) {
            return;
        }
        this.#maxUnits = value;
        this.#range.minimum = this.normalize(this.#minimum);
    }
    get unitCenter() { return this.toUnits(this.#range.center); }
    set unitCenter(value) { this.#range.center = this.normalize(value); }
    get width() { return this.#range.width; }
    set width(value) { this.#range.width = value; }
    // minimum interval
    get minimum() { return this.#minimum; }
    set minimum(value) { this.#minimum = value; }
    get unitMin() { return this.toUnits(this.#range.min); }
    set unitMin(value) { this.#range.min = this.normalize(value); }
    get unitMax() { return this.toUnits(this.#range.max); }
    set unitMax(value) { this.#range.max = this.normalize(value); }
    get unitsPerPixel() { return this.toUnits(this.#range.valuesPerPixel); }
    get unitRange() { return this.unitMax - this.unitMin; }
    get valueAxis() { return this.#valueAxis; }
    normalize(value) { return value / this.maxUnits; }
    toUnits(value) { return value * this.maxUnits; }
    unitToX(unit) { return this.valueToX(this.normalize(unit)); }
    xToUnit(x) { return this.toUnits(this.xToValue(x)); }
    moveToUnit(value) { this.#range.moveTo(this.normalize(value)); }
    unitOverlaps(min, max) { return this.#range.overlaps(this.normalize(min), this.normalize(max)); }
    showUnitInterval(min, max) { this.#range.set(this.normalize(min), this.normalize(max)); }
    showAll() { this.#range.set(0.0, 1.0); }
    zoomRange(min, max, padding = 32) {
        const innerWidth = this.#range.innerWidth;
        const unitsPerPixel = (max - min) / (innerWidth - padding * 2.0);
        const center = ((min + max) / 2.0) / this.#maxUnits;
        const range = Math.max(this.#range.minimum, (unitsPerPixel * innerWidth) / this.#maxUnits * 0.5);
        let a = center - range;
        let b = center + range;
        if (a < 0.0) {
            b -= a;
            a = 0.0;
        }
        this.#range.set(a, b);
    }
    moveUnitTo(value) { this.#range.moveTo(this.normalize(value)); }
    moveUnitBy(delta) { this.#range.moveBy(this.normalize(delta)); }
    scaleUnitBy(scale, position) { this.#range.scaleBy(scale, this.normalize(position)); }
    get unitPadding() { return this.#range.padding * this.unitsPerPixel; }
    get min() { return this.#range.min; }
    set min(value) { this.#range.min = value; }
    get max() { return this.#range.max; }
    set max(value) { this.#range.max = value; }
    get center() { return this.#range.center; }
    set center(value) { this.#range.center = value; }
    get length() { return this.#range.length; }
    moveTo(value) { this.#range.moveTo(value); }
    moveBy(delta) { this.#range.moveBy(delta); }
    scaleBy(scale, position) { this.#range.scaleBy(scale, position); }
    xToValue(x) { return this.#range.xToValue(x); }
    valueToX(value) { return this.#range.valueToX(value); }
    overlaps(start, complete) { return this.#range.overlaps(start, complete); }
    terminate() { this.#terminator.terminate(); }
}
