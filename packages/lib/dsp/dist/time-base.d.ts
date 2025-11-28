import { MutableValueOwner, ValueOwner } from "@opendaw/lib-std";
import { ppqn, samples, seconds } from "./ppqn";
import { TempoMap } from "./tempo";
export declare enum TimeBase {
    Musical = "musical",// PPQN
    Seconds = "seconds"
}
/**
 * Converts between musical time (PPQN) and absolute time (seconds/samples) for a specific value.
 * The converter knows the value's native time-base and uses a TempoMap for conversions.
 */
export interface TimeBaseConverter {
    toPPQN(): ppqn;
    fromPPQN(ppqn: ppqn): void;
    toSeconds(): seconds;
    toSamples(sampleRate: number): samples;
    rawValue(): number;
    getTimeBase(): TimeBase;
}
export declare namespace TimeBaseConverter {
    function musical(tempoMap: TempoMap, position: ValueOwner<ppqn>, property: MutableValueOwner<number>): TimeBaseConverter;
    function aware(tempoMap: TempoMap, timeBase: ValueOwner<string>, position: ValueOwner<ppqn>, property: MutableValueOwner<number>): TimeBaseConverter;
}
//# sourceMappingURL=time-base.d.ts.map