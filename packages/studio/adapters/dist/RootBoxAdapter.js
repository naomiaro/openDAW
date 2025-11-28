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
var _RootBoxAdapter_context, _RootBoxAdapter_box, _RootBoxAdapter_audioUnits, _RootBoxAdapter_audioBusses, _RootBoxAdapter_pianoMode;
import { MIDIOutputBox } from "@opendaw/studio-boxes";
import { asInstanceOf } from "@opendaw/lib-std";
import { AudioBusBoxAdapter } from "./audio-unit/AudioBusBoxAdapter";
import { Pointers } from "@opendaw/studio-enums";
import { IndexedBoxAdapterCollection } from "./IndexedBoxAdapterCollection";
import { AudioUnitBoxAdapter } from "./audio-unit/AudioUnitBoxAdapter";
import { BoxAdapterCollection } from "./BoxAdapterCollection";
import { TimelineBoxAdapter } from "./timeline/TimelineBoxAdapter";
import { GrooveShuffleBoxAdapter } from "./grooves/GrooveShuffleBoxAdapter";
import { PianoModeAdapter } from "./PianoModeAdapter";
export class RootBoxAdapter {
    constructor(context, box) {
        _RootBoxAdapter_context.set(this, void 0);
        _RootBoxAdapter_box.set(this, void 0);
        _RootBoxAdapter_audioUnits.set(this, void 0);
        _RootBoxAdapter_audioBusses.set(this, void 0);
        _RootBoxAdapter_pianoMode.set(this, void 0);
        __classPrivateFieldSet(this, _RootBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _RootBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _RootBoxAdapter_audioUnits, IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").audioUnits, box => __classPrivateFieldGet(this, _RootBoxAdapter_context, "f").boxAdapters.adapterFor(box, AudioUnitBoxAdapter), Pointers.AudioUnits), "f");
        __classPrivateFieldSet(this, _RootBoxAdapter_audioBusses, new BoxAdapterCollection(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").audioBusses.pointerHub, box => __classPrivateFieldGet(this, _RootBoxAdapter_context, "f").boxAdapters.adapterFor(box, AudioBusBoxAdapter), Pointers.AudioBusses), "f");
        __classPrivateFieldSet(this, _RootBoxAdapter_pianoMode, new PianoModeAdapter(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").pianoMode), "f");
    }
    get uuid() { return __classPrivateFieldGet(this, _RootBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _RootBoxAdapter_box, "f").address; }
    get box() { return __classPrivateFieldGet(this, _RootBoxAdapter_box, "f"); }
    get audioBusses() { return __classPrivateFieldGet(this, _RootBoxAdapter_audioBusses, "f"); }
    get audioUnits() { return __classPrivateFieldGet(this, _RootBoxAdapter_audioUnits, "f"); }
    get clips() {
        return __classPrivateFieldGet(this, _RootBoxAdapter_audioUnits, "f").adapters()
            .flatMap(adapter => adapter.tracks.collection.adapters())
            .flatMap(track => track.clips.collection.adapters());
    }
    get groove() {
        return __classPrivateFieldGet(this, _RootBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").groove.targetVertex.unwrap("no groove").box, GrooveShuffleBoxAdapter);
    }
    get timeline() {
        return __classPrivateFieldGet(this, _RootBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").timeline.targetVertex.unwrap("no timeline").box, TimelineBoxAdapter);
    }
    get pianoMode() { return __classPrivateFieldGet(this, _RootBoxAdapter_pianoMode, "f"); }
    get created() { return new Date(__classPrivateFieldGet(this, _RootBoxAdapter_box, "f").created.getValue()); }
    get midiOutputDevices() {
        return __classPrivateFieldGet(this, _RootBoxAdapter_box, "f").outputMidiDevices.pointerHub.incoming().map(({ box }) => asInstanceOf(box, MIDIOutputBox));
    }
    terminate() { __classPrivateFieldGet(this, _RootBoxAdapter_audioUnits, "f").terminate(); }
}
_RootBoxAdapter_context = new WeakMap(), _RootBoxAdapter_box = new WeakMap(), _RootBoxAdapter_audioUnits = new WeakMap(), _RootBoxAdapter_audioBusses = new WeakMap(), _RootBoxAdapter_pianoMode = new WeakMap();
