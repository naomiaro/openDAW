import { AudioUnitType, Colors } from "@opendaw/studio-enums";
import { TrackType } from "../timeline/TrackType";
export var ColorCodes;
(function (ColorCodes) {
    ColorCodes.forAudioType = (type) => {
        switch (type) {
            case AudioUnitType.Output:
                return Colors.blue;
            case AudioUnitType.Aux:
                return Colors.purple;
            case AudioUnitType.Bus:
                return Colors.orange;
            case AudioUnitType.Instrument:
                return Colors.green;
            default:
                return Colors.dark;
        }
    };
    ColorCodes.forTrackType = (type) => {
        switch (type) {
            case TrackType.Audio:
                return 200;
            case TrackType.Notes:
                return 45;
            case TrackType.Value:
                return 156;
            default:
                return 0;
        }
    };
})(ColorCodes || (ColorCodes = {}));
