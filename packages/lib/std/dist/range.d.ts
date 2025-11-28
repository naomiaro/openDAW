import { Observer } from "./observers";
import { Subscription } from "./terminable";
import { unitValue } from "./lang";
import { Observable } from "./observables";
export type RangeOptions = {
    padding?: number;
    minimum?: unitValue;
};
export declare class Range implements Observable<Range> {
    #private;
    constructor(options?: RangeOptions);
    get padding(): number;
    get minimum(): unitValue;
    set minimum(value: unitValue);
    subscribe(observer: Observer<Range>): Subscription;
    terminate(): void;
    moveTo(value: unitValue): void;
    moveBy(delta: unitValue): void;
    get min(): unitValue;
    set min(value: unitValue);
    get max(): unitValue;
    set max(value: unitValue);
    get length(): unitValue;
    get valuesPerPixel(): number;
    get center(): unitValue;
    set center(value: unitValue);
    scaleBy(scale: number, position: unitValue): void;
    xToValue(x: number): unitValue;
    valueToX(value: unitValue): number;
    showAll(): void;
    overlaps(start: number, complete: number): boolean;
    set width(value: number);
    get width(): number;
    get innerWidth(): number;
    set(min: unitValue, max: unitValue): void;
}
//# sourceMappingURL=range.d.ts.map