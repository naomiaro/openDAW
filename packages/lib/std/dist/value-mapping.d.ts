import { int, unitValue } from "./lang";
export interface ValueMapping<Y> {
    y(x: unitValue): Y;
    x(y: Y): unitValue;
    clamp(y: Y): Y;
    floating(): boolean;
}
export declare namespace ValueMapping {
    const linear: (min: number, max: number) => ValueMapping<number>;
    const linearInteger: (min: int, max: int) => ValueMapping<int>;
    const exponential: (min: number, max: number) => ValueMapping<number>;
    const values: <T>(values: ReadonlyArray<T>) => ValueMapping<T>;
    const decibel: (min: number, mid: number, max: number) => ValueMapping<number>;
    const bool: {
        x(y: boolean): unitValue;
        y(x: unitValue): boolean;
        clamp(y: boolean): boolean;
        floating(): boolean;
    };
    const unipolar: () => ValueMapping<number>;
    const bipolar: () => ValueMapping<number>;
    const DefaultDecibel: ValueMapping<number>;
}
//# sourceMappingURL=value-mapping.d.ts.map