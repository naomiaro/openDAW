import { assert, clamp, Option, Strings, UUID } from "@opendaw/lib-std";
import { PPQN } from "@opendaw/lib-dsp";
import { IndexedBox } from "@opendaw/lib-box";
import { AudioUnitType } from "@opendaw/studio-enums";
import { CaptureAudioBox, CaptureMidiBox, NoteClipBox, NoteEventBox, NoteEventCollectionBox, NoteRegionBox, TrackBox, ValueClipBox, ValueEventCollectionBox, ValueRegionBox } from "@opendaw/studio-boxes";
import { AudioUnitFactory, ColorCodes, ProjectQueries, TrackType } from "@opendaw/studio-adapters";
// noinspection JSUnusedGlobalSymbols
export class ProjectApi {
    #project;
    constructor(project) { this.#project = project; }
    setBpm(value) {
        if (isNaN(value)) {
            return;
        }
        this.#project.timelineBoxAdapter.box.bpm.setValue(clamp(value, 30, 1000));
    }
    catchupAndSubscribeBpm(observer) {
        return this.#project.timelineBoxAdapter.box.bpm.catchupAndSubscribe(owner => observer(owner.getValue()));
    }
    catchupAndSubscribeAudioUnits(listener) {
        return this.#project.rootBoxAdapter.audioUnits.catchupAndSubscribe(listener);
    }
    createInstrument({ create, defaultIcon, defaultName, trackType }, options = {}) {
        const { name, icon, index } = options;
        const { boxGraph, rootBox, userEditingManager } = this.#project;
        assert(rootBox.isAttached(), "rootBox not attached");
        const existingNames = ProjectQueries.existingInstrumentNames(rootBox);
        const audioUnitBox = AudioUnitFactory.create(this.#project.skeleton, AudioUnitType.Instrument, this.#trackTypeToCapture(boxGraph, trackType), index);
        const uniqueName = Strings.getUniqueName(existingNames, name ?? defaultName);
        const iconSymbol = icon ?? defaultIcon;
        const instrumentBox = create(boxGraph, audioUnitBox.input, uniqueName, iconSymbol, options.attachment);
        const trackBox = TrackBox.create(boxGraph, UUID.generate(), box => {
            box.index.setValue(0);
            box.type.setValue(trackType);
            box.tracks.refer(audioUnitBox.tracks);
            box.target.refer(audioUnitBox);
        });
        userEditingManager.audioUnit.edit(audioUnitBox.editing);
        return { audioUnitBox, instrumentBox, trackBox };
    }
    createAnyInstrument(factory) {
        return this.createInstrument(factory);
    }
    insertEffect(field, factory, insertIndex = Number.MAX_SAFE_INTEGER) {
        return factory.create(this.#project, field, IndexedBox.insertOrder(field, insertIndex));
    }
    createNoteTrack(audioUnitBox, insertIndex = Number.MAX_SAFE_INTEGER) {
        return this.#createTrack({ field: audioUnitBox.tracks, trackType: TrackType.Notes, insertIndex });
    }
    createAudioTrack(audioUnitBox, insertIndex = Number.MAX_SAFE_INTEGER) {
        return this.#createTrack({ field: audioUnitBox.tracks, trackType: TrackType.Audio, insertIndex });
    }
    createAutomationTrack(audioUnitBox, target, insertIndex = Number.MAX_SAFE_INTEGER) {
        return this.#createTrack({ field: audioUnitBox.tracks, target, trackType: TrackType.Value, insertIndex });
    }
    createClip(trackBox, clipIndex, { name, hue } = {}) {
        const { boxGraph } = this.#project;
        const type = trackBox.type.getValue();
        switch (type) {
            case TrackType.Notes: {
                const events = NoteEventCollectionBox.create(boxGraph, UUID.generate());
                return Option.wrap(NoteClipBox.create(boxGraph, UUID.generate(), box => {
                    box.index.setValue(clipIndex);
                    box.label.setValue(name ?? "Notes");
                    box.hue.setValue(hue ?? ColorCodes.forTrackType(type));
                    box.mute.setValue(false);
                    box.duration.setValue(PPQN.Bar);
                    box.clips.refer(trackBox.clips);
                    box.events.refer(events.owners);
                }));
            }
            case TrackType.Value: {
                const events = ValueEventCollectionBox.create(boxGraph, UUID.generate());
                return Option.wrap(ValueClipBox.create(boxGraph, UUID.generate(), box => {
                    box.index.setValue(clipIndex);
                    box.label.setValue(name ?? "Automation");
                    box.hue.setValue(hue ?? ColorCodes.forTrackType(type));
                    box.mute.setValue(false);
                    box.duration.setValue(PPQN.Bar);
                    box.events.refer(events.owners);
                    box.clips.refer(trackBox.clips);
                }));
            }
        }
        return Option.None;
    }
    createNoteRegion({ trackBox, position, duration, loopOffset, loopDuration, eventOffset, eventCollection, mute, name, hue }) {
        if (trackBox.type.getValue() !== TrackType.Notes) {
            console.warn("You should not create a note-region in mismatched track");
        }
        const { boxGraph } = this.#project;
        const events = eventCollection ?? NoteEventCollectionBox.create(boxGraph, UUID.generate());
        return NoteRegionBox.create(boxGraph, UUID.generate(), box => {
            box.position.setValue(position);
            box.label.setValue(name ?? "Notes");
            box.hue.setValue(hue ?? ColorCodes.forTrackType(trackBox.type.getValue()));
            box.mute.setValue(mute ?? false);
            box.duration.setValue(duration);
            box.loopDuration.setValue(loopOffset ?? 0);
            box.loopDuration.setValue(loopDuration ?? duration);
            box.eventOffset.setValue(eventOffset ?? 0);
            box.events.refer(events.owners);
            box.regions.refer(trackBox.regions);
        });
    }
    createTrackRegion(trackBox, position, duration, { name, hue } = {}) {
        const { boxGraph } = this.#project;
        const type = trackBox.type.getValue();
        switch (type) {
            case TrackType.Notes: {
                const events = NoteEventCollectionBox.create(boxGraph, UUID.generate());
                return Option.wrap(NoteRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(Math.max(position, 0));
                    box.label.setValue(name ?? "Notes");
                    box.hue.setValue(hue ?? ColorCodes.forTrackType(type));
                    box.mute.setValue(false);
                    box.duration.setValue(duration);
                    box.loopDuration.setValue(this.#project.signatureDuration);
                    box.events.refer(events.owners);
                    box.regions.refer(trackBox.regions);
                }));
            }
            case TrackType.Value: {
                const events = ValueEventCollectionBox.create(boxGraph, UUID.generate());
                return Option.wrap(ValueRegionBox.create(boxGraph, UUID.generate(), box => {
                    box.position.setValue(Math.max(position, 0));
                    box.label.setValue(name ?? "Automation");
                    box.hue.setValue(hue ?? ColorCodes.forTrackType(type));
                    box.mute.setValue(false);
                    box.duration.setValue(duration);
                    box.loopDuration.setValue(PPQN.Bar);
                    box.events.refer(events.owners);
                    box.regions.refer(trackBox.regions);
                }));
            }
        }
        return Option.None;
    }
    createNoteEvent({ owner, position, duration, velocity, pitch, chance, cent }) {
        const { boxGraph } = this.#project;
        return NoteEventBox.create(boxGraph, UUID.generate(), box => {
            box.position.setValue(position);
            box.duration.setValue(duration);
            box.velocity.setValue(velocity ?? 1.0);
            box.pitch.setValue(pitch);
            box.chance.setValue(chance ?? 100.0);
            box.cent.setValue(cent ?? 0.0);
            box.events.refer(owner.events.targetVertex
                .unwrap("Owner has no event-collection").box
                .asBox(NoteEventCollectionBox).events);
        });
    }
    deleteAudioUnit(audioUnitBox) {
        const { rootBox } = this.#project;
        IndexedBox.removeOrder(rootBox.audioUnits, audioUnitBox.index.getValue());
        audioUnitBox.delete();
    }
    #createTrack({ field, target, trackType, insertIndex }) {
        const index = IndexedBox.insertOrder(field, insertIndex);
        return TrackBox.create(this.#project.boxGraph, UUID.generate(), box => {
            box.index.setValue(index);
            box.type.setValue(trackType);
            box.tracks.refer(field);
            box.target.refer(target ?? field.box);
        });
    }
    #trackTypeToCapture(boxGraph, trackType) {
        switch (trackType) {
            case TrackType.Audio:
                return Option.wrap(CaptureAudioBox.create(boxGraph, UUID.generate()));
            case TrackType.Notes:
                return Option.wrap(CaptureMidiBox.create(boxGraph, UUID.generate()));
            default:
                return Option.None;
        }
    }
}
