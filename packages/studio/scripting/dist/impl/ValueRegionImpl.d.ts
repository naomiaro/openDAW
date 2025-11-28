import { ValueEvent, ValueRegion, ValueRegionProps, ValueTrack } from "../Api";
import { ppqn } from "@opendaw/lib-dsp";
import { int } from "@opendaw/lib-std";
import { ValueEventImpl } from "./ValueEventImpl";
export declare class ValueRegionImpl implements ValueRegion {
    #private;
    readonly track: ValueTrack;
    readonly mirror?: ValueRegion;
    position: ppqn;
    duration: ppqn;
    loopDuration: ppqn;
    loopOffset: ppqn;
    mute: boolean;
    label: string;
    hue: int;
    constructor(track: ValueTrack, props?: ValueRegionProps);
    addEvent(props?: Partial<ValueEvent>): ValueEvent;
    addEvents(events: Array<Partial<ValueEvent>>): void;
    get events(): ReadonlyArray<ValueEventImpl>;
}
//# sourceMappingURL=ValueRegionImpl.d.ts.map