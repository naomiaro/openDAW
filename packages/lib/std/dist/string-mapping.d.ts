import { int, unitValue } from "./lang";
export type StringResult = {
    value: string;
    unit: string;
};
export type ParseResult<T> = {
    type: "unknown";
    value: string;
} | {
    type: "unitValue";
    value: unitValue;
} | {
    type: "explicit";
    value: T;
};
export interface StringMapping<T> {
    y(x: string): ParseResult<T>;
    x(y: T): StringResult;
}
export declare namespace StringMapping {
    type NumericOptions = {
        unit?: string;
        fractionDigits?: int;
        unitPrefix?: boolean;
        bipolar?: boolean;
    };
    const percent: ({ bipolar, fractionDigits }?: NumericOptions) => StringMapping<number>;
    const numeric: ({ unit, fractionDigits, unitPrefix, bipolar }?: NumericOptions) => StringMapping<number>;
    const indices: (unit: string, values: ReadonlyArray<string>) => StringMapping<int>;
    const values: <T>(unit: string, values: ReadonlyArray<T>, strings: ReadonlyArray<string>) => StringMapping<T>;
    const bool: {
        y(x: string): ParseResult<boolean>;
        x(y: boolean): StringResult;
    };
    const boolValues: (falseValue: string, trueValue: string) => {
        y(x: string): ParseResult<boolean>;
        x(y: boolean): StringResult;
    };
    const decible: StringMapping<number>;
    const panning: StringMapping<number>;
}
//# sourceMappingURL=string-mapping.d.ts.map