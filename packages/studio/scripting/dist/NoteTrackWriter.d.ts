import { NoteTrackImpl } from "./impl";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { BoxGraph } from "@opendaw/lib-box";
import { IndexRef } from "./IndexRef";
export declare class NoteTrackWriter {
    #private;
    write(boxGraph: BoxGraph, audioUnitBox: AudioUnitBox, noteTracks: ReadonlyArray<NoteTrackImpl>, indexRef: IndexRef): void;
}
//# sourceMappingURL=NoteTrackWriter.d.ts.map