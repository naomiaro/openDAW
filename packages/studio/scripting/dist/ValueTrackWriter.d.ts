import { ValueTrackImpl } from "./impl";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { Box, BoxGraph } from "@opendaw/lib-box";
import { AnyDevice } from "./Api";
import { IndexRef } from "./IndexRef";
export declare class ValueTrackWriter {
    #private;
    write(boxGraph: BoxGraph, devices: Map<AnyDevice, Box>, audioUnitBox: AudioUnitBox, valueTracks: ReadonlyArray<ValueTrackImpl>, indexRef: IndexRef): void;
}
//# sourceMappingURL=ValueTrackWriter.d.ts.map