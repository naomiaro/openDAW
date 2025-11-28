import { NoteEvent, NoteRegion, NoteRegionProps, NoteTrack } from "../Api";
import { ppqn } from "@opendaw/lib-dsp";
import { int } from "@opendaw/lib-std";
import { NoteEventImpl } from "./NoteEventImpl";
export declare class NoteRegionImpl implements NoteRegion {
    #private;
    readonly track: NoteTrack;
    readonly mirror?: NoteRegion;
    position: ppqn;
    duration: ppqn;
    mute: boolean;
    label: string;
    hue: int;
    loopDuration: ppqn;
    loopOffset: ppqn;
    constructor(track: NoteTrack, props?: NoteRegionProps);
    addEvent(props?: Partial<NoteEvent>): NoteEvent;
    addEvents(events: Array<Partial<NoteEvent>>): void;
    get events(): ReadonlyArray<NoteEventImpl>;
}
//# sourceMappingURL=NoteRegionImpl.d.ts.map