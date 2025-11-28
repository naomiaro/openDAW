import { asDefined, isDefined, UUID } from "@opendaw/lib-std";
import { NoteEventBox, NoteEventCollectionBox, NoteRegionBox, TrackBox } from "@opendaw/studio-boxes";
import { TrackType } from "@opendaw/studio-adapters";
export class NoteTrackWriter {
    #map = new Map();
    write(boxGraph, audioUnitBox, noteTracks, indexRef) {
        noteTracks.forEach(({ enabled, regions }) => {
            const trackBox = TrackBox.create(boxGraph, UUID.generate(), box => {
                box.type.setValue(TrackType.Notes);
                box.enabled.setValue(enabled);
                box.index.setValue(indexRef.index++);
                box.target.refer(audioUnitBox);
                box.tracks.refer(audioUnitBox.tracks);
            });
            regions.forEach((region) => {
                const { position, duration, loopDuration, loopOffset, events, hue, label, mute, mirror } = region;
                const noteEventCollectionBox = isDefined(mirror)
                    ? asDefined(this.#map.get(mirror), "mirror region not found in map")
                    : NoteEventCollectionBox.create(boxGraph, UUID.generate());
                this.#map.set(region, noteEventCollectionBox);
                events.forEach(event => {
                    NoteEventBox.create(boxGraph, UUID.generate(), box => {
                        box.position.setValue(event.position);
                        box.duration.setValue(event.duration);
                        box.pitch.setValue(event.pitch);
                        box.cent.setValue(event.cents); // TODO rename to plural
                        box.velocity.setValue(event.velocity);
                        box.events.refer(noteEventCollectionBox.events);
                    });
                });
                NoteRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(position);
                    box.duration.setValue(duration);
                    box.loopDuration.setValue(loopDuration);
                    box.loopOffset.setValue(loopOffset);
                    box.hue.setValue(hue);
                    box.label.setValue(label);
                    box.mute.setValue(mute);
                    box.regions.refer(trackBox.regions);
                    box.events.refer(noteEventCollectionBox.owners);
                });
            });
        });
    }
}
