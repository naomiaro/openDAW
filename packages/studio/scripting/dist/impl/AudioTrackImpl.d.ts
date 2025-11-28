import { AudioRegion, AudioTrack, AudioUnit } from "../Api";
import { AudioRegionImpl } from "./AudioRegionImpl";
import { AudioUnitImpl } from "./AudioUnitImpl";
export declare class AudioTrackImpl implements AudioTrack {
    #private;
    readonly audioUnit: AudioUnit;
    enabled: boolean;
    constructor(audioUnit: AudioUnitImpl, props?: Partial<AudioTrack>);
    addRegion(sample: Sample, props?: Partial<AudioRegion>): AudioRegion;
    get regions(): ReadonlyArray<AudioRegionImpl>;
}
//# sourceMappingURL=AudioTrackImpl.d.ts.map