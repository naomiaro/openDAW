var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Xml } from "@opendaw/lib-xml";
// noinspection JSUnusedGlobalSymbols
export var Unit;
(function (Unit) {
    Unit["LINEAR"] = "linear";
    Unit["NORMALIZED"] = "normalized";
    Unit["PERCENT"] = "percent";
    Unit["DECIBEL"] = "decibel";
    Unit["HERTZ"] = "hertz";
    Unit["SEMITONES"] = "semitones";
    Unit["SECONDS"] = "seconds";
    Unit["BEATS"] = "beats";
    Unit["BPM"] = "bpm";
})(Unit || (Unit = {}));
// noinspection JSUnusedGlobalSymbols
export var Interpolation;
(function (Interpolation) {
    Interpolation["HOLD"] = "hold";
    Interpolation["LINEAR"] = "linear";
})(Interpolation || (Interpolation = {}));
// noinspection JSUnusedGlobalSymbols
export var TimeUnit;
(function (TimeUnit) {
    TimeUnit["BEATS"] = "beats";
    TimeUnit["SECONDS"] = "seconds";
})(TimeUnit || (TimeUnit = {}));
// noinspection JSUnusedGlobalSymbols
export var SendType;
(function (SendType) {
    SendType["PRE"] = "pre";
    SendType["POST"] = "post";
})(SendType || (SendType = {}));
// noinspection JSUnusedGlobalSymbols
export var DeviceRole;
(function (DeviceRole) {
    DeviceRole["NOTE_FX"] = "noteFX";
    DeviceRole["INSTRUMENT"] = "instrument";
    DeviceRole["AUDIO_FX"] = "audioFX";
})(DeviceRole || (DeviceRole = {}));
// noinspection JSUnusedGlobalSymbols
export var ChannelRole;
(function (ChannelRole) {
    ChannelRole["REGULAR"] = "regular";
    ChannelRole["MASTER"] = "master";
    ChannelRole["EFFECT"] = "effect";
    ChannelRole["SUBMIX"] = "submix";
    ChannelRole["VCA"] = "vca";
})(ChannelRole || (ChannelRole = {}));
// noinspection JSUnusedGlobalSymbols
export var AudioAlgorithm;
(function (AudioAlgorithm) {
    AudioAlgorithm["REPITCH"] = "repitch";
    AudioAlgorithm["STRETCH"] = "stretch";
})(AudioAlgorithm || (AudioAlgorithm = {}));
let MetaDataSchema = class MetaDataSchema {
    title;
    artist;
    album;
    originalArtist;
    composer;
    songwriter;
    producer;
    arranger;
    year;
    genre;
    copyright;
    website;
    comment;
};
__decorate([
    Xml.Element("Title", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "title", void 0);
__decorate([
    Xml.Element("Artist", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "artist", void 0);
__decorate([
    Xml.Element("Album", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "album", void 0);
__decorate([
    Xml.Element("OriginalArtist", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "originalArtist", void 0);
__decorate([
    Xml.Element("Composer", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "composer", void 0);
__decorate([
    Xml.Element("Songwriter", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "songwriter", void 0);
__decorate([
    Xml.Element("Producer", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "producer", void 0);
__decorate([
    Xml.Element("Arranger", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "arranger", void 0);
__decorate([
    Xml.Element("Year", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "year", void 0);
__decorate([
    Xml.Element("Genre", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "genre", void 0);
__decorate([
    Xml.Element("Copyright", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "copyright", void 0);
__decorate([
    Xml.Element("Website", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "website", void 0);
__decorate([
    Xml.Element("Comment", String),
    __metadata("design:type", String)
], MetaDataSchema.prototype, "comment", void 0);
MetaDataSchema = __decorate([
    Xml.Class("MetaData")
], MetaDataSchema);
export { MetaDataSchema };
let ApplicationSchema = class ApplicationSchema {
    name;
    version;
};
__decorate([
    Xml.Attribute("name", Xml.StringRequired),
    __metadata("design:type", String)
], ApplicationSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("version", Xml.StringOptional),
    __metadata("design:type", String)
], ApplicationSchema.prototype, "version", void 0);
ApplicationSchema = __decorate([
    Xml.Class("Application")
], ApplicationSchema);
export { ApplicationSchema };
let BooleanParameterSchema = class BooleanParameterSchema {
    value;
    id;
    name;
};
__decorate([
    Xml.Attribute("value", Xml.BoolRequired),
    __metadata("design:type", Boolean)
], BooleanParameterSchema.prototype, "value", void 0);
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], BooleanParameterSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], BooleanParameterSchema.prototype, "name", void 0);
BooleanParameterSchema = __decorate([
    Xml.Class("BooleanParameter")
], BooleanParameterSchema);
export { BooleanParameterSchema };
let RealParameterSchema = class RealParameterSchema {
    id;
    name;
    value;
    unit;
    min;
    max;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], RealParameterSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], RealParameterSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("value", Xml.NumberRequired),
    __metadata("design:type", Number)
], RealParameterSchema.prototype, "value", void 0);
__decorate([
    Xml.Attribute("unit", Xml.StringRequired),
    __metadata("design:type", String)
], RealParameterSchema.prototype, "unit", void 0);
__decorate([
    Xml.Attribute("min", Xml.NumberOptional),
    __metadata("design:type", Number)
], RealParameterSchema.prototype, "min", void 0);
__decorate([
    Xml.Attribute("max", Xml.NumberOptional),
    __metadata("design:type", Number)
], RealParameterSchema.prototype, "max", void 0);
RealParameterSchema = __decorate([
    Xml.Class("RealParameter")
], RealParameterSchema);
export { RealParameterSchema };
let TimeSignatureParameterSchema = class TimeSignatureParameterSchema {
    numerator;
    denominator;
};
__decorate([
    Xml.Attribute("numerator", Xml.NumberOptional),
    __metadata("design:type", Number)
], TimeSignatureParameterSchema.prototype, "numerator", void 0);
__decorate([
    Xml.Attribute("denominator", Xml.NumberOptional),
    __metadata("design:type", Number)
], TimeSignatureParameterSchema.prototype, "denominator", void 0);
TimeSignatureParameterSchema = __decorate([
    Xml.Class("TimeSignature")
], TimeSignatureParameterSchema);
export { TimeSignatureParameterSchema };
let ParameterSchema = class ParameterSchema {
    id;
    name;
    value;
    unit;
    min;
    max;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], ParameterSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], ParameterSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("value", Xml.NumberOptional),
    __metadata("design:type", Number)
], ParameterSchema.prototype, "value", void 0);
__decorate([
    Xml.Attribute("unit"),
    __metadata("design:type", String)
], ParameterSchema.prototype, "unit", void 0);
__decorate([
    Xml.Attribute("min", Xml.NumberOptional),
    __metadata("design:type", Number)
], ParameterSchema.prototype, "min", void 0);
__decorate([
    Xml.Attribute("max", Xml.NumberOptional),
    __metadata("design:type", Number)
], ParameterSchema.prototype, "max", void 0);
ParameterSchema = __decorate([
    Xml.Class("Parameter")
], ParameterSchema);
export { ParameterSchema };
let StateSchema = class StateSchema {
    path;
};
__decorate([
    Xml.Attribute("path"),
    __metadata("design:type", String)
], StateSchema.prototype, "path", void 0);
StateSchema = __decorate([
    Xml.Class("State")
], StateSchema);
export { StateSchema };
let SendSchema = class SendSchema {
    id;
    destination;
    type;
    volume;
    pan;
    enable;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], SendSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("destination"),
    __metadata("design:type", String)
], SendSchema.prototype, "destination", void 0);
__decorate([
    Xml.Attribute("type"),
    __metadata("design:type", String)
], SendSchema.prototype, "type", void 0);
__decorate([
    Xml.Element("Volume", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], SendSchema.prototype, "volume", void 0);
__decorate([
    Xml.Element("Pan", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], SendSchema.prototype, "pan", void 0);
__decorate([
    Xml.Element("Enable", BooleanParameterSchema),
    __metadata("design:type", BooleanParameterSchema)
], SendSchema.prototype, "enable", void 0);
SendSchema = __decorate([
    Xml.Class("Send")
], SendSchema);
export { SendSchema };
let TransportSchema = class TransportSchema {
    tempo;
    timeSignature;
};
__decorate([
    Xml.Element("Tempo", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], TransportSchema.prototype, "tempo", void 0);
__decorate([
    Xml.Element("TimeSignature", TimeSignatureParameterSchema),
    __metadata("design:type", TimeSignatureParameterSchema)
], TransportSchema.prototype, "timeSignature", void 0);
TransportSchema = __decorate([
    Xml.Class("Transport")
], TransportSchema);
export { TransportSchema };
let LaneSchema = class LaneSchema {
    id;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], LaneSchema.prototype, "id", void 0);
LaneSchema = __decorate([
    Xml.Class("Lane")
], LaneSchema);
export { LaneSchema };
let TimelineSchema = class TimelineSchema {
    id;
    timeUnit;
    track;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], TimelineSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("timeUnit"),
    __metadata("design:type", String)
], TimelineSchema.prototype, "timeUnit", void 0);
__decorate([
    Xml.Attribute("track"),
    __metadata("design:type", String)
], TimelineSchema.prototype, "track", void 0);
TimelineSchema = __decorate([
    Xml.Class("Timeline")
], TimelineSchema);
export { TimelineSchema };
let NoteSchema = class NoteSchema {
    time;
    duration;
    channel;
    key;
    vel;
    rel;
};
__decorate([
    Xml.Attribute("time", Xml.NumberRequired),
    __metadata("design:type", Number)
], NoteSchema.prototype, "time", void 0);
__decorate([
    Xml.Attribute("duration", Xml.NumberRequired),
    __metadata("design:type", Number)
], NoteSchema.prototype, "duration", void 0);
__decorate([
    Xml.Attribute("channel", Xml.NumberRequired),
    __metadata("design:type", Number)
], NoteSchema.prototype, "channel", void 0);
__decorate([
    Xml.Attribute("key", Xml.NumberRequired),
    __metadata("design:type", Number)
], NoteSchema.prototype, "key", void 0);
__decorate([
    Xml.Attribute("vel", Xml.NumberOptional),
    __metadata("design:type", Number)
], NoteSchema.prototype, "vel", void 0);
__decorate([
    Xml.Attribute("rel", Xml.NumberOptional),
    __metadata("design:type", Number)
], NoteSchema.prototype, "rel", void 0);
NoteSchema = __decorate([
    Xml.Class("Note")
], NoteSchema);
export { NoteSchema };
let NotesSchema = class NotesSchema extends TimelineSchema {
    notes;
};
__decorate([
    Xml.ElementRef(NoteSchema, "Note"),
    __metadata("design:type", Array)
], NotesSchema.prototype, "notes", void 0);
NotesSchema = __decorate([
    Xml.Class("Notes")
], NotesSchema);
export { NotesSchema };
let ClipSchema = class ClipSchema {
    name;
    color;
    comment;
    time;
    duration;
    contentTimeUnit;
    playStart;
    playStop;
    loopStart;
    loopEnd;
    fadeTimeUnit;
    fadeInTime;
    fadeOutTime;
    enable;
    content;
    reference;
};
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], ClipSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("color"),
    __metadata("design:type", String)
], ClipSchema.prototype, "color", void 0);
__decorate([
    Xml.Attribute("comment"),
    __metadata("design:type", String)
], ClipSchema.prototype, "comment", void 0);
__decorate([
    Xml.Attribute("time", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "time", void 0);
__decorate([
    Xml.Attribute("duration", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "duration", void 0);
__decorate([
    Xml.Attribute("contentTimeUnit"),
    __metadata("design:type", String)
], ClipSchema.prototype, "contentTimeUnit", void 0);
__decorate([
    Xml.Attribute("playStart", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "playStart", void 0);
__decorate([
    Xml.Attribute("playStop", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "playStop", void 0);
__decorate([
    Xml.Attribute("loopStart", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "loopStart", void 0);
__decorate([
    Xml.Attribute("loopEnd", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "loopEnd", void 0);
__decorate([
    Xml.Attribute("fadeTimeUnit"),
    __metadata("design:type", String)
], ClipSchema.prototype, "fadeTimeUnit", void 0);
__decorate([
    Xml.Attribute("fadeInTime", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "fadeInTime", void 0);
__decorate([
    Xml.Attribute("fadeOutTime", Xml.NumberOptional),
    __metadata("design:type", Number)
], ClipSchema.prototype, "fadeOutTime", void 0);
__decorate([
    Xml.Attribute("enable", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], ClipSchema.prototype, "enable", void 0);
__decorate([
    Xml.ElementRef(TimelineSchema),
    __metadata("design:type", Array)
], ClipSchema.prototype, "content", void 0);
__decorate([
    Xml.Attribute("reference"),
    __metadata("design:type", String)
], ClipSchema.prototype, "reference", void 0);
ClipSchema = __decorate([
    Xml.Class("Clip")
], ClipSchema);
export { ClipSchema };
let ClipsSchema = class ClipsSchema extends TimelineSchema {
    clips;
};
__decorate([
    Xml.ElementRef(ClipSchema),
    __metadata("design:type", Array)
], ClipsSchema.prototype, "clips", void 0);
ClipsSchema = __decorate([
    Xml.Class("Clips")
], ClipsSchema);
export { ClipsSchema };
let ClipSlotSchema = class ClipSlotSchema extends TimelineSchema {
    clip;
    hasStop;
};
__decorate([
    Xml.Element("Clip", ClipSchema),
    __metadata("design:type", ClipSchema)
], ClipSlotSchema.prototype, "clip", void 0);
__decorate([
    Xml.Attribute("hasStop", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], ClipSlotSchema.prototype, "hasStop", void 0);
ClipSlotSchema = __decorate([
    Xml.Class("ClipSlot")
], ClipSlotSchema);
export { ClipSlotSchema };
let MarkerSchema = class MarkerSchema {
    id;
    name;
    color;
    comment;
    time;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], MarkerSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], MarkerSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("color"),
    __metadata("design:type", String)
], MarkerSchema.prototype, "color", void 0);
__decorate([
    Xml.Attribute("comment"),
    __metadata("design:type", String)
], MarkerSchema.prototype, "comment", void 0);
__decorate([
    Xml.Attribute("time", Xml.NumberRequired),
    __metadata("design:type", Number)
], MarkerSchema.prototype, "time", void 0);
MarkerSchema = __decorate([
    Xml.Class("Marker")
], MarkerSchema);
export { MarkerSchema };
let MarkersSchema = class MarkersSchema {
    marker;
};
__decorate([
    Xml.Element("Marker", Array),
    __metadata("design:type", Array)
], MarkersSchema.prototype, "marker", void 0);
MarkersSchema = __decorate([
    Xml.Class("Markers")
], MarkersSchema);
export { MarkersSchema };
let WarpSchema = class WarpSchema {
    time;
    contentTime;
};
__decorate([
    Xml.Attribute("time", Xml.NumberRequired),
    __metadata("design:type", Number)
], WarpSchema.prototype, "time", void 0);
__decorate([
    Xml.Attribute("contentTime", Xml.NumberRequired),
    __metadata("design:type", Number)
], WarpSchema.prototype, "contentTime", void 0);
WarpSchema = __decorate([
    Xml.Class("Warp")
], WarpSchema);
export { WarpSchema };
let FileReferenceSchema = class FileReferenceSchema {
    path;
    external;
};
__decorate([
    Xml.Attribute("path", Xml.StringRequired),
    __metadata("design:type", String)
], FileReferenceSchema.prototype, "path", void 0);
__decorate([
    Xml.Attribute("external", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], FileReferenceSchema.prototype, "external", void 0);
FileReferenceSchema = __decorate([
    Xml.Class("File")
], FileReferenceSchema);
export { FileReferenceSchema };
let MediaFileSchema = class MediaFileSchema extends TimelineSchema {
    file;
    duration;
};
__decorate([
    Xml.Element("File", FileReferenceSchema),
    __metadata("design:type", FileReferenceSchema)
], MediaFileSchema.prototype, "file", void 0);
__decorate([
    Xml.Attribute("duration", Xml.NumberRequired),
    __metadata("design:type", Number)
], MediaFileSchema.prototype, "duration", void 0);
MediaFileSchema = __decorate([
    Xml.Class("MediaFile")
], MediaFileSchema);
export { MediaFileSchema };
let AudioSchema = class AudioSchema extends MediaFileSchema {
    algorithm;
    channels;
    sampleRate;
};
__decorate([
    Xml.Attribute("algorithm"),
    __metadata("design:type", String)
], AudioSchema.prototype, "algorithm", void 0);
__decorate([
    Xml.Attribute("channels", Xml.NumberRequired),
    __metadata("design:type", Number)
], AudioSchema.prototype, "channels", void 0);
__decorate([
    Xml.Attribute("sampleRate", Xml.NumberRequired),
    __metadata("design:type", Number)
], AudioSchema.prototype, "sampleRate", void 0);
AudioSchema = __decorate([
    Xml.Class("Audio")
], AudioSchema);
export { AudioSchema };
let WarpsSchema = class WarpsSchema extends TimelineSchema {
    content;
    warps;
    contentTimeUnit;
};
__decorate([
    Xml.ElementRef(TimelineSchema),
    __metadata("design:type", Array)
], WarpsSchema.prototype, "content", void 0);
__decorate([
    Xml.ElementRef(WarpSchema),
    __metadata("design:type", Array)
], WarpsSchema.prototype, "warps", void 0);
__decorate([
    Xml.Attribute("contentTimeUnit"),
    __metadata("design:type", String)
], WarpsSchema.prototype, "contentTimeUnit", void 0);
WarpsSchema = __decorate([
    Xml.Class("Warps")
], WarpsSchema);
export { WarpsSchema };
let VideoSchema = class VideoSchema extends MediaFileSchema {
    algorithm;
    channels;
    sampleRate;
};
__decorate([
    Xml.Attribute("algorithm"),
    __metadata("design:type", String)
], VideoSchema.prototype, "algorithm", void 0);
__decorate([
    Xml.Attribute("channels", Xml.NumberRequired),
    __metadata("design:type", Number)
], VideoSchema.prototype, "channels", void 0);
__decorate([
    Xml.Attribute("sampleRate", Xml.NumberRequired),
    __metadata("design:type", Number)
], VideoSchema.prototype, "sampleRate", void 0);
VideoSchema = __decorate([
    Xml.Class("Video")
], VideoSchema);
export { VideoSchema };
let AutomationTargetSchema = class AutomationTargetSchema {
    parameter;
    expression;
    channel;
    key;
    controller;
};
__decorate([
    Xml.Attribute("parameter"),
    __metadata("design:type", String)
], AutomationTargetSchema.prototype, "parameter", void 0);
__decorate([
    Xml.Attribute("expression"),
    __metadata("design:type", String)
], AutomationTargetSchema.prototype, "expression", void 0);
__decorate([
    Xml.Attribute("channel", Xml.NumberOptional),
    __metadata("design:type", Number)
], AutomationTargetSchema.prototype, "channel", void 0);
__decorate([
    Xml.Attribute("key", Xml.NumberOptional),
    __metadata("design:type", Number)
], AutomationTargetSchema.prototype, "key", void 0);
__decorate([
    Xml.Attribute("controller", Xml.NumberOptional),
    __metadata("design:type", Number)
], AutomationTargetSchema.prototype, "controller", void 0);
AutomationTargetSchema = __decorate([
    Xml.Class("Target")
], AutomationTargetSchema);
export { AutomationTargetSchema };
let PointSchema = class PointSchema {
    time;
};
__decorate([
    Xml.Attribute("time"),
    __metadata("design:type", Number)
], PointSchema.prototype, "time", void 0);
PointSchema = __decorate([
    Xml.Class("Point")
], PointSchema);
export { PointSchema };
let BoolPoint = class BoolPoint extends PointSchema {
    value;
};
__decorate([
    Xml.Attribute("value", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], BoolPoint.prototype, "value", void 0);
BoolPoint = __decorate([
    Xml.Class("BoolPoint")
], BoolPoint);
export { BoolPoint };
let RealPointSchema = class RealPointSchema extends PointSchema {
    value;
    interpolation;
};
__decorate([
    Xml.Attribute("value", Xml.NumberRequired),
    __metadata("design:type", Number)
], RealPointSchema.prototype, "value", void 0);
__decorate([
    Xml.Attribute("interpolation"),
    __metadata("design:type", String)
], RealPointSchema.prototype, "interpolation", void 0);
RealPointSchema = __decorate([
    Xml.Class("RealPoint")
], RealPointSchema);
export { RealPointSchema };
let IntegerPointSchema = class IntegerPointSchema extends PointSchema {
    value;
};
__decorate([
    Xml.Attribute("value", Xml.NumberRequired),
    __metadata("design:type", Number)
], IntegerPointSchema.prototype, "value", void 0);
IntegerPointSchema = __decorate([
    Xml.Class("IntegerPoint")
], IntegerPointSchema);
export { IntegerPointSchema };
let TimeSignaturePointSchema = class TimeSignaturePointSchema extends PointSchema {
    numerator;
    denominator;
};
__decorate([
    Xml.Attribute("numerator", Xml.NumberRequired),
    __metadata("design:type", Number)
], TimeSignaturePointSchema.prototype, "numerator", void 0);
__decorate([
    Xml.Attribute("denominator", Xml.NumberRequired),
    __metadata("design:type", Number)
], TimeSignaturePointSchema.prototype, "denominator", void 0);
TimeSignaturePointSchema = __decorate([
    Xml.Class("TimeSignaturePoint")
], TimeSignaturePointSchema);
export { TimeSignaturePointSchema };
let PointsSchema = class PointsSchema extends TimelineSchema {
    target;
    points;
    unit;
};
__decorate([
    Xml.Element("Target", AutomationTargetSchema),
    __metadata("design:type", AutomationTargetSchema)
], PointsSchema.prototype, "target", void 0);
__decorate([
    Xml.ElementRef(PointSchema),
    __metadata("design:type", Array)
], PointsSchema.prototype, "points", void 0);
__decorate([
    Xml.Attribute("unit"),
    __metadata("design:type", String)
], PointsSchema.prototype, "unit", void 0);
PointsSchema = __decorate([
    Xml.Class("Points")
], PointsSchema);
export { PointsSchema };
let LanesSchema = class LanesSchema extends TimelineSchema {
    lanes;
};
__decorate([
    Xml.ElementRef(TimelineSchema),
    __metadata("design:type", Array)
], LanesSchema.prototype, "lanes", void 0);
LanesSchema = __decorate([
    Xml.Class("Lanes")
], LanesSchema);
export { LanesSchema };
let ArrangementSchema = class ArrangementSchema {
    id;
    timeSignatureAutomation;
    tempoAutomation;
    markers;
    lanes;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], ArrangementSchema.prototype, "id", void 0);
__decorate([
    Xml.Element("TimeSignatureAutomation", PointsSchema),
    __metadata("design:type", PointsSchema)
], ArrangementSchema.prototype, "timeSignatureAutomation", void 0);
__decorate([
    Xml.Element("TempoAutomation", PointsSchema),
    __metadata("design:type", PointsSchema)
], ArrangementSchema.prototype, "tempoAutomation", void 0);
__decorate([
    Xml.Element("Markers", MarkersSchema),
    __metadata("design:type", MarkerSchema)
], ArrangementSchema.prototype, "markers", void 0);
__decorate([
    Xml.Element("Lanes", LanesSchema),
    __metadata("design:type", LanesSchema)
], ArrangementSchema.prototype, "lanes", void 0);
ArrangementSchema = __decorate([
    Xml.Class("Arrangement")
], ArrangementSchema);
export { ArrangementSchema };
let SceneSchema = class SceneSchema {
    id;
    content;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], SceneSchema.prototype, "id", void 0);
__decorate([
    Xml.ElementRef(TimelineSchema),
    __metadata("design:type", Array)
], SceneSchema.prototype, "content", void 0);
SceneSchema = __decorate([
    Xml.Class("Scene")
], SceneSchema);
export { SceneSchema };
let DeviceSchema = class DeviceSchema {
    id;
    enabled;
    deviceRole;
    loaded;
    deviceName;
    deviceID;
    deviceVendor;
    state;
    name;
    automatedParameters;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], DeviceSchema.prototype, "id", void 0);
__decorate([
    Xml.Element("Enabled", BooleanParameterSchema),
    __metadata("design:type", BooleanParameterSchema)
], DeviceSchema.prototype, "enabled", void 0);
__decorate([
    Xml.Attribute("deviceRole", Xml.StringRequired),
    __metadata("design:type", String)
], DeviceSchema.prototype, "deviceRole", void 0);
__decorate([
    Xml.Attribute("loaded", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], DeviceSchema.prototype, "loaded", void 0);
__decorate([
    Xml.Attribute("deviceName"),
    __metadata("design:type", String)
], DeviceSchema.prototype, "deviceName", void 0);
__decorate([
    Xml.Attribute("deviceID"),
    __metadata("design:type", String)
], DeviceSchema.prototype, "deviceID", void 0);
__decorate([
    Xml.Attribute("deviceVendor"),
    __metadata("design:type", String)
], DeviceSchema.prototype, "deviceVendor", void 0);
__decorate([
    Xml.Element("State", FileReferenceSchema),
    __metadata("design:type", FileReferenceSchema)
], DeviceSchema.prototype, "state", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], DeviceSchema.prototype, "name", void 0);
__decorate([
    Xml.ElementRef(ParameterSchema, "Parameters"),
    __metadata("design:type", Array)
], DeviceSchema.prototype, "automatedParameters", void 0);
DeviceSchema = __decorate([
    Xml.Class("Device")
], DeviceSchema);
export { DeviceSchema };
let BuiltinDeviceSchema = class BuiltinDeviceSchema extends DeviceSchema {
};
BuiltinDeviceSchema = __decorate([
    Xml.Class("BuiltinDevice")
], BuiltinDeviceSchema);
export { BuiltinDeviceSchema };
// noinspection JSUnusedGlobalSymbols
export var EqBandType;
(function (EqBandType) {
    EqBandType["HIGH_PASS"] = "highPass";
    EqBandType["LOW_PASS"] = "lowPass";
    EqBandType["BAND_PASS"] = "bandPass";
    EqBandType["HIGH_SHELF"] = "highShelf";
    EqBandType["LOW_SHELF"] = "lowShelf";
    EqBandType["BELL"] = "bell";
    EqBandType["NOTCH"] = "notch";
})(EqBandType || (EqBandType = {}));
let BandSchema = class BandSchema {
    type;
    order;
    freq;
    gain;
    Q;
    enabled;
};
__decorate([
    Xml.Attribute("type", Xml.StringRequired),
    __metadata("design:type", String)
], BandSchema.prototype, "type", void 0);
__decorate([
    Xml.Attribute("order", Xml.NumberOptional),
    __metadata("design:type", Number)
], BandSchema.prototype, "order", void 0);
__decorate([
    Xml.Element("Freq", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], BandSchema.prototype, "freq", void 0);
__decorate([
    Xml.Element("Gain", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], BandSchema.prototype, "gain", void 0);
__decorate([
    Xml.Element("Q", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], BandSchema.prototype, "Q", void 0);
__decorate([
    Xml.Element("Enabled", BooleanParameterSchema),
    __metadata("design:type", BooleanParameterSchema)
], BandSchema.prototype, "enabled", void 0);
BandSchema = __decorate([
    Xml.Class("Band")
], BandSchema);
export { BandSchema };
let EqualizerSchema = class EqualizerSchema extends BuiltinDeviceSchema {
    bands;
};
__decorate([
    Xml.ElementRef(BandSchema),
    __metadata("design:type", Array)
], EqualizerSchema.prototype, "bands", void 0);
EqualizerSchema = __decorate([
    Xml.Class("Equalizer")
], EqualizerSchema);
export { EqualizerSchema };
let PluginSchema = class PluginSchema extends DeviceSchema {
    pluginVersion;
};
__decorate([
    Xml.Attribute("pluginVersion"),
    __metadata("design:type", String)
], PluginSchema.prototype, "pluginVersion", void 0);
PluginSchema = __decorate([
    Xml.Class("Plugin")
], PluginSchema);
export { PluginSchema };
let ChannelSchema = class ChannelSchema {
    id;
    role;
    audioChannels;
    destination;
    solo;
    devices;
    volume;
    pan;
    mute;
    sends;
};
__decorate([
    Xml.Attribute("id"),
    __metadata("design:type", String)
], ChannelSchema.prototype, "id", void 0);
__decorate([
    Xml.Attribute("role"),
    __metadata("design:type", String)
], ChannelSchema.prototype, "role", void 0);
__decorate([
    Xml.Attribute("audioChannels", Xml.NumberOptional),
    __metadata("design:type", Number)
], ChannelSchema.prototype, "audioChannels", void 0);
__decorate([
    Xml.Attribute("destination"),
    __metadata("design:type", String)
], ChannelSchema.prototype, "destination", void 0);
__decorate([
    Xml.Attribute("solo", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], ChannelSchema.prototype, "solo", void 0);
__decorate([
    Xml.ElementRef(DeviceSchema, "Devices"),
    __metadata("design:type", Array)
], ChannelSchema.prototype, "devices", void 0);
__decorate([
    Xml.Element("Volume", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], ChannelSchema.prototype, "volume", void 0);
__decorate([
    Xml.Element("Pan", RealParameterSchema),
    __metadata("design:type", RealParameterSchema)
], ChannelSchema.prototype, "pan", void 0);
__decorate([
    Xml.Element("Mute", BooleanParameterSchema),
    __metadata("design:type", BooleanParameterSchema)
], ChannelSchema.prototype, "mute", void 0);
__decorate([
    Xml.ElementRef(SendSchema, "Sends"),
    __metadata("design:type", Array)
], ChannelSchema.prototype, "sends", void 0);
ChannelSchema = __decorate([
    Xml.Class("Channel")
], ChannelSchema);
export { ChannelSchema };
let TrackSchema = class TrackSchema extends LaneSchema {
    contentType;
    name;
    color;
    loaded;
    channel;
    tracks;
};
__decorate([
    Xml.Attribute("contentType"),
    __metadata("design:type", String)
], TrackSchema.prototype, "contentType", void 0);
__decorate([
    Xml.Attribute("name"),
    __metadata("design:type", String)
], TrackSchema.prototype, "name", void 0);
__decorate([
    Xml.Attribute("color"),
    __metadata("design:type", String)
], TrackSchema.prototype, "color", void 0);
__decorate([
    Xml.Attribute("loaded", Xml.BoolOptional),
    __metadata("design:type", Boolean)
], TrackSchema.prototype, "loaded", void 0);
__decorate([
    Xml.Element("Channel", ChannelSchema),
    __metadata("design:type", ChannelSchema)
], TrackSchema.prototype, "channel", void 0);
__decorate([
    Xml.ElementRef(TrackSchema),
    __metadata("design:type", Array)
], TrackSchema.prototype, "tracks", void 0);
TrackSchema = __decorate([
    Xml.Class("Track")
], TrackSchema);
export { TrackSchema };
let ClapPluginSchema = class ClapPluginSchema extends PluginSchema {
};
ClapPluginSchema = __decorate([
    Xml.Class("ClapPlugin")
], ClapPluginSchema);
export { ClapPluginSchema };
let ProjectSchema = class ProjectSchema {
    version;
    application;
    transport;
    structure;
    arrangement;
    scenes;
};
__decorate([
    Xml.Attribute("version", Xml.StringRequired),
    __metadata("design:type", String)
], ProjectSchema.prototype, "version", void 0);
__decorate([
    Xml.Element("Application", ApplicationSchema),
    __metadata("design:type", ApplicationSchema)
], ProjectSchema.prototype, "application", void 0);
__decorate([
    Xml.Element("Transport", TransportSchema),
    __metadata("design:type", TransportSchema)
], ProjectSchema.prototype, "transport", void 0);
__decorate([
    Xml.ElementRef(LaneSchema, "Structure"),
    __metadata("design:type", Array)
], ProjectSchema.prototype, "structure", void 0);
__decorate([
    Xml.Element("Arrangement", ArrangementSchema),
    __metadata("design:type", ArrangementSchema)
], ProjectSchema.prototype, "arrangement", void 0);
__decorate([
    Xml.ElementRef(SceneSchema, "Scenes"),
    __metadata("design:type", Array)
], ProjectSchema.prototype, "scenes", void 0);
ProjectSchema = __decorate([
    Xml.Class("Project")
], ProjectSchema);
export { ProjectSchema };
