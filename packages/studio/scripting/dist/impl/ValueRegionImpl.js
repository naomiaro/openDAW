import { ValueEventImpl } from "./ValueEventImpl";
import { ColorCodes, TrackType } from "@opendaw/studio-adapters";
export class ValueRegionImpl {
    track;
    #events;
    mirror;
    position;
    duration;
    loopDuration;
    loopOffset;
    mute;
    label;
    hue;
    constructor(track, props) {
        this.track = track;
        this.mirror = props?.mirror;
        this.position = props?.position ?? 0.0;
        this.duration = props?.duration ?? 0.0;
        this.mute = props?.mute ?? false;
        this.label = props?.label ?? "";
        this.hue = props?.hue ?? ColorCodes.forTrackType(TrackType.Value);
        this.loopDuration = props?.loopDuration ?? this.duration;
        this.loopOffset = props?.loopOffset ?? 0.0;
        this.#events = [];
    }
    addEvent(props) {
        const event = new ValueEventImpl(props);
        this.#events.push(event);
        return event;
    }
    addEvents(events) {
        events.forEach(event => this.addEvent(event));
    }
    get events() {
        return this.#events;
    }
}
