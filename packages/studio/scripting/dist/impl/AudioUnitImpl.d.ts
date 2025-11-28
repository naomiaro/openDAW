import { AnyDevice, AudioEffects, AudioTrack, AudioUnit, GroupAudioUnit, MIDIEffects, NoteTrack, OutputAudioUnit, ValueTrack } from "../Api";
import { NoteTrackImpl } from "./NoteTrackImpl";
import { ValueTrackImpl } from "./ValueTrackImpl";
import { bipolar, Nullable } from "@opendaw/lib-std";
import { AudioTrackImpl } from "./AudioTrackImpl";
export declare abstract class AudioUnitImpl implements AudioUnit {
    #private;
    output?: Nullable<OutputAudioUnit | GroupAudioUnit>;
    volume: number;
    panning: bipolar;
    mute: boolean;
    solo: boolean;
    protected constructor(props?: Partial<AudioUnit>);
    addMIDIEffect<T extends keyof MIDIEffects>(type: T, props?: Partial<MIDIEffects[T]>): MIDIEffects[T];
    addAudioEffect<T extends keyof AudioEffects>(type: T, props?: Partial<AudioEffects[T]>): AudioEffects[T];
    addNoteTrack(props?: Partial<NoteTrack>): NoteTrack;
    addAudioTrack(props?: Partial<AudioTrack>): AudioTrack;
    addValueTrack<DEVICE extends AnyDevice, PARAMETER extends keyof DEVICE>(device: DEVICE, parameter: PARAMETER, props?: Partial<ValueTrack>): ValueTrack;
    get audioEffects(): ReadonlyArray<AudioEffects[keyof AudioEffects]>;
    get midiEffects(): ReadonlyArray<MIDIEffects[keyof MIDIEffects]>;
    get noteTracks(): ReadonlyArray<NoteTrackImpl>;
    get audioTracks(): ReadonlyArray<AudioTrackImpl>;
    get valueTracks(): ReadonlyArray<ValueTrackImpl>;
}
//# sourceMappingURL=AudioUnitImpl.d.ts.map