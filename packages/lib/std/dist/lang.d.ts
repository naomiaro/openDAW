export type byte = number;
export type short = number;
export type int = number;
export type float = number;
export type double = number;
export type long = bigint;
export type unitValue = number;
export type bipolar = number;
export type NumberArray = ReadonlyArray<number> | Float32Array | Float64Array | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array;
export type FloatArray = Float32Array | Float64Array | Array<number>;
export type Primitive = boolean | byte | short | int | long | float | double | string | Readonly<Int8Array>;
export type JsType = "string" | "number" | "boolean" | "object" | "undefined" | "function" | "symbol" | "bigint" | "null";
export type StructuredCloneable = string | number | boolean | null | undefined | StructuredCloneable[] | {
    [key: string]: StructuredCloneable;
} | ArrayBuffer | DataView | Date | Map<StructuredCloneable, StructuredCloneable> | Set<StructuredCloneable> | RegExp;
export type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
export type JSONArray = Array<JSONValue>;
export type JSONObject = {
    [key: string]: Optional<JSONValue>;
};
export type Id<T extends unknown> = T & {
    id: int;
};
export type Sign = -1 | 0 | 1;
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined | null;
export type Class<T = object> = Function & {
    prototype: T;
};
export type Exec = () => void;
export type Provider<T> = () => T;
export type ValueOrProvider<T> = T | Provider<T>;
export type Procedure<T> = (value: T) => void;
export type Predicate<T> = (value: T) => boolean;
export type Func<U, T> = (value: U) => T;
export type Comparator<T> = (a: T, b: T) => number;
export type Comparable<T> = {
    compareTo: (other: T) => number;
};
export type Equality<T> = {
    equals: (other: T) => boolean;
};
export type AnyFunc = (...args: any[]) => any;
export type Stringifiable = {
    toString(): string;
};
export type MakeMutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type AssertType<T> = (value: unknown) => value is T;
export declare const identity: <T>(value: T) => T;
export declare const isDefined: <T>(value: Maybe<T>) => value is T;
export declare const isNull: (value: unknown) => value is null;
export declare const isNotNull: <T>(value: Nullable<T>) => value is T;
export declare const isUndefined: (value: unknown) => value is undefined;
export declare const isNotUndefined: <T>(value: Optional<T>) => value is T;
export declare const isAbsent: (value: unknown) => value is undefined | null;
export declare const ifDefined: <T, R = void>(value: Maybe<T>, procedure: Func<T, R>) => R | undefined;
export declare const asDefined: <T>(value: Maybe<T>, fail?: ValueOrProvider<string>) => T;
export declare const isInstanceOf: <T>(obj: unknown, clazz: Class<T>) => obj is T;
export declare const asInstanceOf: <T>(obj: unknown, clazz: Class<T>) => T;
export declare const assertInstanceOf: <T>(obj: unknown, clazz: Class<T>) => asserts obj is T;
export declare const isSameClass: (a: object, b: object) => boolean;
export declare const tryProvide: <T>(provider: Provider<T>) => T;
export declare const getOrProvide: <T>(value: ValueOrProvider<T>) => T;
export declare const safeWrite: (object: any, property: string, value: any) => void;
export declare const safeExecute: <F extends AnyFunc>(func: Maybe<F>, ...args: Parameters<F>) => Maybe<ReturnType<F>>;
export declare const isRecord: (value: unknown) => value is Record<string, unknown>;
export declare const hasField: (record: Record<string, unknown>, key: string, type: JsType) => boolean;
export declare const safeRead: (object: unknown, ...keys: string[]) => Maybe<unknown>;
export declare const Unhandled: <R>(empty: never) => R;
export declare const panic: (issue?: string | Error | unknown) => never;
export declare const assert: (condition: boolean, fail: ValueOrProvider<string>) => void;
export declare const checkIndex: (index: int, array: {
    length: int;
}) => int;
export declare const InaccessibleProperty: <T>(failMessage: string) => T;
export declare const canWrite: <T>(obj: T, key: keyof any) => obj is T & Record<typeof key, unknown>;
export declare const requireProperty: <T extends {}>(object: T, key: keyof T) => void;
export declare class SuccessResult<T> {
    readonly value: T;
    readonly status = "success";
    constructor(value: T);
    error: unknown;
}
export declare class FailureResult {
    readonly error: unknown;
    readonly status = "failure";
    constructor(error: unknown);
    value: unknown;
}
export declare const tryCatch: <T>(statement: Provider<T>) => SuccessResult<T> | FailureResult;
export declare const isValidIdentifier: (identifier: string) => boolean;
export declare const asValidIdentifier: (identifier: string) => string;
export declare const asEnumValue: <E extends Record<string, string | number>>(value: string | number, enm: E) => E[keyof E];
export declare const EmptyExec: Exec;
export declare const EmptyProvider: Provider<any>;
export declare const EmptyProcedure: Procedure<any>;
//# sourceMappingURL=lang.d.ts.map