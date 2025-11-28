import { UUID } from "@opendaw/lib-std";
import { AudioRegionBox, TrackBox, ValueEventCollectionBox } from "@opendaw/studio-boxes";
import { TrackType } from "@opendaw/studio-adapters";
import { AudioPlayback } from "@opendaw/studio-enums";
import { TimeBase } from "@opendaw/lib-dsp";
import { AudioFileBoxfactory } from "./AudioFileBoxfactory";
export var AudioTrackWriter;
(function (AudioTrackWriter) {
    AudioTrackWriter.write = (boxGraph, audioUnitBox, audioTracks, indexRef) => {
        audioTracks.forEach(({ enabled, regions }) => {
            const trackBox = TrackBox.create(boxGraph, UUID.generate(), box => {
                box.type.setValue(TrackType.Audio);
                box.enabled.setValue(enabled);
                box.index.setValue(indexRef.index++);
                box.target.refer(audioUnitBox);
                box.tracks.refer(audioUnitBox.tracks);
            });
            regions.forEach((region) => {
                const { position, duration, loopDuration, loopOffset, hue, label, mute, sample } = region;
                const fileBox = AudioFileBoxfactory.create(boxGraph, sample);
                const collectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate());
                AudioRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(position);
                    box.duration.setValue(duration);
                    box.loopDuration.setValue(loopDuration);
                    box.loopOffset.setValue(loopOffset);
                    box.hue.setValue(hue);
                    box.label.setValue(label);
                    box.mute.setValue(mute);
                    box.regions.refer(trackBox.regions);
                    box.file.refer(fileBox);
                    box.events.refer(collectionBox.owners);
                    box.playback.setValue(region.playback);
                    box.timeBase.setValue(region.playback === AudioPlayback.NoSync
                        ? TimeBase.Seconds
                        : TimeBase.Musical);
                });
            });
        });
    };
})(AudioTrackWriter || (AudioTrackWriter = {}));
