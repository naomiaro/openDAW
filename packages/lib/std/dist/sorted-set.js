import { asDefined, isDefined, panic } from "./lang";
import { Arrays } from "./arrays";
import { Option } from "./option";
import { BinarySearch } from "./binary-search";
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
export class SortedSet {
    #extractor;
    #comparator;
    #array;
    constructor(extractor, comparator) {
        this.#extractor = extractor;
        this.#comparator = comparator;
        this.#array = [];
    }
    add(value, replace = false) {
        const key = this.#extractor(value);
        const insertIndex = BinarySearch.leftMostMapped(this.#array, key, this.#comparator, this.#extractor);
        const current = this.#array[insertIndex];
        if (isDefined(current) && this.#comparator(this.#extractor(current), key) === 0) {
            if (replace) {
                this.#array.splice(insertIndex, 1, value);
                return true;
            }
            return false;
        }
        this.#array.splice(insertIndex, 0, value);
        return true;
    }
    getOrCreate(key, factory) {
        const insertIndex = BinarySearch.leftMostMapped(this.#array, key, this.#comparator, this.#extractor);
        const current = this.#array[insertIndex];
        if (isDefined(current) && this.#comparator(this.#extractor(current), key) === 0) {
            return current;
        }
        const value = factory(key);
        this.#array.splice(insertIndex, 0, value);
        return value;
    }
    addMany(values) {
        for (const value of values) {
            this.#array.push(value);
        }
        try {
            this.#array.sort((a, b) => {
                const delta = this.#comparator(this.#extractor(a), this.#extractor(b));
                if (delta === 0) {
                    throw "cancel";
                }
                return delta;
            });
            return true;
        }
        catch (reason) {
            if (reason === "cancel") {
                const uniqueKeys = new Map(this.entries());
                this.#array.splice(0, this.#array.length, ...uniqueKeys.values());
                this.#array.sort((a, b) => this.#comparator(this.#extractor(a), this.#extractor(b)));
                return false;
            }
            return panic(reason);
        }
    }
    removeByValue(value) { return this.removeByKey(this.#extractor(value)); }
    removeByKey(key) {
        const deleteIndex = BinarySearch.leftMostMapped(this.#array, key, this.#comparator, this.#extractor);
        const candidate = this.#array[deleteIndex];
        if (isDefined(candidate) && this.#comparator(this.#extractor(candidate), key) === 0) {
            this.#array.splice(deleteIndex, 1);
            return candidate;
        }
        return panic(`Could not remove ${key}`);
    }
    removeByKeyIfExist(key) {
        const deleteIndex = BinarySearch.leftMostMapped(this.#array, key, this.#comparator, this.#extractor);
        const candidate = this.#array[deleteIndex];
        if (isDefined(candidate) && this.#comparator(this.#extractor(candidate), key) === 0) {
            this.#array.splice(deleteIndex, 1);
            return candidate;
        }
        return null;
    }
    removeRange(startIndex, endIndex) {
        this.#array.splice(startIndex, (endIndex ?? this.#array.length) - startIndex);
    }
    removeByPredicate(predicate) {
        let count = 0 | 0;
        let index = this.#array.length;
        while (--index >= 0) {
            if (predicate(this.#array[index])) {
                this.#array.splice(index, 1);
                count++;
            }
        }
        return count;
    }
    get(key) { return asDefined(this.#lookup(key), `Unknown key: ${key}`); }
    getOrThrow(key, provider) {
        const candidate = this.#lookup(key);
        if (isDefined(candidate)) {
            return candidate;
        }
        else {
            throw provider();
        }
    }
    opt(key) { return Option.wrap(this.#lookup(key)); }
    getOrNull(key) { return this.#lookup(key) ?? null; }
    getByIndex(index) { return this.#array[index]; }
    hasKey(key) { return isDefined(this.#lookup(key)); }
    hasValue(value) { return isDefined(this.#lookup(this.#extractor(value))); }
    size() { return this.#array.length; }
    isEmpty() { return this.#array.length === 0; }
    forEach(procedure) { this.values().forEach(procedure); }
    values() { return this.#array; }
    entries() { return this.#array.map((entry) => [this.#extractor(entry), entry]); }
    clear() { Arrays.clear(this.#array); }
    [Symbol.iterator]() { return this.#array.values(); }
    #lookup(key) {
        const index = BinarySearch.leftMostMapped(this.#array, key, this.#comparator, this.#extractor);
        const candidate = this.#array[index];
        return isDefined(candidate) && this.#comparator(this.#extractor(candidate), key) === 0 ? candidate : undefined;
    }
}
