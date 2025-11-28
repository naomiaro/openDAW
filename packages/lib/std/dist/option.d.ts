import { AnyFunc, Func, Maybe, Nullable, Procedure, Provider, ValueOrProvider } from "./lang";
export interface Option<T> {
    unwrap(fail?: ValueOrProvider<string>): T;
    unwrapOrElse(or: ValueOrProvider<T>): T;
    unwrapOrNull(): Nullable<T>;
    unwrapOrUndefined(): T | undefined;
    match<R>(matchable: Option.Matchable<T, R>): R;
    ifSome<R>(procedure: Procedure<T>): R | undefined;
    ifAbsent<R>(exec: Func<T, R>): R | undefined;
    contains(value: T): boolean;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    map<U>(func: Func<T, Maybe<U>>): Option<U>;
    mapOr<U>(func: Func<T, U>, or: ValueOrProvider<U>): U;
    flatMap<U>(func: Func<T, Option<U>>): Option<U>;
    equals(other: Option<T>): boolean;
    assert(fail?: ValueOrProvider<string>): this;
}
export declare namespace Option {
    interface Matchable<T, RETURN> {
        some: Func<T, RETURN>;
        none: Provider<RETURN>;
    }
    const wrap: <T>(value: Maybe<T>) => Option<T | never>;
    const from: <T>(provider: Provider<Maybe<T>>) => Option<T>;
    const tryFrom: <T>(provider: Provider<T>) => Option<T>;
    const execute: <F extends AnyFunc>(func: Maybe<F>, ...args: Parameters<F>) => Option<ReturnType<F>>;
    const async: <RESULT>(promise: Promise<RESULT>) => Promise<Option<RESULT>>;
    class Some<T> implements Option<T> {
        #private;
        constructor(value: T);
        unwrap(): T;
        unwrapOrElse(_: ValueOrProvider<T>): T;
        unwrapOrNull(): Nullable<T>;
        unwrapOrUndefined(): T | undefined;
        contains(value: T): boolean;
        match<R>(matchable: Matchable<T, R>): R;
        ifSome<R extends undefined>(run: Func<T, R>): R;
        ifAbsent<R>(_func: Func<T, R>): R | undefined;
        isEmpty(): boolean;
        nonEmpty(): boolean;
        map<U>(callback: (value: T) => Maybe<U>): Option<U>;
        mapOr<U>(func: Func<T, U>, _or: U | Provider<U>): U;
        flatMap<U>(callback: (value: T) => Option<U>): Option<U>;
        equals(other: Option<T>): boolean;
        assert(_fail?: ValueOrProvider<string>): this;
        toString(): string;
        get [Symbol.toStringTag](): string;
    }
    const None: Option<never>;
}
//# sourceMappingURL=option.d.ts.map