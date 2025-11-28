import { asDefined, panic } from "./lang";
export var Sorting;
(function (Sorting) {
    Sorting[Sorting["Ascending"] = 1] = "Ascending";
    Sorting[Sorting["Descending"] = -1] = "Descending";
})(Sorting || (Sorting = {}));
export class Arrays {
    static #empty = Object.freeze(new Array(0));
    static empty = () => (() => this.#empty)();
    static clear = (array) => { array.length = 0; };
    static replace = (array, newValues) => {
        array.length = 0;
        array.push(...newValues);
    };
    static consume = (array, procedure) => {
        for (let index = 0; index < array.length;) {
            if (procedure(array[index])) {
                array.splice(index, 1);
            }
            else {
                index++;
            }
        }
    };
    static peekFirst = (array) => array.at(0) ?? null;
    static peekLast = (array) => array.at(-1) ?? null;
    static getFirst = (array, fail) => asDefined(array.at(0), fail);
    static getLast = (array, fail) => asDefined(array.at(-1), fail);
    static getPrev = (array, element) => {
        const index = array.indexOf(element);
        if (index === -1) {
            return panic(`${element} not found in ${array}`);
        }
        return asDefined(array.at((index - 1) % array.length), "Internal Error");
    };
    static getNext = (array, element) => {
        const index = array.indexOf(element);
        if (index === -1) {
            return panic(`${element} not found in ${array}`);
        }
        return asDefined(array.at((index + 1) % array.length), "Internal Error");
    };
    static removeLast = (array, fail) => asDefined(array.pop(), fail);
    static create = (factory, n) => {
        const array = new Array(n);
        for (let i = 0; i < n; i++) {
            array[i] = factory(i);
        }
        return array;
    };
    static equals = (a, b) => {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * The satisfy method checks if all elements in a given array satisfy a provided predicate function
     * when compared with the first element of the array. That essentially means that all tested properties
     * in the predicate function are equal throughout the array.
     * [1, 1, 1, 1, 1] > (a, b) => a === b returns true
     * [1, 1, 1, 1, 2] > (a, b) => a === b returns false
     * [1, 1, 3, 2, 1] > (a, b) => a === b returns false
     */
    static satisfy = (array, predicate) => {
        if (array.length < 2) {
            return true;
        }
        const first = array[0];
        for (let i = 1; i < array.length; i++) {
            if (!predicate(first, array[i])) {
                return false;
            }
        }
        return true;
    };
    static remove = (array, element) => {
        const index = array.indexOf(element);
        if (index === -1) {
            return panic(`${element} not found in ${array}`);
        }
        array.splice(index, 1);
    };
    static removeIf = (array, predicate) => {
        for (let i = array.length - 1; i >= 0; i--) {
            if (predicate(array[i])) {
                array.splice(i, 1);
            }
        }
    };
    static removeOpt = (array, element) => {
        const index = array.indexOf(element);
        if (index === -1) {
            return false;
        }
        array.splice(index, 1);
        return true;
    };
    static hasDuplicates = (array) => new Set(array).size < array.length;
    static removeDuplicates = (array) => {
        let index = 0 | 0;
        const result = new Set();
        for (const element of array) {
            if (!result.has(element)) {
                result.add(element);
                array[index++] = element;
            }
        }
        array.length = index;
        return array;
    };
    static removeDuplicateKeys = (array, key) => {
        let index = 0 | 0;
        const seen = new Set();
        for (const element of array) {
            const value = element[key];
            if (!seen.has(value)) {
                seen.add(value);
                array[index++] = element;
            }
        }
        array.length = index;
        return array;
    };
    static subtract(array, excludeArray, compareFn) {
        return array.filter(item => !excludeArray.some(excludeItem => compareFn(item, excludeItem)));
    }
    static intersect(array, other, compareFn) {
        return array.filter(item => other.some(includeItem => compareFn(item, includeItem)));
    }
    static merge(baseArray, mergeIntoArray, compareFn) {
        return [...(baseArray
                .filter(baseItem => !mergeIntoArray
                .some(mergeItem => compareFn(baseItem, mergeItem)))), ...mergeIntoArray];
    }
    static *iterate(array) {
        for (let i = 0; i < array.length; i++) {
            yield array[i];
        }
    }
    static *iterateReverse(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i];
        }
    }
    static *iterateStateFull(array) {
        const maxIndex = array.length - 1;
        for (let i = 0; i <= maxIndex; i++) {
            yield { value: array[i], isFirst: i === 0, isLast: i === maxIndex };
        }
    }
    static *iterateAdjacent(array) {
        if (array.length <= 1) {
            return;
        }
        for (let i = 1, left = array[0]; i < array.length; i++) {
            const right = array[i];
            yield [left, right];
            left = right;
        }
    }
    static isSorted(array, sorting = Sorting.Ascending) {
        if (array.length < 2) {
            return true;
        }
        let prev = array[0];
        for (let i = 1; i < array.length; i++) {
            const next = array[i];
            if (Math.sign(prev - next) === sorting) {
                return false;
            }
            prev = next;
        }
        return true;
    }
    static toRecord(array, toKey) {
        return array.reduce((record, value) => {
            record[toKey(value)] = value;
            return record;
        }, {});
    }
    static concatArrayBuffers(a, b) {
        const result = new ArrayBuffer(a.byteLength + b.byteLength);
        const view = new Uint8Array(result);
        view.set(new Uint8Array(a), 0);
        view.set(new Uint8Array(b), a.byteLength);
        return result;
    }
}
