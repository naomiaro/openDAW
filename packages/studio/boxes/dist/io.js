import { RootBox, SelectionBox, UserInterfaceBox, UploadFileBox, TimelineBox, TrackBox, NoteEventBox, NoteEventRepeatBox, NoteEventCollectionBox, NoteRegionBox, NoteClipBox, ValueEventBox, ValueEventCollectionBox, ValueEventCurveBox, ValueRegionBox, ValueClipBox, AudioRegionBox, AudioClipBox, MarkerBox, AudioFileBox, SoundfontFileBox, AudioUnitBox, CaptureAudioBox, CaptureMidiBox, AudioBusBox, AuxSendBox, GrooveShuffleBox, UnknownAudioEffectDeviceBox, UnknownMidiEffectDeviceBox, DeviceInterfaceKnobBox, ModularDeviceBox, StereoToolDeviceBox, CompressorDeviceBox, DelayDeviceBox, CrusherDeviceBox, DattorroReverbDeviceBox, VelocityDeviceBox, FoldDeviceBox, TidalDeviceBox, RevampDeviceBox, ReverbDeviceBox, VaporisateurDeviceBox, MIDIOutputDeviceBox, MIDIOutputBox, MIDIOutputParameterBox, SoundfontDeviceBox, NanoDeviceBox, PlayfieldDeviceBox, PlayfieldSampleBox, TapeDeviceBox, ArpeggioDeviceBox, PitchDeviceBox, ZeitgeistDeviceBox, ModularBox, ModuleConnectionBox, ModularAudioInputBox, ModularAudioOutputBox, ModuleDelayBox, ModuleMultiplierBox, ModuleGainBox, } from ".";
import { ByteArrayInput, panic, UUID } from "@opendaw/lib-std";
//
//   ___          ___
//  | _ ) _____ _| __|__ _ _ __ _ ___
//  | _ \/ _ \ \ / _/ _ \ '_/ _` / -_)
//  |___/\___/_\_\_|\___/_| \__, \___|
//                         |___/
//
//  auto-generated | do not edit | blame andre.michelle@opendaw.org
//
export var BoxIO;
(function (BoxIO) {
    BoxIO.create = (name, graph, uuid, constructor) => {
        switch (name) {
            case "RootBox":
                return RootBox.create(graph, uuid, constructor);
            case "SelectionBox":
                return SelectionBox.create(graph, uuid, constructor);
            case "UserInterfaceBox":
                return UserInterfaceBox.create(graph, uuid, constructor);
            case "UploadFileBox":
                return UploadFileBox.create(graph, uuid, constructor);
            case "TimelineBox":
                return TimelineBox.create(graph, uuid, constructor);
            case "TrackBox":
                return TrackBox.create(graph, uuid, constructor);
            case "NoteEventBox":
                return NoteEventBox.create(graph, uuid, constructor);
            case "NoteEventRepeatBox":
                return NoteEventRepeatBox.create(graph, uuid, constructor);
            case "NoteEventCollectionBox":
                return NoteEventCollectionBox.create(graph, uuid, constructor);
            case "NoteRegionBox":
                return NoteRegionBox.create(graph, uuid, constructor);
            case "NoteClipBox":
                return NoteClipBox.create(graph, uuid, constructor);
            case "ValueEventBox":
                return ValueEventBox.create(graph, uuid, constructor);
            case "ValueEventCollectionBox":
                return ValueEventCollectionBox.create(graph, uuid, constructor);
            case "ValueEventCurveBox":
                return ValueEventCurveBox.create(graph, uuid, constructor);
            case "ValueRegionBox":
                return ValueRegionBox.create(graph, uuid, constructor);
            case "ValueClipBox":
                return ValueClipBox.create(graph, uuid, constructor);
            case "AudioRegionBox":
                return AudioRegionBox.create(graph, uuid, constructor);
            case "AudioClipBox":
                return AudioClipBox.create(graph, uuid, constructor);
            case "MarkerBox":
                return MarkerBox.create(graph, uuid, constructor);
            case "AudioFileBox":
                return AudioFileBox.create(graph, uuid, constructor);
            case "SoundfontFileBox":
                return SoundfontFileBox.create(graph, uuid, constructor);
            case "AudioUnitBox":
                return AudioUnitBox.create(graph, uuid, constructor);
            case "CaptureAudioBox":
                return CaptureAudioBox.create(graph, uuid, constructor);
            case "CaptureMidiBox":
                return CaptureMidiBox.create(graph, uuid, constructor);
            case "AudioBusBox":
                return AudioBusBox.create(graph, uuid, constructor);
            case "AuxSendBox":
                return AuxSendBox.create(graph, uuid, constructor);
            case "GrooveShuffleBox":
                return GrooveShuffleBox.create(graph, uuid, constructor);
            case "UnknownAudioEffectDeviceBox":
                return UnknownAudioEffectDeviceBox.create(graph, uuid, constructor);
            case "UnknownMidiEffectDeviceBox":
                return UnknownMidiEffectDeviceBox.create(graph, uuid, constructor);
            case "DeviceInterfaceKnobBox":
                return DeviceInterfaceKnobBox.create(graph, uuid, constructor);
            case "ModularDeviceBox":
                return ModularDeviceBox.create(graph, uuid, constructor);
            case "StereoToolDeviceBox":
                return StereoToolDeviceBox.create(graph, uuid, constructor);
            case "CompressorDeviceBox":
                return CompressorDeviceBox.create(graph, uuid, constructor);
            case "DelayDeviceBox":
                return DelayDeviceBox.create(graph, uuid, constructor);
            case "CrusherDeviceBox":
                return CrusherDeviceBox.create(graph, uuid, constructor);
            case "DattorroReverbDeviceBox":
                return DattorroReverbDeviceBox.create(graph, uuid, constructor);
            case "VelocityDeviceBox":
                return VelocityDeviceBox.create(graph, uuid, constructor);
            case "FoldDeviceBox":
                return FoldDeviceBox.create(graph, uuid, constructor);
            case "TidalDeviceBox":
                return TidalDeviceBox.create(graph, uuid, constructor);
            case "RevampDeviceBox":
                return RevampDeviceBox.create(graph, uuid, constructor);
            case "ReverbDeviceBox":
                return ReverbDeviceBox.create(graph, uuid, constructor);
            case "VaporisateurDeviceBox":
                return VaporisateurDeviceBox.create(graph, uuid, constructor);
            case "MIDIOutputDeviceBox":
                return MIDIOutputDeviceBox.create(graph, uuid, constructor);
            case "MIDIOutputBox":
                return MIDIOutputBox.create(graph, uuid, constructor);
            case "MIDIOutputParameterBox":
                return MIDIOutputParameterBox.create(graph, uuid, constructor);
            case "SoundfontDeviceBox":
                return SoundfontDeviceBox.create(graph, uuid, constructor);
            case "NanoDeviceBox":
                return NanoDeviceBox.create(graph, uuid, constructor);
            case "PlayfieldDeviceBox":
                return PlayfieldDeviceBox.create(graph, uuid, constructor);
            case "PlayfieldSampleBox":
                return PlayfieldSampleBox.create(graph, uuid, constructor);
            case "TapeDeviceBox":
                return TapeDeviceBox.create(graph, uuid, constructor);
            case "ArpeggioDeviceBox":
                return ArpeggioDeviceBox.create(graph, uuid, constructor);
            case "PitchDeviceBox":
                return PitchDeviceBox.create(graph, uuid, constructor);
            case "ZeitgeistDeviceBox":
                return ZeitgeistDeviceBox.create(graph, uuid, constructor);
            case "ModularBox":
                return ModularBox.create(graph, uuid, constructor);
            case "ModuleConnectionBox":
                return ModuleConnectionBox.create(graph, uuid, constructor);
            case "ModularAudioInputBox":
                return ModularAudioInputBox.create(graph, uuid, constructor);
            case "ModularAudioOutputBox":
                return ModularAudioOutputBox.create(graph, uuid, constructor);
            case "ModuleDelayBox":
                return ModuleDelayBox.create(graph, uuid, constructor);
            case "ModuleMultiplierBox":
                return ModuleMultiplierBox.create(graph, uuid, constructor);
            case "ModuleGainBox":
                return ModuleGainBox.create(graph, uuid, constructor);
            default:
                return panic(`Unknown box class '${name}'`);
        }
    };
    BoxIO.deserialize = (graph, buffer) => {
        const stream = new ByteArrayInput(buffer);
        const className = stream.readString();
        const uuidBytes = UUID.fromDataInput(stream);
        const box = BoxIO.create(className, graph, uuidBytes);
        box.read(stream);
        return box;
    };
})(BoxIO || (BoxIO = {}));
