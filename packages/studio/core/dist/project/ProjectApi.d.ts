import { float, int, Observer, Option, Subscription } from "@opendaw/lib-std";
import { ppqn } from "@opendaw/lib-dsp";
import { Field, PointerField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AudioUnitBox, NoteEventBox, NoteEventCollectionBox, NoteRegionBox, TrackBox, ValueRegionBox } from "@opendaw/studio-boxes";
import { AnyClipBox, AudioUnitBoxAdapter, EffectPointerType, IndexedAdapterCollectionListener, InstrumentBox, InstrumentFactory, InstrumentOptions, InstrumentProduct } from "@opendaw/studio-adapters";
import { Project } from "./Project";
import { EffectFactory } from "../EffectFactory";
import { EffectBox } from "../EffectBox";
export type ClipRegionOptions = {
    name?: string;
    hue?: number;
};
export type NoteEventParams = {
    owner: {
        events: PointerField<Pointers.NoteEventCollection>;
    };
    position: ppqn;
    duration: ppqn;
    pitch: int;
    cent?: number;
    velocity?: float;
    chance?: int;
};
export type NoteRegionParams = {
    trackBox: TrackBox;
    position: ppqn;
    duration: ppqn;
    loopOffset?: ppqn;
    loopDuration?: ppqn;
    eventOffset?: ppqn;
    eventCollection?: NoteEventCollectionBox;
    mute?: boolean;
    name?: string;
    hue?: number;
};
export declare class ProjectApi {
    #private;
    constructor(project: Project);
    setBpm(value: number): void;
    catchupAndSubscribeBpm(observer: Observer<number>): Subscription;
    catchupAndSubscribeAudioUnits(listener: IndexedAdapterCollectionListener<AudioUnitBoxAdapter>): Subscription;
    createInstrument<A, INST extends InstrumentBox>({ create, defaultIcon, defaultName, trackType }: InstrumentFactory<A, INST>, options?: InstrumentOptions<A>): InstrumentProduct<INST>;
    createAnyInstrument(factory: InstrumentFactory<any, any>): InstrumentProduct<InstrumentBox>;
    insertEffect(field: Field<EffectPointerType>, factory: EffectFactory, insertIndex?: int): EffectBox;
    createNoteTrack(audioUnitBox: AudioUnitBox, insertIndex?: int): TrackBox;
    createAudioTrack(audioUnitBox: AudioUnitBox, insertIndex?: int): TrackBox;
    createAutomationTrack(audioUnitBox: AudioUnitBox, target: Field<Pointers.Automation>, insertIndex?: int): TrackBox;
    createClip(trackBox: TrackBox, clipIndex: int, { name, hue }?: ClipRegionOptions): Option<AnyClipBox>;
    createNoteRegion({ trackBox, position, duration, loopOffset, loopDuration, eventOffset, eventCollection, mute, name, hue }: NoteRegionParams): NoteRegionBox;
    createTrackRegion(trackBox: TrackBox, position: ppqn, duration: ppqn, { name, hue }?: ClipRegionOptions): Option<NoteRegionBox> | Option<ValueRegionBox>;
    createNoteEvent({ owner, position, duration, velocity, pitch, chance, cent }: NoteEventParams): NoteEventBox;
    deleteAudioUnit(audioUnitBox: AudioUnitBox): void;
}
//# sourceMappingURL=ProjectApi.d.ts.map