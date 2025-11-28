import { IconSymbol } from "@opendaw/studio-enums";
export var TrackType;
(function (TrackType) {
    TrackType[TrackType["Undefined"] = 0] = "Undefined";
    TrackType[TrackType["Notes"] = 1] = "Notes";
    TrackType[TrackType["Audio"] = 2] = "Audio";
    TrackType[TrackType["Value"] = 3] = "Value";
})(TrackType || (TrackType = {}));
(function (TrackType) {
    TrackType.toLabelString = (type) => {
        switch (type) {
            case TrackType.Audio:
                return "Audio";
            case TrackType.Notes:
                return "Notes";
            case TrackType.Value:
                return "Automation";
            case TrackType.Undefined:
            default:
                return "N/A";
        }
    };
    TrackType.toIconSymbol = (type) => {
        switch (type) {
            case TrackType.Audio:
                return IconSymbol.Waveform;
            case TrackType.Notes:
                return IconSymbol.Piano;
            case TrackType.Value:
                return IconSymbol.Automation;
            case TrackType.Undefined:
                return IconSymbol.AudioBus;
            default:
                return IconSymbol.Unknown;
        }
    };
})(TrackType || (TrackType = {}));
