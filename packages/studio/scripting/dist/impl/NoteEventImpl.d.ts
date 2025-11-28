import { NoteEvent } from "../Api";
import { ppqn } from "@opendaw/lib-dsp";
export declare class NoteEventImpl implements NoteEvent {
    position: ppqn;
    duration: ppqn;
    pitch: number;
    cents: number;
    velocity: number;
    constructor(props?: Partial<NoteEvent>);
}
//# sourceMappingURL=NoteEventImpl.d.ts.map