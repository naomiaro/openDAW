import { AudioUnitBox } from "@opendaw/studio-boxes";
import { BoxGraph } from "@opendaw/lib-box";
import { IndexRef } from "./IndexRef";
import { AudioTrackImpl } from "./impl/AudioTrackImpl";
export declare namespace AudioTrackWriter {
    const write: (boxGraph: BoxGraph, audioUnitBox: AudioUnitBox, audioTracks: ReadonlyArray<AudioTrackImpl>, indexRef: IndexRef) => void;
}
//# sourceMappingURL=AudioTrackWriter.d.ts.map