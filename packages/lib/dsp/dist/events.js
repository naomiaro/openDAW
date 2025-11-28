import { Arrays, BinarySearch, Generators, Integer, isDefined, mod, NumberComparator, Option, Predicates } from "@opendaw/lib-std";
export var Event;
(function (Event) {
    Event.Comparator = (a, b) => a.position - b.position;
    Event.PositionExtractor = (event) => event.position;
})(Event || (Event = {}));
export var EventSpan;
(function (EventSpan) {
    EventSpan.complete = (event) => event.position + event.duration;
    EventSpan.DescendingComparator = (a, b) => EventSpan.complete(b) - EventSpan.complete(a);
})(EventSpan || (EventSpan = {}));
// https://www.desmos.com/calculator/xz4tl5a9o9
export var LoopableRegion;
(function (LoopableRegion) {
    LoopableRegion.globalToLocal = (region, ppqn) => mod(ppqn - region.position + region.loopOffset, region.loopDuration);
    // This locates the first loop iteration and returns a LoopPass, if the loop overlaps the passed range
    // It is probably only used in region editors to render the region's content with the same renderer.
    LoopableRegion.locateLoop = ({ position, complete, loopOffset, loopDuration }, from, to) => {
        const rawStart = position - loopOffset;
        const rawEnd = rawStart + loopDuration;
        if (rawStart >= to || rawEnd <= from) {
            return Option.None;
        } // no overlap
        const resultStart = Math.max(rawStart, from);
        const resultEnd = Math.min(rawEnd, to);
        return Option.wrap({
            index: 0,
            rawStart,
            rawEnd,
            regionStart: Math.max(rawStart, position),
            regionEnd: Math.min(rawEnd, complete),
            resultStart,
            resultEnd,
            resultStartValue: rawStart < resultStart ? (resultStart - rawStart) / loopDuration : 0.0,
            resultEndValue: rawEnd > resultEnd ? (resultEnd - rawStart) / loopDuration : 1.0
        });
    };
    // This locates all loop passes within a given range.
    // This is used for region rendering but can also be used for sequencing region's content.
    function* locateLoops({ position, complete, loopOffset, loopDuration }, from, to) {
        const offset = position - loopOffset;
        const seekMin = Math.max(position, from);
        const seekMax = Math.min(complete, to);
        let passIndex = Math.floor((seekMin - offset) / loopDuration);
        let rawStart = offset + passIndex * loopDuration;
        while (rawStart < seekMax) {
            const rawEnd = rawStart + loopDuration;
            const regionStart = Math.max(rawStart, position);
            const regionEnd = Math.min(rawEnd, complete);
            const resultStart = Math.max(rawStart, seekMin);
            const resultEnd = Math.min(rawEnd, seekMax);
            const resultStartValue = rawStart < resultStart ? (resultStart - rawStart) / loopDuration : 0.0;
            const resultEndValue = rawEnd > resultEnd ? (resultEnd - rawStart) / loopDuration : 1.0;
            yield {
                index: passIndex++,
                rawStart,
                rawEnd,
                regionStart,
                regionEnd,
                resultStart,
                resultEnd,
                resultStartValue,
                resultEndValue
            };
            rawStart = rawEnd;
        }
    }
    LoopableRegion.locateLoops = locateLoops;
})(LoopableRegion || (LoopableRegion = {}));
export class EventCollection {
    static DefaultComparator = (a, b) => a.position - b.position;
    static create(comparator) {
        return new EventCollection(comparator ?? EventCollection.DefaultComparator);
    }
    #array;
    constructor(comparator) { this.#array = new EventArrayImpl(comparator); }
    add(event) { this.#array.add(event); }
    remove(event) { return this.#array.remove(event); }
    contains(event) { return this.#array.contains(event); }
    clear() { this.#array.clear(); }
    optAt(index) { return this.#array.optAt(index); }
    asArray() { return this.#array.asArray(); }
    lowerEqual(position, predicate) {
        return this.#array.lowerEqual(position, predicate);
    }
    greaterEqual(position, predicate) {
        return this.#array.greaterEqual(position, predicate);
    }
    floorLastIndex(position) { return this.#array.floorLastIndex(position); }
    ceilFirstIndex(position) { return this.#array.ceilFirstIndex(position); }
    iterateFrom(fromPosition, predicate) {
        if (this.#array.isEmpty()) {
            return Generators.empty();
        }
        return this.#array.iterateFrom(fromPosition, predicate);
    }
    iterateRange(fromPosition, toPosition, predicate) {
        if (this.#array.isEmpty()) {
            return Generators.empty();
        }
        return this.#array.iterate(this.#array.ceilFirstIndex(fromPosition), toPosition, predicate);
    }
    length() { return this.#array.length(); }
    isEmpty() { return this.#array.isEmpty(); }
    onIndexingChanged() { this.#array.onIndexingChanged(); }
}
export class RegionCollection {
    static Comparator = (a, b) => a.position - b.position;
    static create(comparator) {
        return new RegionCollection(comparator);
    }
    #array;
    constructor(comparator = RegionCollection.Comparator) {
        this.#array = new EventArrayImpl(comparator);
    }
    add(event) { this.#array.add(event); }
    remove(event) { return this.#array.remove(event); }
    contains(event) { return this.#array.contains(event); }
    clear() { this.#array.clear(); }
    optAt(index) { return this.#array.optAt(index); }
    asArray() { return this.#array.asArray(); }
    lowerEqual(position, predicate) {
        return this.#array.lowerEqual(position, predicate);
    }
    greaterEqual(position, predicate) {
        return this.#array.greaterEqual(position, predicate);
    }
    floorLastIndex(position) { return this.#array.floorLastIndex(position); }
    ceilFirstIndex(position) { return this.#array.ceilFirstIndex(position); }
    iterateFrom(fromPosition, predicate) {
        return this.#array.isEmpty() ? Generators.empty() : this.#array.iterateFrom(fromPosition, predicate);
    }
    iterateRange(fromPosition, toPosition) {
        if (this.#array.isEmpty()) {
            return Generators.empty();
        }
        let index = Math.max(0, this.#array.floorLastIndex(fromPosition));
        let period = this.#array.optAt(index);
        if (period === null) {
            return Generators.empty();
        }
        while (period.position + period.duration <= fromPosition) {
            period = this.#array.optAt(++index);
            if (period === null || period.position >= toPosition) {
                return Generators.empty();
            }
        }
        return this.#array.iterate(index, toPosition);
    }
    length() { return this.#array.length(); }
    isEmpty() { return this.#array.isEmpty(); }
    onIndexingChanged() { this.#array.onIndexingChanged(); }
}
export class EventSpanRetainer {
    #array;
    constructor() { this.#array = []; }
    addAndRetain(event) {
        if (this.#array.length === 0) {
            this.#array.push(event);
        }
        else {
            const insertIndex = BinarySearch.leftMost(this.#array, event, EventSpan.DescendingComparator);
            this.#array.splice(insertIndex, 0, event);
        }
    }
    *overlapping(position, comparator) {
        const result = this.#array.filter(event => event.position <= position && position < event.position + event.duration);
        yield* isDefined(comparator) ? result.sort(comparator) : result;
    }
    *releaseLinearCompleted(position) {
        if (this.#array.length === 0) {
            return;
        }
        for (let lastIndex = this.#array.length - 1; lastIndex >= 0; lastIndex--) {
            const event = this.#array[lastIndex];
            if (EventSpan.complete(event) < position) {
                this.#array.splice(lastIndex, 1);
                yield event;
            }
            else {
                return;
            }
        }
    }
    *releaseAll() {
        if (this.#array.length === 0) {
            return;
        }
        for (let lastIndex = this.#array.length - 1; lastIndex >= 0; lastIndex--) {
            const event = this.#array[lastIndex];
            if (Number.POSITIVE_INFINITY > event.duration) {
                this.#array.splice(lastIndex, 1);
                yield event;
            }
        }
    }
    isEmpty() { return this.#array.length === 0; }
    nonEmpty() { return this.#array.length > 0; }
    clear() { Arrays.clear(this.#array); }
}
class EventArrayImpl {
    comparator;
    #array = [];
    #unsorted = false;
    modCount = 0;
    constructor(comparator) {
        this.comparator = comparator;
    }
    add(event) {
        ++this.modCount;
        this.#array.push(event);
        if (this.#array.length > 1) {
            this.#unsorted = true;
        }
    }
    remove(event) {
        ++this.modCount;
        const index = this.#array.indexOf(event);
        if (-1 === index) {
            return false;
        }
        this.#array.splice(index, 1);
        return true;
    }
    contains(event) {
        const size = this.#array.length;
        if (size === 0) {
            return false;
        }
        if (this.#unsorted) {
            this.#sort();
        }
        const key = event.position;
        const startIndex = BinarySearch.leftMostMapped(this.#array, key, NumberComparator, Event.PositionExtractor);
        for (let i = startIndex; i < this.#array.length; i++) {
            const other = this.#array[i];
            if (other === event) {
                return true;
            }
            if (other.position !== key) {
                return false;
            }
        }
        return false;
    }
    clear() {
        ++this.modCount;
        Arrays.clear(this.#array);
        this.#unsorted = false;
    }
    optAt(index) {
        if (index < 0 || index >= this.#array.length) {
            return null;
        }
        if (this.#unsorted) {
            this.#sort();
        }
        return this.#array[index];
    }
    asArray() {
        if (this.#unsorted) {
            this.#sort();
        }
        return this.#array;
    }
    lowerEqual(position, predicate) {
        if (predicate === undefined) {
            return this.optAt(this.floorLastIndex(position));
        }
        let index = this.floorLastIndex(position);
        while (index >= 0) {
            const event = this.#array[index--];
            if (predicate(event)) {
                return event;
            }
        }
        return null;
    }
    greaterEqual(position, predicate) {
        if (predicate === undefined) {
            return this.optAt(this.ceilFirstIndex(position));
        }
        let index = this.ceilFirstIndex(position);
        while (index < this.#array.length) {
            const event = this.#array[index++];
            if (predicate(event)) {
                return event;
            }
        }
        return null;
    }
    floorLastIndex(position) {
        if (this.#unsorted) {
            this.#sort();
        }
        return BinarySearch.rightMostMapped(this.#array, position, NumberComparator, Event.PositionExtractor);
    }
    ceilFirstIndex(position) {
        if (this.#unsorted) {
            this.#sort();
        }
        return BinarySearch.leftMostMapped(this.#array, position, NumberComparator, Event.PositionExtractor);
    }
    iterateFrom(fromPosition, predicate) {
        const floorLastIndex = this.floorLastIndex(fromPosition);
        let startIndex = floorLastIndex;
        if (startIndex < 0) {
            return this.iterate(0, Integer.MAX_VALUE, predicate);
        }
        while (startIndex >= 0) {
            const event = this.optAt(startIndex);
            if (event !== null && predicate !== undefined && predicate(event)) {
                return this.iterate(startIndex, Integer.MAX_VALUE, predicate);
            }
            startIndex--;
        }
        return this.iterate(floorLastIndex, Integer.MAX_VALUE, predicate);
    }
    length() { return this.#array.length; }
    isEmpty() { return this.#array.length === 0; }
    onIndexingChanged() { this.#unsorted = this.length() > 1; }
    *iterate(fromIndex, toPosition, predicate = Predicates.alwaysTrue) {
        if (this.#unsorted) {
            this.#sort();
        }
        while (fromIndex < this.#array.length) {
            const element = this.#array[fromIndex++];
            if (element.position >= toPosition) {
                return;
            }
            if (predicate(element)) {
                yield element;
            }
        }
    }
    #sort() {
        this.#array.sort(this.comparator);
        this.#unsorted = false;
    }
}
