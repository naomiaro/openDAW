import { Arrays } from "./arrays";
import { Sets } from "./sets";
import { Iterables } from "./iterables";
import { Maps } from "./maps";
import { Option } from "./option";
import { BinarySearch } from "./binary-search";
export class ArrayMultimap {
    #map;
    #comparator;
    constructor(entries, comparator) {
        this.#map = new Map(entries);
        this.#comparator = Option.wrap(comparator);
        this.#comparator.ifSome(comparator => Array.from(this.#map.values()).forEach(array => array.sort(comparator)));
    }
    [Symbol.iterator]() { return this.#map.entries(); }
    clear() { this.#map.clear(); }
    containsEntry(key, value) {
        return Iterables.some(this.#map.entries(), (entry) => key === entry[0] && entry[1].includes(value));
    }
    containsKey(key) {
        return Iterables.includes(this.#map.keys(), key);
    }
    containsValue(value) {
        return Iterables.some(this.#map.values(), (values) => values.includes(value));
    }
    get(key) { return this.#map.get(key) ?? Arrays.empty(); }
    isEmpty() { return this.keyCount() === 0; }
    add(key, value) {
        const array = Maps.createIfAbsent(this.#map, key, () => []);
        if (this.#comparator.isEmpty()) {
            array.push(value);
        }
        else {
            const insertIndex = BinarySearch.stableInsert(array, value, this.#comparator.unwrap());
            array.splice(insertIndex, 0, value);
        }
    }
    addAll(key, values) {
        const array = Maps.createIfAbsent(this.#map, key, () => []);
        array.push(...values);
        if (this.#comparator.nonEmpty()) {
            array.sort(this.#comparator.unwrap());
        }
    }
    remove(key, value) {
        const values = this.#map.get(key);
        if (values === undefined) {
            return false;
        }
        else {
            const index = values.indexOf(value);
            if (index === -1) {
                return false;
            }
            else {
                values.splice(index, 1);
                if (values.length === 0) {
                    this.#map.delete(key);
                }
                return true;
            }
        }
    }
    removeFromKeyIf(key, predicate) {
        const values = this.#map.get(key);
        if (values === undefined) {
            return null;
        }
        else {
            const index = values.findIndex(predicate);
            if (index === -1) {
                return null;
            }
            else {
                const removed = values.splice(index, 1)[0];
                if (values.length === 0) {
                    this.#map.delete(key);
                }
                return removed;
            }
        }
    }
    removeValueIf(predicate) {
        const removeList = [];
        for (const [key, values] of this.#map.entries()) {
            for (const value of values.filter(value => predicate(value))) {
                removeList.push([key, value]);
            }
        }
        for (const [key, value] of removeList) {
            this.remove(key, value);
        }
        return new Set(removeList.map(([, value]) => value));
    }
    removeKey(key) {
        const values = this.#map.get(key);
        this.#map.delete(key);
        return values ?? Arrays.empty();
    }
    forEach(callback) {
        Iterables.forEach(this.#map.entries(), (entry) => callback(entry[0], entry[1]));
    }
    keyCount() { return this.#map.size; }
    keys() { return this.#map.keys(); }
    sortKeys(comparator) {
        const clone = this.clone();
        const keys = Array.from(this.keys()).sort(comparator);
        this.#map.clear();
        for (const key of keys) {
            this.addAll(key, clone.get(key));
        }
        return this;
    }
    clone() {
        const copy = new ArrayMultimap();
        this.#map.forEach((values, key) => {
            copy.#map.set(key, values.map((value) => value));
        });
        return copy;
    }
}
export class SetMultimap {
    map;
    constructor(entries) {
        this.map = new Map(entries?.map((entry) => {
            const key = entry[0];
            const values = entry[1];
            return [key, new Set(values)];
        }));
    }
    clear() {
        this.map.clear();
    }
    containsEntry(key, value) {
        return Iterables.some(this.map.entries(), (entry) => key === entry[0] && entry[1].has(value));
    }
    containsKey(key) {
        return Iterables.includes(this.map.keys(), key);
    }
    containsValue(value) {
        return Iterables.some(this.map.values(), (values) => values.has(value));
    }
    get(key) {
        return this.map.get(key) ?? Sets.empty();
    }
    isEmpty() {
        return this.keyCount() === 0;
    }
    add(key, value) {
        Maps.createIfAbsent(this.map, key, () => new Set).add(value);
    }
    addAll(key, values) {
        const set = Maps.createIfAbsent(this.map, key, () => new Set);
        for (const value of values) {
            set.add(value);
        }
    }
    remove(key, value) {
        const values = this.map.get(key);
        if (values === undefined) {
            return false;
        }
        else {
            if (!values.delete(value)) {
                return false;
            }
            if (values.size === 0) {
                this.map.delete(key);
            }
            return true;
        }
    }
    removeValueIf(predicate) {
        const removeSet = new Set();
        for (const [key, values] of this.map.entries()) {
            for (const value of values) {
                if (predicate(value)) {
                    values.delete(value);
                    removeSet.add(value);
                }
            }
            if (values.size === 0) {
                this.map.delete(key);
            }
        }
        return removeSet;
    }
    removeFromKeyIf(key, predicate) {
        const values = this.map.get(key);
        if (values === undefined) {
            return null;
        }
        else {
            for (const value of values) {
                if (predicate(value)) {
                    values.delete(value);
                    if (values.size === 0) {
                        this.map.delete(key);
                    }
                    return value;
                }
            }
            return null;
        }
    }
    removeKey(key) {
        const values = this.map.get(key);
        this.map.delete(key);
        return values ?? Sets.empty();
    }
    forEach(callback) {
        Iterables.forEach(this.map.entries(), (entry) => callback(entry[0], entry[1]));
    }
    keyCount() { return this.map.size; }
    keys() { return this.map.keys(); }
    sortKeys(comparator) {
        const clone = this.clone();
        const keys = Array.from(this.keys()).sort(comparator);
        this.map.clear();
        for (const key of keys) {
            this.addAll(key, clone.get(key));
        }
        return this;
    }
    clone() {
        const copy = new SetMultimap();
        this.map.forEach((values, key) => {
            copy.map.set(key, new Set(Array.from(values)));
        });
        return copy;
    }
}
