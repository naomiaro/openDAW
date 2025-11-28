import { int } from "@opendaw/lib-std";
import { MidiTrack } from "./MidiTrack";
export declare class MidiFileFormat {
    readonly tracks: ReadonlyArray<MidiTrack>;
    readonly formatType: int;
    readonly timeDivision: int;
    constructor(tracks: ReadonlyArray<MidiTrack>, formatType: int, timeDivision: int);
}
//# sourceMappingURL=MidiFileFormat.d.ts.map