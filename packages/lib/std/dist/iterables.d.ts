import { Func, int, Maybe, Nullable, Predicate, Procedure } from "./lang";
export declare class Iterables {
    static empty<T>(): Iterable<T>;
    static one<T>(value: T): Iterable<T>;
    static count<T>(iterable: Iterable<T>): int;
    static some<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): boolean;
    static every<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): boolean;
    static reduce<T, U>(iterable: Iterable<T>, callback: (previous: U, value: T, index: int) => U, initialValue: U): U;
    static includes<T>(iterable: Iterable<T>, include: T): boolean;
    static forEach<T>(iterable: Iterable<T>, procedure: Procedure<T>): void;
    static map<T, U>(iterable: Iterable<T>, map: (value: T, index: int) => U): Generator<U>;
    static take<T>(iterator: Iterable<T>, count: int): Generator<T>;
    static filter<T>(iterable: Iterable<T>, fn: Predicate<T>): T[];
    static filterMap<T, U>(iterable: Iterable<T>, fn: Func<T, Maybe<U>>): U[];
    static reverse<T>(iterable: Iterable<T>): Iterable<T>;
    static pairWise<T>(iterable: Iterable<T>): IteratorObject<[T, Nullable<T>]>;
}
//# sourceMappingURL=iterables.d.ts.map