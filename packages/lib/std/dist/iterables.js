import { isDefined } from "./lang";
export class Iterables {
    static *empty() { }
    static one(value) { return [value]; }
    static count(iterable) {
        let count = 0 | 0;
        for (const _ of iterable) {
            count++;
        }
        return count;
    }
    static some(iterable, predicate) {
        for (const value of iterable) {
            if (predicate(value)) {
                return true;
            }
        }
        return false;
    }
    static every(iterable, predicate) {
        for (const value of iterable) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }
    static reduce(iterable, callback, initialValue) {
        let accumulator = initialValue;
        let index = 0;
        for (const value of iterable) {
            accumulator = callback(accumulator, value, index++);
        }
        return accumulator;
    }
    static includes(iterable, include) {
        for (const value of iterable) {
            if (value === include) {
                return true;
            }
        }
        return false;
    }
    static forEach(iterable, procedure) {
        for (const value of iterable) {
            procedure(value);
        }
    }
    static *map(iterable, map) {
        let count = 0 | 0;
        for (const value of iterable) {
            yield map(value, count++);
        }
    }
    static *take(iterator, count) {
        let i = 0;
        for (const value of iterator) {
            if (i++ >= count) {
                return;
            }
            yield value;
        }
    }
    static filter(iterable, fn) {
        const result = [];
        for (const value of iterable) {
            if (fn(value)) {
                result.push(value);
            }
        }
        return result;
    }
    static filterMap(iterable, fn) {
        const result = [];
        for (const value of iterable) {
            const mapped = fn(value);
            if (isDefined(mapped)) {
                result.push(mapped);
            }
        }
        return result;
    }
    static reverse(iterable) {
        const result = [];
        for (const value of iterable) {
            result.push(value);
        }
        return result.reverse();
    }
    static *pairWise(iterable) {
        const iterator = iterable[Symbol.iterator]();
        const { done, value } = iterator.next();
        let prev = value;
        if (done === true) {
            return;
        }
        while (true) {
            const { done, value } = iterator.next();
            if (done === true) {
                yield [prev, null];
                return;
            }
            yield [prev, value];
            prev = value;
        }
    }
}
