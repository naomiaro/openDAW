import { Comparator, Func, int } from "./lang";
export declare namespace BinarySearch {
    const exact: <T>(sorted: ReadonlyArray<T>, key: T, comparator: Comparator<T>) => int;
    const exactMapped: <T, U>(sorted: ReadonlyArray<U>, key: T, comparator: Comparator<T>, map: Func<U, T>) => int;
    const leftMost: <T>(sorted: ReadonlyArray<T>, key: T, comparator: Comparator<T>) => int;
    const rightMost: <T>(sorted: ReadonlyArray<T>, key: T, comparator: Comparator<T>) => int;
    /**
     * stableInsert
     *
     * A hybrid binary-search variant is used when inserting into a sorted array
     * that must remain both numerically sorted and stable for equal values.
     *
     * - `leftMost` inserts before existing equal elements → breaks stability
     *   (newer equal values appear before older ones)
     * - `rightMost` inserts after existing equal elements → preserves stability
     *   but may misplace smaller values if used naively
     *
     * `stableInsert` combines both:
     * it finds the first element greater than the key (not equal),
     * ensuring correct ascending order while appending after any equals.
     *
     * This pattern is common in associative containers like multimaps,
     * priority queues, or event lists where items share the same key
     * but must preserve their original insertion order.
     */
    const stableInsert: <T>(sorted: ReadonlyArray<T>, key: T, comparator: Comparator<T>) => int;
    const leftMostMapped: <T, U>(sorted: ReadonlyArray<U>, key: T, comparator: Comparator<T>, map: Func<U, T>) => int;
    const rightMostMapped: <T, U>(sorted: ReadonlyArray<U>, key: T, comparator: Comparator<T>, map: Func<U, T>) => int;
    const rangeMapped: <T, U>(sorted: ReadonlyArray<U>, key: T, comparator: Comparator<T>, map: Func<U, T>) => [int, int];
}
//# sourceMappingURL=binary-search.d.ts.map