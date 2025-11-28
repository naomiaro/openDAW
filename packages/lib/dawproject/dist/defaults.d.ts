import type { int } from "@opendaw/lib-std";
export interface Nameable {
    name?: string;
    color?: string;
    comment?: string;
}
export interface Referenceable extends Nameable {
    id?: string;
}
export declare enum Unit {
    LINEAR = "linear",
    NORMALIZED = "normalized",
    PERCENT = "percent",
    DECIBEL = "decibel",
    HERTZ = "hertz",
    SEMITONES = "semitones",
    SECONDS = "seconds",
    BEATS = "beats",
    BPM = "bpm"
}
export declare enum Interpolation {
    HOLD = "hold",
    LINEAR = "linear"
}
export declare enum TimeUnit {
    BEATS = "beats",
    SECONDS = "seconds"
}
export declare enum SendType {
    PRE = "pre",
    POST = "post"
}
export declare enum DeviceRole {
    NOTE_FX = "noteFX",
    INSTRUMENT = "instrument",
    AUDIO_FX = "audioFX"
}
export declare enum ChannelRole {
    REGULAR = "regular",
    MASTER = "master",
    EFFECT = "effect",
    SUBMIX = "submix",
    VCA = "vca"
}
export declare enum AudioAlgorithm {
    REPITCH = "repitch",
    STRETCH = "stretch"
}
export declare class MetaDataSchema {
    readonly title?: string;
    readonly artist?: string;
    readonly album?: string;
    readonly originalArtist?: string;
    readonly composer?: string;
    readonly songwriter?: string;
    readonly producer?: string;
    readonly arranger?: string;
    readonly year?: string;
    readonly genre?: string;
    readonly copyright?: string;
    readonly website?: string;
    readonly comment?: string;
}
export declare class ApplicationSchema {
    readonly name: string;
    readonly version?: string;
}
export declare class BooleanParameterSchema implements Referenceable {
    readonly value?: boolean;
    readonly id?: string;
    readonly name?: string;
}
export declare class RealParameterSchema implements Referenceable {
    readonly id: string;
    readonly name?: string;
    readonly value: number;
    readonly unit: Unit;
    readonly min?: number;
    readonly max?: number;
}
export declare class TimeSignatureParameterSchema {
    readonly numerator?: number;
    readonly denominator?: number;
}
export declare class ParameterSchema implements Referenceable {
    readonly id?: string;
    readonly name?: string;
    readonly value?: number;
    readonly unit?: Unit;
    readonly min?: number;
    readonly max?: number;
}
export declare class StateSchema {
    readonly path?: string;
}
export declare class SendSchema {
    readonly id?: string;
    readonly destination?: string;
    readonly type?: string;
    readonly volume: RealParameterSchema;
    readonly pan?: RealParameterSchema;
    readonly enable?: BooleanParameterSchema;
}
export declare class TransportSchema {
    readonly tempo?: RealParameterSchema;
    readonly timeSignature?: TimeSignatureParameterSchema;
}
export declare class LaneSchema implements Referenceable {
    readonly id?: string;
}
export declare class TimelineSchema implements Referenceable {
    readonly id?: string;
    readonly timeUnit?: string;
    readonly track?: string;
}
export declare class NoteSchema {
    readonly time: number;
    readonly duration: number;
    readonly channel: int;
    readonly key: int;
    readonly vel?: number;
    readonly rel?: number;
}
export declare class NotesSchema extends TimelineSchema {
    readonly notes: ReadonlyArray<NoteSchema>;
}
export declare class ClipSchema implements Nameable {
    readonly name?: string;
    readonly color?: string;
    readonly comment?: string;
    readonly time?: number;
    readonly duration?: number;
    readonly contentTimeUnit?: string;
    readonly playStart?: number;
    readonly playStop?: number;
    readonly loopStart?: number;
    readonly loopEnd?: number;
    readonly fadeTimeUnit?: string;
    readonly fadeInTime?: number;
    readonly fadeOutTime?: number;
    readonly enable?: boolean;
    readonly content?: ReadonlyArray<TimelineSchema>;
    readonly reference?: string;
}
export declare class ClipsSchema extends TimelineSchema {
    readonly clips: ReadonlyArray<ClipSchema>;
}
export declare class ClipSlotSchema extends TimelineSchema {
    readonly clip?: ClipSchema;
    readonly hasStop?: boolean;
}
export declare class MarkerSchema implements Referenceable {
    readonly id?: string;
    readonly name?: string;
    readonly color?: string;
    readonly comment?: string;
    readonly time: number;
}
export declare class MarkersSchema {
    readonly marker: ReadonlyArray<MarkerSchema>;
}
export declare class WarpSchema {
    readonly time: number;
    readonly contentTime: number;
}
export declare class FileReferenceSchema {
    readonly path: string;
    readonly external?: boolean;
}
export declare class MediaFileSchema extends TimelineSchema {
    readonly file: FileReferenceSchema;
    readonly duration: number;
}
export declare class AudioSchema extends MediaFileSchema {
    readonly algorithm?: string;
    readonly channels: int;
    readonly sampleRate: int;
}
export declare class WarpsSchema extends TimelineSchema {
    readonly content?: ReadonlyArray<TimelineSchema>;
    readonly warps: ReadonlyArray<WarpSchema>;
    readonly contentTimeUnit: string;
}
export declare class VideoSchema extends MediaFileSchema {
    readonly algorithm?: string;
    readonly channels: int;
    readonly sampleRate: int;
}
export declare class AutomationTargetSchema {
    readonly parameter?: string;
    readonly expression?: string;
    readonly channel?: int;
    readonly key?: int;
    readonly controller?: int;
}
export declare class PointSchema {
    readonly time: number;
}
export declare class BoolPoint extends PointSchema {
    readonly value: boolean;
}
export declare class RealPointSchema extends PointSchema {
    readonly value: number;
    readonly interpolation?: Interpolation;
}
export declare class IntegerPointSchema extends PointSchema {
    readonly value: int;
}
export declare class TimeSignaturePointSchema extends PointSchema {
    readonly numerator: int;
    readonly denominator: int;
}
export declare class PointsSchema extends TimelineSchema {
    readonly target?: AutomationTargetSchema;
    readonly points?: ReadonlyArray<PointSchema>;
    readonly unit?: Unit;
}
export declare class LanesSchema extends TimelineSchema {
    readonly lanes?: ReadonlyArray<TimelineSchema>;
}
export declare class ArrangementSchema implements Referenceable {
    readonly id?: string;
    readonly timeSignatureAutomation?: PointsSchema;
    readonly tempoAutomation?: PointsSchema;
    readonly markers?: MarkerSchema;
    readonly lanes?: LanesSchema;
}
export declare class SceneSchema implements Referenceable {
    readonly id?: string;
    readonly content?: ReadonlyArray<TimelineSchema>;
}
export declare class DeviceSchema implements Referenceable {
    readonly id?: string;
    readonly enabled?: BooleanParameterSchema;
    readonly deviceRole: string;
    readonly loaded?: boolean;
    readonly deviceName?: string;
    readonly deviceID?: string;
    readonly deviceVendor?: string;
    readonly state?: FileReferenceSchema;
    readonly name?: string;
    readonly automatedParameters?: ReadonlyArray<ParameterSchema>;
}
export declare class BuiltinDeviceSchema extends DeviceSchema {
}
export declare enum EqBandType {
    HIGH_PASS = "highPass",
    LOW_PASS = "lowPass",
    BAND_PASS = "bandPass",
    HIGH_SHELF = "highShelf",
    LOW_SHELF = "lowShelf",
    BELL = "bell",
    NOTCH = "notch"
}
export declare class BandSchema {
    readonly type: EqBandType;
    readonly order?: int;
    readonly freq: RealParameterSchema;
    readonly gain?: RealParameterSchema;
    readonly Q?: RealParameterSchema;
    readonly enabled?: BooleanParameterSchema;
}
export declare class EqualizerSchema extends BuiltinDeviceSchema {
    readonly bands: ReadonlyArray<BandSchema>;
}
export declare class PluginSchema extends DeviceSchema {
    readonly pluginVersion?: string;
}
export declare class ChannelSchema implements Referenceable {
    readonly id?: string;
    readonly role?: ChannelRole;
    readonly audioChannels?: int;
    readonly destination?: string;
    readonly solo?: boolean;
    readonly devices?: ReadonlyArray<DeviceSchema>;
    readonly volume?: RealParameterSchema;
    readonly pan?: RealParameterSchema;
    readonly mute?: BooleanParameterSchema;
    readonly sends?: SendSchema[];
}
export declare class TrackSchema extends LaneSchema {
    readonly contentType?: string;
    readonly name?: string;
    readonly color?: string;
    readonly loaded?: boolean;
    readonly channel?: ChannelSchema;
    readonly tracks?: ReadonlyArray<TrackSchema>;
}
export declare class ClapPluginSchema extends PluginSchema {
}
export declare class ProjectSchema {
    readonly version: "1.0";
    readonly application: ApplicationSchema;
    readonly transport?: TransportSchema;
    readonly structure: ReadonlyArray<LaneSchema>;
    readonly arrangement?: ArrangementSchema;
    readonly scenes?: ReadonlyArray<SceneSchema>;
}
//# sourceMappingURL=defaults.d.ts.map