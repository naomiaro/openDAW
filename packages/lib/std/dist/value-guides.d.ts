import { unitValue } from "./lang";
export interface ValueGuide {
    begin(value: unitValue): void;
    moveBy(delta: number): void;
    ratio(value: number): void;
    value(): unitValue;
    disable(): void;
    enable(): void;
}
export declare namespace ValueGuide {
    export type Options = {
        horizontal?: boolean;
        trackLength?: number;
        ratio?: number;
        snap?: {
            threshold: number | ReadonlyArray<number>;
            snapLength?: number;
        };
    };
    export const create: (option?: Options) => ValueGuide;
    export const snap: (trackLength: number | undefined, snapLength: number | undefined, thresholds: unitValue[]) => Snap;
    export const identity: (trackLength?: number) => ValueGuide;
    class Snap implements ValueGuide {
        #private;
        constructor(length: number, margin: number, thresholds: Array<number>);
        begin(value: unitValue): void;
        moveBy(delta: number): void;
        ratio(value: number): void;
        value(): unitValue;
        disable(): void;
        enable(): void;
        valueToX(value: unitValue): number;
        xToValue(x: number): unitValue;
        get margin(): number;
    }
    export {};
}
//# sourceMappingURL=value-guides.d.ts.map