var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BoxAdapters_instances, _BoxAdapters_context, _BoxAdapters_adapters, _BoxAdapters_deleted, _BoxAdapters_terminable, _BoxAdapters_create;
import { asDefined, assert, isDefined, panic, UUID } from "@opendaw/lib-std";
import { AudioUnitBoxAdapter } from "./audio-unit/AudioUnitBoxAdapter";
import { DelayDeviceBoxAdapter } from "./devices/audio-effects/DelayDeviceBoxAdapter";
import { ReverbDeviceBoxAdapter } from "./devices/audio-effects/ReverbDeviceBoxAdapter";
import { RevampDeviceBoxAdapter } from "./devices/audio-effects/RevampDeviceBoxAdapter";
import { AudioFileBoxAdapter } from "./audio/AudioFileBoxAdapter";
import { AudioRegionBoxAdapter } from "./timeline/region/AudioRegionBoxAdapter";
import { TimelineBoxAdapter } from "./timeline/TimelineBoxAdapter";
import { MarkerBoxAdapter } from "./timeline/MarkerBoxAdapter";
import { ModularAdapter } from "./modular/modular";
import { ModuleDelayAdapter } from "./modular/modules/delay";
import { ModuleMultiplierAdapter } from "./modular/modules/multiplier";
import { ModuleConnectionAdapter } from "./modular/connection";
import { ModularAudioOutputAdapter } from "./modular/modules/audio-output";
import { ModularAudioInputAdapter } from "./modular/modules/audio-input";
import { ModularDeviceBoxAdapter } from "./devices/audio-effects/ModularDeviceBoxAdapter";
import { DeviceInterfaceKnobAdapter } from "./modular/user-interface";
import { ModuleGainAdapter } from "./modular/modules/gain";
import { AudioBusBoxAdapter } from "./audio-unit/AudioBusBoxAdapter";
import { AuxSendBoxAdapter } from "./audio-unit/AuxSendBoxAdapter";
import { RootBoxAdapter } from "./RootBoxAdapter";
import { NoteEventBoxAdapter } from "./timeline/event/NoteEventBoxAdapter";
import { NoteRegionBoxAdapter } from "./timeline/region/NoteRegionBoxAdapter";
import { NoteEventCollectionBoxAdapter } from "./timeline/collection/NoteEventCollectionBoxAdapter";
import { ValueEventBoxAdapter } from "./timeline/event/ValueEventBoxAdapter";
import { ValueRegionBoxAdapter } from "./timeline/region/ValueRegionBoxAdapter";
import { ValueEventCollectionBoxAdapter } from "./timeline/collection/ValueEventCollectionBoxAdapter";
import { NoteClipBoxAdapter } from "./timeline/clip/NoteClipBoxAdapter";
import { AudioClipBoxAdapter } from "./timeline/clip/AudioClipBoxAdapter";
import { ValueClipBoxAdapter } from "./timeline/clip/ValueClipBoxAdapter";
import { TrackBoxAdapter } from "./timeline/TrackBoxAdapter";
import { TapeDeviceBoxAdapter } from "./devices/instruments/TapeDeviceBoxAdapter";
import { VaporisateurDeviceBoxAdapter } from "./devices/instruments/VaporisateurDeviceBoxAdapter";
import { ArpeggioDeviceBoxAdapter } from "./devices/midi-effects/ArpeggioDeviceBoxAdapter";
import { PitchDeviceBoxAdapter } from "./devices/midi-effects/PitchDeviceBoxAdapter";
import { NanoDeviceBoxAdapter } from "./devices/instruments/NanoDeviceBoxAdapter";
import { PlayfieldDeviceBoxAdapter } from "./devices/instruments/PlayfieldDeviceBoxAdapter";
import { StereoToolDeviceBoxAdapter } from "./devices/audio-effects/StereoToolDeviceBoxAdapter";
import { PlayfieldSampleBoxAdapter } from "./devices/instruments/Playfield/PlayfieldSampleBoxAdapter";
import { ZeitgeistDeviceBoxAdapter } from "./devices/midi-effects/ZeitgeistDeviceBoxAdapter";
import { GrooveShuffleBoxAdapter } from "./grooves/GrooveShuffleBoxAdapter";
import { UnknownAudioEffectDeviceBoxAdapter } from "./devices/audio-effects/UnknownAudioEffectDeviceBoxAdapter";
import { UnknownMidiEffectDeviceBoxAdapter } from "./devices/midi-effects/UnknownMidiEffectDeviceBoxAdapter";
import { SoundfontDeviceBoxAdapter } from "./devices/instruments/SoundfontDeviceBoxAdapter";
import { SoundfontFileBoxAdapter } from "./soundfont/SoundfontFileBoxAdapter";
import { CompressorDeviceBoxAdapter } from "./devices/audio-effects/CompressorDeviceBoxAdapter";
import { CrusherDeviceBoxAdapter } from "./devices/audio-effects/CrusherDeviceBoxAdapter";
import { FoldDeviceBoxAdapter } from "./devices/audio-effects/FoldDeviceBoxAdapter";
import { MIDIOutputDeviceBoxAdapter } from "./devices/instruments/MIDIOutputDeviceBoxAdapter";
import { VelocityDeviceBoxAdapter } from "./devices/midi-effects/VelocityDeviceBoxAdapter";
import { TidalDeviceBoxAdapter } from "./devices/audio-effects/TidalDeviceBoxAdapter";
import { DattorroReverbDeviceBoxAdapter } from "./devices/audio-effects/DattorroReverbDeviceBoxAdapter";
export class BoxAdapters {
    constructor(context) {
        _BoxAdapters_instances.add(this);
        _BoxAdapters_context.set(this, void 0);
        _BoxAdapters_adapters.set(this, void 0);
        _BoxAdapters_deleted.set(this, void 0);
        _BoxAdapters_terminable.set(this, void 0);
        __classPrivateFieldSet(this, _BoxAdapters_context, context, "f");
        __classPrivateFieldSet(this, _BoxAdapters_adapters, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _BoxAdapters_deleted, new Set(), "f");
        __classPrivateFieldSet(this, _BoxAdapters_terminable, __classPrivateFieldGet(this, _BoxAdapters_context, "f").boxGraph.subscribeToAllUpdates({
            onUpdate: (update) => {
                if (update.type === "delete") {
                    const adapter = __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").getOrNull(update.uuid);
                    if (isDefined(adapter)) {
                        __classPrivateFieldGet(this, _BoxAdapters_deleted, "f").add(adapter.box);
                        __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").removeByValue(adapter).terminate();
                    }
                }
            }
        }), "f");
    }
    terminate() {
        __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").values().forEach(adapter => adapter.terminate());
        __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").clear();
        __classPrivateFieldGet(this, _BoxAdapters_terminable, "f").terminate();
    }
    adapterFor(box, checkType) {
        if (__classPrivateFieldGet(this, _BoxAdapters_deleted, "f").has(box)) {
            return panic(`Cannot resolve adapter for already deleted box: ${box}`);
        }
        let adapter = __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").getOrNull(box.address.uuid);
        if (adapter === null) {
            adapter = __classPrivateFieldGet(this, _BoxAdapters_instances, "m", _BoxAdapters_create).call(this, box);
            const added = __classPrivateFieldGet(this, _BoxAdapters_adapters, "f").add(adapter);
            assert(added, `Could not add adapter for ${box}`);
        }
        if (typeof checkType === "function") {
            return Object.hasOwn(checkType, "prototype")
                ? adapter instanceof checkType ? adapter : panic(`${adapter} is not instance of ${checkType}`)
                : checkType(adapter) ? adapter : panic(`${adapter} did not pass custom type guard`);
        }
        return panic("Unknown checkType method");
    }
}
_BoxAdapters_context = new WeakMap(), _BoxAdapters_adapters = new WeakMap(), _BoxAdapters_deleted = new WeakMap(), _BoxAdapters_terminable = new WeakMap(), _BoxAdapters_instances = new WeakSet(), _BoxAdapters_create = function _BoxAdapters_create(unknownBox) {
    return asDefined(unknownBox.accept({
        visitArpeggioDeviceBox: (box) => new ArpeggioDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAudioBusBox: (box) => new AudioBusBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAudioClipBox: (box) => new AudioClipBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAudioFileBox: (box) => new AudioFileBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAudioRegionBox: (box) => new AudioRegionBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAudioUnitBox: (box) => new AudioUnitBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitAuxSendBox: (box) => new AuxSendBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitCompressorDeviceBox: (box) => new CompressorDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitCrusherDeviceBox: (box) => new CrusherDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitDattorroReverbDeviceBox: (box) => new DattorroReverbDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitDelayDeviceBox: (box) => new DelayDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitDeviceInterfaceKnobBox: (box) => new DeviceInterfaceKnobAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitTidalDeviceBox: (box) => new TidalDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitFoldDeviceBox: (box) => new FoldDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitGrooveShuffleBox: (box) => new GrooveShuffleBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitMarkerBox: (box) => new MarkerBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitMIDIOutputDeviceBox: (box) => new MIDIOutputDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModularAudioInputBox: (box) => new ModularAudioInputAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModularAudioOutputBox: (box) => new ModularAudioOutputAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModularBox: (box) => new ModularAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModularDeviceBox: (box) => new ModularDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModuleConnectionBox: (box) => new ModuleConnectionAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModuleDelayBox: (box) => new ModuleDelayAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModuleGainBox: (box) => new ModuleGainAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitModuleMultiplierBox: (box) => new ModuleMultiplierAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitNanoDeviceBox: (box) => new NanoDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitNoteClipBox: (box) => new NoteClipBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitNoteEventBox: (box) => new NoteEventBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitNoteEventCollectionBox: (box) => new NoteEventCollectionBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitNoteRegionBox: (box) => new NoteRegionBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitPitchDeviceBox: (box) => new PitchDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitPlayfieldDeviceBox: (box) => new PlayfieldDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitPlayfieldSampleBox: (box) => new PlayfieldSampleBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitRevampDeviceBox: (box) => new RevampDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitReverbDeviceBox: (box) => new ReverbDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitRootBox: (box) => new RootBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitSoundfontDeviceBox: (box) => new SoundfontDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitSoundfontFileBox: (box) => new SoundfontFileBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitStereoToolDeviceBox: (box) => new StereoToolDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitTapeDeviceBox: (box) => new TapeDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitTimelineBox: (box) => new TimelineBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitTrackBox: (box) => new TrackBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitUnknownAudioEffectDeviceBox: (box) => new UnknownAudioEffectDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitUnknownMidiEffectDeviceBox: (box) => new UnknownMidiEffectDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitValueClipBox: (box) => new ValueClipBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitValueEventBox: (box) => new ValueEventBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitValueEventCollectionBox: (box) => new ValueEventCollectionBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitValueRegionBox: (box) => new ValueRegionBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitVaporisateurDeviceBox: (box) => new VaporisateurDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitVelocityDeviceBox: (box) => new VelocityDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box),
        visitZeitgeistDeviceBox: (box) => new ZeitgeistDeviceBoxAdapter(__classPrivateFieldGet(this, _BoxAdapters_context, "f"), box)
    }), `Could not find factory for ${unknownBox}`);
};
