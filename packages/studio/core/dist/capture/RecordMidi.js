import { Option, quantizeCeil, quantizeFloor, Terminator, UUID } from "@opendaw/lib-std";
import { PPQN } from "@opendaw/lib-dsp";
import { NoteEventBox, NoteEventCollectionBox, NoteRegionBox } from "@opendaw/studio-boxes";
import { ColorCodes, NoteSignal, TrackType } from "@opendaw/studio-adapters";
import { RecordTrack } from "./RecordTrack";
export var RecordMidi;
(function (RecordMidi) {
    RecordMidi.start = ({ notifier, project, capture }) => {
        console.debug("RecordMidi.start");
        const beats = PPQN.fromSignature(1, project.timelineBox.signature.denominator.getValue());
        const { editing, boxGraph, engine } = project;
        const { position, isRecording } = engine;
        const trackBox = RecordTrack.findOrCreate(editing, capture.audioUnitBox, TrackType.Notes);
        const terminator = new Terminator();
        const activeNotes = new Map();
        let writing = Option.None;
        terminator.own(position.catchupAndSubscribe(owner => {
            if (writing.isEmpty()) {
                return;
            }
            const writePosition = owner.getValue();
            const { region, collection } = writing.unwrap();
            editing.modify(() => {
                if (region.isAttached() && collection.isAttached()) {
                    const { position, duration, loopDuration } = region;
                    const newDuration = quantizeCeil(writePosition, beats) - position.getValue();
                    duration.setValue(newDuration);
                    loopDuration.setValue(newDuration);
                    for (const event of activeNotes.values()) {
                        if (event.isAttached()) {
                            event.duration.setValue(writePosition - region.position.getValue() - event.position.getValue());
                        }
                        else {
                            activeNotes.delete(event.pitch.getValue());
                        }
                    }
                }
                else {
                    terminator.terminate();
                    writing = Option.None;
                }
            }, false);
        }));
        terminator.ownAll(notifier.subscribe((signal) => {
            if (!isRecording.getValue()) {
                return;
            }
            const ppqn = position.getValue();
            if (NoteSignal.isOn(signal)) {
                const { pitch, velocity } = signal;
                if (writing.isEmpty()) {
                    editing.modify(() => {
                        const collection = NoteEventCollectionBox.create(boxGraph, UUID.generate());
                        const region = NoteRegionBox.create(boxGraph, UUID.generate(), box => {
                            box.regions.refer(trackBox.regions);
                            box.events.refer(collection.owners);
                            box.position.setValue(quantizeFloor(ppqn, beats));
                            box.hue.setValue(ColorCodes.forTrackType(TrackType.Notes));
                        });
                        engine.ignoreNoteRegion(region.address.uuid);
                        writing = Option.wrap({ region, collection });
                    }, false);
                }
                const { region, collection } = writing.unwrap();
                editing.modify(() => {
                    activeNotes.set(pitch, NoteEventBox.create(boxGraph, UUID.generate(), box => {
                        box.position.setValue(ppqn - region.position.getValue());
                        box.duration.setValue(1.0);
                        box.pitch.setValue(pitch);
                        box.velocity.setValue(velocity);
                        box.events.refer(collection.events);
                    }));
                }, false);
            }
            else if (NoteSignal.isOff(signal)) {
                activeNotes.delete(signal.pitch);
            }
        }));
        return terminator;
    };
})(RecordMidi || (RecordMidi = {}));
