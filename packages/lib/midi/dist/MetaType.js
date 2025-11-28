export var MetaType;
(function (MetaType) {
    MetaType[MetaType["SEQUENCE_NUMBER"] = 0] = "SEQUENCE_NUMBER";
    MetaType[MetaType["TEXT_EVENT"] = 1] = "TEXT_EVENT";
    MetaType[MetaType["COPYRIGHT_NOTICE"] = 2] = "COPYRIGHT_NOTICE";
    MetaType[MetaType["SEQUENCE_TRACK_NAME"] = 3] = "SEQUENCE_TRACK_NAME";
    MetaType[MetaType["INSTRUMENT_NAME"] = 4] = "INSTRUMENT_NAME";
    MetaType[MetaType["LYRICS"] = 5] = "LYRICS";
    MetaType[MetaType["MARKER"] = 6] = "MARKER";
    MetaType[MetaType["CUE_POINT"] = 7] = "CUE_POINT";
    MetaType[MetaType["CHANNEL_PREFIX"] = 32] = "CHANNEL_PREFIX";
    MetaType[MetaType["SET_TEMPO"] = 81] = "SET_TEMPO";
    MetaType[MetaType["SMPTE_OFFSET"] = 84] = "SMPTE_OFFSET";
    MetaType[MetaType["TIME_SIGNATURE"] = 88] = "TIME_SIGNATURE";
    MetaType[MetaType["KEY_SIGNATURE"] = 89] = "KEY_SIGNATURE";
    MetaType[MetaType["SEQUENCER_SPECIFIC"] = 127] = "SEQUENCER_SPECIFIC";
    MetaType[MetaType["PREFIX_PORT"] = 33] = "PREFIX_PORT";
    MetaType[MetaType["END_OF_TRACK"] = 47] = "END_OF_TRACK";
})(MetaType || (MetaType = {}));
export class MetaEvent {
    ticks;
    type;
    value;
    constructor(ticks, type, value) {
        this.ticks = ticks;
        this.type = type;
        this.value = value;
    }
    static decode(decoder, ticks) {
        const type = decoder.readByte() & 0xff;
        const length = decoder.readVarLen();
        switch (type) {
            case MetaType.SET_TEMPO:
                return new MetaEvent(ticks, type, decoder.readTempo());
            case MetaType.TIME_SIGNATURE:
                return new MetaEvent(ticks, type, decoder.readSignature());
            case MetaType.END_OF_TRACK:
                return new MetaEvent(ticks, type, null);
            case MetaType.TEXT_EVENT:
            case MetaType.COPYRIGHT_NOTICE:
            case MetaType.SEQUENCE_TRACK_NAME:
            case MetaType.INSTRUMENT_NAME:
            case MetaType.LYRICS:
            case MetaType.MARKER:
            case MetaType.CUE_POINT:
            case MetaType.SEQUENCE_NUMBER:
            case MetaType.CHANNEL_PREFIX:
            case MetaType.KEY_SIGNATURE:
            case MetaType.SEQUENCER_SPECIFIC:
            case MetaType.PREFIX_PORT:
            case MetaType.SMPTE_OFFSET:
            default:
                decoder.skip(length);
        }
        return null;
    }
    toString() {
        return `MetaEvent{ticks: ${this.ticks}, type: ${this.type}, value: ${this.value}}`;
    }
}
