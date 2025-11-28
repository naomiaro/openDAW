import { Event } from "./Event";
import { MidiFileDecoder } from "./MidiFileDecoder";
export declare const enum MetaType {
    SEQUENCE_NUMBER = 0,
    TEXT_EVENT = 1,
    COPYRIGHT_NOTICE = 2,
    SEQUENCE_TRACK_NAME = 3,
    INSTRUMENT_NAME = 4,
    LYRICS = 5,
    MARKER = 6,
    CUE_POINT = 7,
    CHANNEL_PREFIX = 32,
    SET_TEMPO = 81,
    SMPTE_OFFSET = 84,
    TIME_SIGNATURE = 88,
    KEY_SIGNATURE = 89,
    SEQUENCER_SPECIFIC = 127,
    PREFIX_PORT = 33,
    END_OF_TRACK = 47
}
export declare class MetaEvent implements Event<MetaType> {
    readonly ticks: number;
    readonly type: MetaType;
    readonly value: unknown;
    private constructor();
    static decode(decoder: MidiFileDecoder, ticks: number): MetaEvent | null;
    toString(): string;
}
//# sourceMappingURL=MetaType.d.ts.map