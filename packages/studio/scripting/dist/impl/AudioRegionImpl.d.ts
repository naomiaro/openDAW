import { AudioRegion, AudioTrack } from "../Api";
import { ppqn } from "@opendaw/lib-dsp";
import { int } from "@opendaw/lib-std";
import { Sample } from "@opendaw/studio-adapters";
import { AudioPlayback } from "@opendaw/studio-enums";
export declare class AudioRegionImpl implements AudioRegion {
    readonly track: AudioTrack;
    sample: Sample;
    playback: AudioPlayback.NoSync | AudioPlayback.Pitch;
    position: ppqn;
    duration: ppqn;
    mute: boolean;
    label: string;
    hue: int;
    loopDuration: ppqn;
    loopOffset: ppqn;
    constructor(track: AudioTrack, sample: Sample, props?: Partial<AudioRegion>);
}
//# sourceMappingURL=AudioRegionImpl.d.ts.map