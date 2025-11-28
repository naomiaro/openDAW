import { Subscription, Terminable } from "./terminable";
import { Option } from "./option";
import { Func, Maybe, Nullable, Procedure, ValueOrProvider } from "./lang";
import { Bijective } from "./bijective";
import { Observer } from "./observers";
export interface ValueOwner<T> {
    getValue(): T;
}
export interface MutableValueOwner<T> extends ValueOwner<T> {
    setValue(value: T): void;
}
export interface Observable<VALUE> {
    subscribe(observer: Observer<VALUE>): Subscription;
}
export interface ObservableValue<T> extends ValueOwner<T>, Observable<ObservableValue<T>> {
    catchupAndSubscribe(observer: Observer<ObservableValue<T>>): Subscription;
}
export declare namespace ObservableValue {
    const seal: <T>(value: T) => ObservableValue<T>;
}
export interface MutableObservableValue<T> extends MutableValueOwner<T>, ObservableValue<T> {
}
export declare namespace MutableObservableValue {
    const False: MutableObservableValue<boolean>;
    const inverseBoolean: (observableValue: MutableObservableValue<boolean>) => MutableObservableValue<boolean>;
}
export interface ObservableOption<T> extends Option<T>, Observable<Option<T>>, Terminable {
    catchupAndSubscribe(observer: Observer<Option<T>>): Subscription;
}
export declare class MutableObservableOption<T> implements ObservableOption<T> {
    #private;
    constructor(value?: T);
    wrap(value: Maybe<T>): void;
    wrapOption(value: Option<T>): void;
    clear(procedure?: Procedure<T>): void;
    assert(fail?: ValueOrProvider<string>): this;
    contains(value: T): boolean;
    equals(other: Option<T>): boolean;
    flatMap<U>(func: Func<T, Option<U>>): Option<U>;
    ifSome<R>(procedure: Procedure<T>): R | undefined;
    ifAbsent<R>(exec: Func<T, R>): R | undefined;
    isEmpty(): boolean;
    map<U>(func: Func<T, Maybe<U>>): Option<U>;
    mapOr<U>(func: Func<T, U>, or: ValueOrProvider<U>): U;
    match<R>(matchable: Option.Matchable<T, R>): R;
    nonEmpty(): boolean;
    unwrap(fail?: ValueOrProvider<string>): T;
    unwrapOrElse(or: ValueOrProvider<T>): T;
    unwrapOrNull(): Nullable<T>;
    unwrapOrUndefined(): T | undefined;
    subscribe(observer: Observer<Option<T>>): Subscription;
    catchupAndSubscribe(observer: Observer<Option<T>>): Subscription;
    terminate(): void;
}
export declare class MappedMutableObservableValue<SOURCE, TARGET> implements MutableObservableValue<TARGET>, Terminable {
    #private;
    constructor(source: MutableObservableValue<SOURCE>, mapping: Bijective<SOURCE, TARGET>);
    catchupAndSubscribe(observer: Observer<ObservableValue<TARGET>>): Subscription;
    getValue(): TARGET;
    setValue(value: TARGET): void;
    subscribe(observer: Observer<ObservableValue<TARGET>>): Subscription;
    terminate(): void;
}
export interface ValueGuard<T> {
    guard(value: T): T;
}
export declare class DefaultObservableValue<T> implements MutableObservableValue<T>, Terminable {
    #private;
    constructor(value: T, guard?: ValueGuard<T>);
    setValue(value: T): void;
    getValue(): T;
    subscribe(observer: Observer<ObservableValue<T>>): Terminable;
    catchupAndSubscribe(observer: Observer<ObservableValue<T>>): Terminable;
    terminate(): void;
    toString(): string;
}
//# sourceMappingURL=observables.d.ts.map