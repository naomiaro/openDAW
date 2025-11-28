import { Comparator, Func, int, Nullable, Option, Predicate, unitValue } from "@opendaw/lib-std";
import { ppqn } from "./ppqn";
export interface Event {
    readonly type: string;
    get position(): ppqn;
}
export declare namespace Event {
    const Comparator: Comparator<Event>;
    const PositionExtractor: Func<Event, ppqn>;
}
export interface EventSpan extends Event {
    get duration(): ppqn;
}
export declare namespace EventSpan {
    const complete: (event: EventSpan) => ppqn;
    const DescendingComparator: Comparator<EventSpan>;
}
export type Region = EventSpan;
export interface LoopableRegion extends Region {
    get loopOffset(): ppqn;
    get loopDuration(): ppqn;
}
export declare namespace LoopableRegion {
    const globalToLocal: (region: LoopableRegion, ppqn: ppqn) => ppqn;
    interface LoopCycle {
        index: int;
        rawStart: ppqn;
        rawEnd: ppqn;
        regionStart: ppqn;
        regionEnd: ppqn;
        resultStart: ppqn;
        resultEnd: ppqn;
        resultStartValue: unitValue;
        resultEndValue: unitValue;
    }
    type Region = {
        position: ppqn;
        complete: ppqn;
        loopOffset: ppqn;
        loopDuration: ppqn;
    };
    const locateLoop: ({ position, complete, loopOffset, loopDuration }: Region, from: ppqn, to: ppqn) => Option<LoopCycle>;
    function locateLoops({ position, complete, loopOffset, loopDuration }: Region, from: ppqn, to: ppqn): Generator<LoopCycle>;
}
export interface Track<REGION extends EventSpan> {
    get regions(): EventArray<REGION>;
    get enabled(): boolean;
    get index(): int;
}
export declare class EventCollection<EVENT extends Event = Event> implements EventArray<EVENT> {
    #private;
    static DefaultComparator: Comparator<Event>;
    static create<EVENT extends Event>(comparator?: Comparator<EVENT>): EventCollection<EVENT>;
    private constructor();
    add(event: EVENT): void;
    remove(event: EVENT): boolean;
    contains(event: EVENT): boolean;
    clear(): void;
    optAt(index: number): Nullable<EVENT>;
    asArray(): ReadonlyArray<EVENT>;
    lowerEqual(position: number, predicate?: Predicate<EVENT>): Nullable<EVENT>;
    greaterEqual(position: number, predicate?: Predicate<EVENT>): Nullable<EVENT>;
    floorLastIndex(position: number): number;
    ceilFirstIndex(position: number): number;
    iterateFrom(fromPosition: number, predicate?: Predicate<EVENT>): Generator<EVENT>;
    iterateRange(fromPosition: int, toPosition: int, predicate?: Predicate<EVENT>): Generator<EVENT>;
    length(): number;
    isEmpty(): boolean;
    onIndexingChanged(): void;
}
export declare class RegionCollection<REGION extends EventSpan> implements EventArray<REGION> {
    #private;
    static Comparator: Comparator<EventSpan>;
    static create<REGION extends EventSpan>(comparator: Comparator<REGION>): RegionCollection<REGION>;
    private constructor();
    add(event: REGION): void;
    remove(event: REGION): boolean;
    contains(event: REGION): boolean;
    clear(): void;
    optAt(index: number): Nullable<REGION>;
    asArray(): ReadonlyArray<REGION>;
    lowerEqual(position: number, predicate?: Predicate<REGION>): Nullable<REGION>;
    greaterEqual(position: number, predicate?: Predicate<REGION>): Nullable<REGION>;
    floorLastIndex(position: number): number;
    ceilFirstIndex(position: number): number;
    iterateFrom(fromPosition: number, predicate?: Predicate<REGION>): Generator<REGION>;
    iterateRange(fromPosition: int, toPosition: int): Generator<REGION>;
    length(): number;
    isEmpty(): boolean;
    onIndexingChanged(): void;
}
export interface EventArray<E extends Event> {
    add(event: E): void;
    remove(event: E): boolean;
    contains(event: E): boolean;
    clear(): void;
    optAt(index: int): Nullable<E>;
    asArray(): ReadonlyArray<E>;
    lowerEqual(position: int, predicate?: Predicate<E>): Nullable<E>;
    greaterEqual(position: int): Nullable<E>;
    floorLastIndex(position: int): int;
    ceilFirstIndex(position: int): int;
    iterateFrom(fromPosition: int, predicate?: Predicate<E>): Generator<E>;
    iterateRange(fromPosition: int, toPosition: int, predicate?: Predicate<E>): Generator<E>;
    length(): int;
    isEmpty(): boolean;
    onIndexingChanged(): void;
}
export declare class EventSpanRetainer<E extends EventSpan> {
    #private;
    constructor();
    addAndRetain(event: E): void;
    overlapping(position: ppqn, comparator?: Comparator<E>): Generator<E>;
    releaseLinearCompleted(position: ppqn): Generator<E, void, void>;
    releaseAll(): Generator<E, void, void>;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    clear(): void;
}
//# sourceMappingURL=events.d.ts.map