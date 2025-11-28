import { Comparator, int, Nullable, unitValue } from "@opendaw/lib-std";
import { Event, EventCollection } from "./events";
import { ppqn } from "./ppqn";
export type Interpolation = {
    type: "none";
} | {
    type: "linear";
} | {
    type: "curve";
    slope: unitValue;
};
export declare const Interpolation: {
    readonly None: {
        readonly type: "none";
    };
    readonly Linear: {
        readonly type: "linear";
    };
    readonly Curve: (slope: unitValue) => {
        readonly type: "curve";
        readonly slope: number;
    };
};
export interface ValueEvent extends Event {
    readonly type: "value-event";
    get index(): int;
    get value(): number;
    get interpolation(): Interpolation;
}
export declare namespace ValueEvent {
    const Comparator: Comparator<ValueEvent>;
    function iterateWindow<E extends ValueEvent>(events: EventCollection<E>, fromPosition: ppqn, toPosition: ppqn): Generator<E>;
    const nextEvent: <E extends ValueEvent>(events: EventCollection<E>, precursor: E) => Nullable<E>;
    /**
     * Computes a value at a given position
     */
    const valueAt: <E extends ValueEvent>(events: EventCollection<E>, position: ppqn, fallback: unitValue) => unitValue;
    /**
     * Quantize an automation in equal segments but also include min/max values.
     * This is used for the ValueClipPainter to draw circular automation curves.
     * It has been tested in the AutomationPage.
     */
    function quantise<E extends ValueEvent>(events: EventCollection<E>, position: ppqn, duration: ppqn, numSteps: number): IteratorObject<{
        position: ppqn;
        value: unitValue;
    }, void>;
}
//# sourceMappingURL=value.d.ts.map