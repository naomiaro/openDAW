import { PPQN } from "@opendaw/lib-dsp";
import { ColorCodes, TrackType } from "@opendaw/studio-adapters";
import { AudioPlayback } from "@opendaw/studio-enums";
export class AudioRegionImpl {
    track;
    sample;
    playback;
    position;
    duration;
    mute;
    label;
    hue;
    loopDuration;
    loopOffset;
    constructor(track, sample, props) {
        this.track = track;
        this.sample = sample;
        this.playback = props?.playback ?? AudioPlayback.Pitch;
        this.position = props?.position ?? 0.0;
        this.duration = props?.duration ?? PPQN.Bar;
        this.loopDuration = props?.loopDuration ?? this.duration;
        this.loopOffset = props?.loopOffset ?? 0.0;
        this.mute = props?.mute ?? false;
        this.label = props?.label ?? "";
        this.hue = props?.hue ?? ColorCodes.forTrackType(TrackType.Audio);
    }
}
