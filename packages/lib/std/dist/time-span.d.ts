import { int } from "./lang";
export declare class TimeSpan {
    #private;
    static readonly POSITIVE_INFINITY: TimeSpan;
    static readonly millis: (value: number) => TimeSpan;
    static readonly seconds: (value: number) => TimeSpan;
    static readonly minutes: (value: number) => TimeSpan;
    static readonly hours: (value: number) => TimeSpan;
    static readonly days: (value: number) => TimeSpan;
    private constructor();
    millis(): number;
    absSeconds(): number;
    absMinutes(): number;
    absHours(): number;
    absDays(): number;
    split(): {
        d: int;
        h: int;
        m: int;
        s: int;
    };
    isNow(): boolean;
    isPast(): boolean;
    isFuture(): boolean;
    toUnitString(): string;
    toString(): string;
}
//# sourceMappingURL=time-span.d.ts.map