import { Comparator, Nullable, Predicate } from "./lang";
export interface Multimap<K, V> {
    clear(): void;
    containsEntry(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): Iterable<V>;
    isEmpty(): boolean;
    add(key: K, value: V): void;
    addAll(key: K, values: Iterable<V>): void;
    remove(key: K, value: V): boolean;
    removeFromKeyIf(key: K, value: Predicate<V>): Nullable<V>;
    removeValueIf(value: Predicate<V>): ReadonlySet<V>;
    removeKey(key: K): Iterable<V>;
    forEach(callback: (key: K, values: Iterable<V>) => void): void;
    keyCount(): number;
    keys(): Iterable<K>;
    sortKeys(comparator: Comparator<K>): this;
    clone(): Multimap<K, V>;
}
export declare class ArrayMultimap<K, V> implements Multimap<K, V>, Iterable<[K, Array<V>]> {
    #private;
    constructor(entries?: ReadonlyArray<Readonly<[K, V[]]>>, comparator?: Comparator<V>);
    [Symbol.iterator](): Iterator<[K, V[]]>;
    clear(): void;
    containsEntry(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): ReadonlyArray<V>;
    isEmpty(): boolean;
    add(key: K, value: V): void;
    addAll(key: K, values: Iterable<V>): void;
    remove(key: K, value: V): boolean;
    removeFromKeyIf(key: K, predicate: Predicate<V>): Nullable<V>;
    removeValueIf(predicate: Predicate<V>): ReadonlySet<V>;
    removeKey(key: K): ReadonlyArray<V>;
    forEach(callback: (key: K, values: ReadonlyArray<V>) => void): void;
    keyCount(): number;
    keys(): Iterable<K>;
    sortKeys(comparator: Comparator<K>): this;
    clone(): ArrayMultimap<K, V>;
}
export declare class SetMultimap<K, V> implements Multimap<K, V> {
    private readonly map;
    constructor(entries?: readonly (readonly [K, V[]])[]);
    clear(): void;
    containsEntry(key: K, value: V): boolean;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): ReadonlySet<V>;
    isEmpty(): boolean;
    add(key: K, value: V): void;
    addAll(key: K, values: Iterable<V>): void;
    remove(key: K, value: V): boolean;
    removeValueIf(predicate: Predicate<V>): ReadonlySet<V>;
    removeFromKeyIf(key: K, predicate: Predicate<V>): Nullable<V>;
    removeKey(key: K): ReadonlySet<V>;
    forEach(callback: (key: K, values: ReadonlySet<V>) => void): void;
    keyCount(): number;
    keys(): Iterable<K>;
    sortKeys(comparator: Comparator<K>): this;
    clone(): SetMultimap<K, V>;
}
//# sourceMappingURL=multimap.d.ts.map