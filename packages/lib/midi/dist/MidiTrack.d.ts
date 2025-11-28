import { ArrayMultimap } from "@opendaw/lib-std";
import { Channel } from "./Channel";
import { ControlEvent } from "./ControlEvent";
import { MetaEvent } from "./MetaType";
import { MidiFileDecoder } from "./MidiFileDecoder";
export declare class MidiTrack {
    readonly controlEvents: ArrayMultimap<Channel, ControlEvent>;
    readonly metaEvents: Array<MetaEvent>;
    static decode(decoder: MidiFileDecoder): MidiTrack;
    static createEmpty(): MidiTrack;
    constructor(controlEvents: ArrayMultimap<Channel, ControlEvent>, metaEvents: Array<MetaEvent>);
    encode(): ArrayBufferLike;
}
//# sourceMappingURL=MidiTrack.d.ts.map