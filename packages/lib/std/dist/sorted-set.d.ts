import { Comparator, Func, int, Nullable, Predicate, Procedure, Provider } from "./lang";
import { Option } from "./option";
/**
 * SortedSet
 * ---------------------------
 * Advantages Over Native Set
 * ---------------------------
 * Custom Key Extraction: Allows using complex keys (like UUID) with custom comparison logic
 * Ordered Iteration: Elements are always iterated in sorted order (not necessarily favored)
 * Efficient Lookups: O(log n) lookups using binary search
 * Flexible Duplicate Handling: Control whether to replace or duplicates or throw an error
 * -----------------------------
 * Disadvantages Over Native Set
 * -----------------------------
 * No Range Operations: No efficient range-based operations
 * Losing insert order: Elements get sorted by key and not insert order
 */
export declare class SortedSet<K, V> implements Iterable<V> {
    #private;
    constructor(extractor: Func<V, K>, comparator: Comparator<K>);
    add(value: V, replace?: boolean): boolean;
    getOrCreate(key: K, factory: (key: K) => V): V;
    addMany(values: Iterable<V>): boolean;
    removeByValue(value: V): V;
    removeByKey(key: K): V;
    removeByKeyIfExist(key: K): Nullable<V>;
    removeRange(startIndex: int, endIndex?: int): void;
    removeByPredicate(predicate: Predicate<V>): int;
    get(key: K): V;
    getOrThrow(key: K, provider: Provider<Error>): V;
    opt(key: K): Option<V>;
    getOrNull(key: K): Nullable<V>;
    getByIndex(index: int): V;
    hasKey(key: K): boolean;
    hasValue(value: V): boolean;
    size(): int;
    isEmpty(): boolean;
    forEach(procedure: Procedure<V>): void;
    values(): ReadonlyArray<V>;
    entries(): Iterable<[K, V]>;
    clear(): void;
    [Symbol.iterator](): Iterator<V>;
}
//# sourceMappingURL=sorted-set.d.ts.map