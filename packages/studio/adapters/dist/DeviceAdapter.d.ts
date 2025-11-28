import { BooleanField, Box, Field, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { AssertType, Option } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { TrackType } from "./timeline/TrackType";
import { IndexedBoxAdapterCollection } from "./IndexedBoxAdapterCollection";
import { BoxAdapter } from "./BoxAdapter";
import { AudioUnitInputAdapter } from "./audio-unit/AudioUnitInputAdapter";
import { AudioUnitBoxAdapter } from "./audio-unit/AudioUnitBoxAdapter";
export type DeviceType = "midi-effect" | "bus" | "instrument" | "audio-effect";
export type DeviceAccepts = "midi" | "audio" | false;
export declare namespace DeviceAccepts {
    const toTrackType: (type: DeviceAccepts) => TrackType.Notes | TrackType.Audio;
}
export interface MidiEffectDeviceAdapter extends EffectDeviceBoxAdapter<Pointers.MidiEffectHost> {
    readonly type: "midi-effect";
    readonly accepts: "midi";
}
export interface AudioEffectDeviceAdapter extends EffectDeviceBoxAdapter<Pointers.AudioEffectHost> {
    readonly type: "audio-effect";
    readonly accepts: "audio";
}
export type EffectPointerType = Pointers.AudioEffectHost | Pointers.MidiEffectHost;
export interface EffectDeviceBoxAdapter<P extends EffectPointerType = EffectPointerType> extends DeviceBoxAdapter {
    readonly type: "audio-effect" | "midi-effect";
    readonly accepts: "audio" | "midi";
    get indexField(): Int32Field;
    get enabledField(): BooleanField;
    get host(): PointerField<P>;
}
export interface InstrumentDeviceBoxAdapter extends DeviceBoxAdapter {
    readonly type: "instrument";
    get iconField(): StringField;
    get defaultTrackType(): TrackType;
    get acceptsMidiEvents(): boolean;
}
export interface DeviceHost extends BoxAdapter {
    readonly class: "device-host";
    get midiEffects(): IndexedBoxAdapterCollection<MidiEffectDeviceAdapter, Pointers.MidiEffectHost>;
    get inputAdapter(): Option<AudioUnitInputAdapter>;
    get audioEffects(): IndexedBoxAdapterCollection<AudioEffectDeviceAdapter, Pointers.AudioEffectHost>;
    get inputField(): Field<Pointers.InstrumentHost | Pointers.AudioOutput>;
    get tracksField(): Field<Pointers.TrackCollection>;
    get minimizedField(): BooleanField;
    get isAudioUnit(): boolean;
    get label(): string;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
}
export interface DeviceBoxAdapter extends BoxAdapter {
    readonly type: DeviceType;
    get box(): Box;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get accepts(): DeviceAccepts;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
}
export declare namespace Devices {
    const isAny: AssertType<DeviceBoxAdapter>;
    const isEffect: AssertType<EffectDeviceBoxAdapter>;
    const isInstrument: AssertType<InstrumentDeviceBoxAdapter>;
    const isMidiEffect: AssertType<MidiEffectDeviceAdapter>;
    const isAudioEffect: AssertType<AudioEffectDeviceAdapter>;
    const isHost: AssertType<DeviceHost>;
    const deleteEffectDevices: (devices: ReadonlyArray<EffectDeviceBoxAdapter>) => void;
}
//# sourceMappingURL=DeviceAdapter.d.ts.map