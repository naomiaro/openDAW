import { Option, UUID } from "@opendaw/lib-std";
import { IndexedBox } from "@opendaw/lib-box";
import { AudioUnitBox, CaptureAudioBox, CaptureMidiBox } from "@opendaw/studio-boxes";
import { AudioUnitOrdering } from "./AudioUnitOrdering";
import { TrackType } from "../timeline/TrackType";
export var AudioUnitFactory;
(function (AudioUnitFactory) {
    AudioUnitFactory.create = ({ boxGraph, mandatoryBoxes: { rootBox, primaryAudioBus } }, type, capture, index) => {
        const insertIndex = index ?? AudioUnitFactory.orderAndGetIndex(rootBox, type);
        console.debug(`createAudioUnit type: ${type}, insertIndex: ${insertIndex}`);
        return AudioUnitBox.create(boxGraph, UUID.generate(), box => {
            box.collection.refer(rootBox.audioUnits);
            box.output.refer(primaryAudioBus.input);
            box.index.setValue(insertIndex);
            box.type.setValue(type);
            capture.ifSome(capture => box.capture.refer(capture));
        });
    };
    AudioUnitFactory.orderAndGetIndex = (rootBox, type) => {
        const boxes = IndexedBox.collectIndexedBoxes(rootBox.audioUnits, AudioUnitBox);
        const order = AudioUnitOrdering[type];
        let index = 0 | 0;
        for (; index < boxes.length; index++) {
            if (AudioUnitOrdering[boxes[index].type.getValue()] > order) {
                break;
            }
        }
        const insertIndex = index;
        while (index < boxes.length) {
            boxes[index].index.setValue(++index);
        }
        return insertIndex;
    };
    AudioUnitFactory.trackTypeToCapture = (boxGraph, trackType) => {
        switch (trackType) {
            case TrackType.Audio:
                return Option.wrap(CaptureAudioBox.create(boxGraph, UUID.generate()));
            case TrackType.Notes:
                return Option.wrap(CaptureMidiBox.create(boxGraph, UUID.generate()));
            default:
                return Option.None;
        }
    };
})(AudioUnitFactory || (AudioUnitFactory = {}));
