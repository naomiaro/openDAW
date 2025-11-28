import { Func, int, Nullable, NumberArray, Predicate } from "./lang";
export declare enum Sorting {
    Ascending = 1,
    Descending = -1
}
export declare class Arrays {
    #private;
    static readonly empty: <T>() => ReadonlyArray<T>;
    static readonly clear: <T>(array: Array<T>) => void;
    static readonly replace: <T>(array: Array<T>, newValues: Array<T>) => void;
    static readonly consume: <T>(array: Array<T>, procedure: Func<T, boolean>) => void;
    static readonly peekFirst: <T>(array: ReadonlyArray<T>) => Nullable<T>;
    static readonly peekLast: <T>(array: ReadonlyArray<T>) => Nullable<T>;
    static readonly getFirst: <T>(array: ReadonlyArray<T>, fail: string) => T;
    static readonly getLast: <T>(array: ReadonlyArray<T>, fail: string) => T;
    static readonly getPrev: <T>(array: Array<T>, element: T) => T;
    static readonly getNext: <T>(array: Array<T>, element: T) => T;
    static readonly removeLast: <T>(array: Array<T>, fail: string) => T;
    static readonly create: <T>(factory: Func<int, T>, n: int) => Array<T>;
    static readonly equals: <T>(a: ArrayLike<T>, b: ArrayLike<T>) => boolean;
    /**
     * The satisfy method checks if all elements in a given array satisfy a provided predicate function
     * when compared with the first element of the array. That essentially means that all tested properties
     * in the predicate function are equal throughout the array.
     * [1, 1, 1, 1, 1] > (a, b) => a === b returns true
     * [1, 1, 1, 1, 2] > (a, b) => a === b returns false
     * [1, 1, 3, 2, 1] > (a, b) => a === b returns false
     */
    static readonly satisfy: <T>(array: ReadonlyArray<T>, predicate: (a: T, b: T) => boolean) => boolean;
    static readonly remove: <T>(array: Array<T>, element: T) => void;
    static readonly removeIf: <T>(array: Array<T>, predicate: Predicate<T>) => void;
    static readonly removeOpt: <T>(array: Array<T>, element: T) => boolean;
    static readonly hasDuplicates: <T>(array: Array<T>) => boolean;
    static readonly removeDuplicates: <T>(array: Array<T>) => Array<T>;
    static readonly removeDuplicateKeys: <T, K extends keyof T>(array: Array<T>, key: K) => Array<T>;
    static subtract<T, U>(array: ReadonlyArray<T>, excludeArray: ReadonlyArray<U>, compareFn: (a: T, b: U) => boolean): Array<T>;
    static intersect<T, U>(array: ReadonlyArray<T>, other: ReadonlyArray<U>, compareFn: (a: T, b: U) => boolean): Array<T>;
    static merge<T>(baseArray: ReadonlyArray<T>, mergeIntoArray: ReadonlyArray<T>, compareFn: (a: T, b: T) => boolean): Array<T>;
    static iterate<T>(array: ArrayLike<T>): Generator<T>;
    static iterateReverse<T>(array: ArrayLike<T>): Generator<T>;
    static iterateStateFull<T>(array: ArrayLike<T>): Generator<{
        value: T;
        isFirst: boolean;
        isLast: boolean;
    }>;
    static iterateAdjacent<T>(array: ArrayLike<T>): Generator<[T, T]>;
    static isSorted<ARRAY extends NumberArray>(array: ARRAY, sorting?: Sorting): boolean;
    static toRecord<T, U extends keyof any>(array: ReadonlyArray<T>, toKey: Func<T, U>): Record<U, T>;
    static concatArrayBuffers(a: ArrayBufferLike, b: ArrayBufferLike): ArrayBuffer;
}
//# sourceMappingURL=arrays.d.ts.map