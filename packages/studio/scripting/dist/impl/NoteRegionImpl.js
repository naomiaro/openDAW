import { PPQN } from "@opendaw/lib-dsp";
import { NoteEventImpl } from "./NoteEventImpl";
import { ColorCodes, TrackType } from "@opendaw/studio-adapters";
export class NoteRegionImpl {
    track;
    #events;
    mirror;
    position;
    duration;
    mute;
    label;
    hue;
    loopDuration;
    loopOffset;
    constructor(track, props) {
        this.track = track;
        this.position = props?.position ?? 0.0;
        this.duration = props?.duration ?? PPQN.Bar;
        this.loopDuration = props?.loopDuration ?? this.duration;
        this.loopOffset = props?.loopOffset ?? 0.0;
        this.mute = props?.mute ?? false;
        this.label = props?.label ?? "";
        this.hue = props?.hue ?? ColorCodes.forTrackType(TrackType.Notes);
        this.mirror = props?.mirror;
        this.#events = [];
    }
    addEvent(props) {
        const event = new NoteEventImpl(props);
        this.#events.push(event);
        return event;
    }
    addEvents(events) {
        events.forEach(event => this.addEvent(event));
    }
    get events() { return this.#events; }
}
