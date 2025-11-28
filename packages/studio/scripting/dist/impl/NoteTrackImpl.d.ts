import { AudioUnit, NoteRegion, NoteRegionProps, NoteTrack } from "../Api";
import { NoteRegionImpl } from "./NoteRegionImpl";
import { AudioUnitImpl } from "./AudioUnitImpl";
export declare class NoteTrackImpl implements NoteTrack {
    #private;
    readonly audioUnit: AudioUnit;
    enabled: boolean;
    constructor(audioUnit: AudioUnitImpl, props?: Partial<NoteTrack>);
    addRegion(props?: NoteRegionProps): NoteRegion;
    get regions(): ReadonlyArray<NoteRegionImpl>;
}
//# sourceMappingURL=NoteTrackImpl.d.ts.map