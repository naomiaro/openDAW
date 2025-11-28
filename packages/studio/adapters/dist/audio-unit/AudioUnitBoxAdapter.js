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
var _AudioUnitBoxAdapter_instances, _a, _AudioUnitBoxAdapter_terminator, _AudioUnitBoxAdapter_context, _AudioUnitBoxAdapter_box, _AudioUnitBoxAdapter_parametric, _AudioUnitBoxAdapter_tracks, _AudioUnitBoxAdapter_input, _AudioUnitBoxAdapter_midiEffects, _AudioUnitBoxAdapter_audioEffects, _AudioUnitBoxAdapter_auxSends, _AudioUnitBoxAdapter_output, _AudioUnitBoxAdapter_wrapParameters, _AudioUnitBoxAdapter_sanityCheck;
import { assert, StringMapping, Terminator, ValueMapping } from "@opendaw/lib-std";
import { AudioUnitType, Pointers } from "@opendaw/studio-enums";
import { Devices } from "../DeviceAdapter";
import { AudioUnitTracks } from "./AudioUnitTracks";
import { AudioUnitInput } from "./AudioUnitInput";
import { IndexedBoxAdapterCollection } from "../IndexedBoxAdapterCollection";
import { ParameterAdapterSet } from "../ParameterAdapterSet";
import { AuxSendBoxAdapter } from "./AuxSendBoxAdapter";
import { AudioUnitOutput } from "./AudioUnitOutput";
export class AudioUnitBoxAdapter {
    constructor(context, box) {
        _AudioUnitBoxAdapter_instances.add(this);
        this["class"] = "device-host";
        _AudioUnitBoxAdapter_terminator.set(this, new Terminator());
        _AudioUnitBoxAdapter_context.set(this, void 0);
        _AudioUnitBoxAdapter_box.set(this, void 0);
        _AudioUnitBoxAdapter_parametric.set(this, void 0);
        _AudioUnitBoxAdapter_tracks.set(this, void 0);
        _AudioUnitBoxAdapter_input.set(this, void 0);
        _AudioUnitBoxAdapter_midiEffects.set(this, void 0);
        _AudioUnitBoxAdapter_audioEffects.set(this, void 0);
        _AudioUnitBoxAdapter_auxSends.set(this, void 0);
        _AudioUnitBoxAdapter_output.set(this, void 0);
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_parametric, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(new ParameterAdapterSet(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f"))), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_tracks, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(new AudioUnitTracks(this, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters)), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_input, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(new AudioUnitInput(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").input.pointerHub, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters)), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_midiEffects, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").midiEffects, box => __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters.adapterFor(box, Devices.isMidiEffect), Pointers.MidiEffectHost)), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_audioEffects, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").audioEffects, box => __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters.adapterFor(box, Devices.isAudioEffect), Pointers.AudioEffectHost)), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_auxSends, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").auxSends, box => __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters.adapterFor(box, AuxSendBoxAdapter), Pointers.AuxSend)), "f");
        __classPrivateFieldSet(this, _AudioUnitBoxAdapter_output, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").own(new AudioUnitOutput(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").output, __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").boxAdapters)), "f");
        this.namedParameter = __classPrivateFieldGet(this, _AudioUnitBoxAdapter_instances, "m", _AudioUnitBoxAdapter_wrapParameters).call(this, box);
        __classPrivateFieldGet(this, _AudioUnitBoxAdapter_instances, "m", _AudioUnitBoxAdapter_sanityCheck).call(this);
    }
    get box() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").index; }
    get type() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").type.getValue(); }
    get captureBox() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").capture.targetVertex; }
    get tracks() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_tracks, "f"); }
    get input() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_input, "f"); }
    get midiEffects() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_midiEffects, "f"); }
    get audioEffects() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_audioEffects, "f"); }
    get inputAdapter() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_input, "f").getValue(); }
    get auxSends() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_auxSends, "f"); }
    get output() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_output, "f"); }
    get isBus() { return this.input.getValue().mapOr(adapter => adapter.type === "bus", false); }
    get isInstrument() { return this.input.getValue().mapOr(adapter => adapter.type === "instrument", false); }
    get isOutput() {
        return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").output.targetVertex.mapOr(output => output.box.address.equals(__classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").rootBoxAdapter.address), false);
    }
    get midiEffectsField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").midiEffects; }
    get inputField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").input; }
    get audioEffectsField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").audioEffects; }
    get tracksField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").tracks; }
    get minimizedField() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_input, "f").getValue().unwrap().minimizedField; }
    get isAudioUnit() { return true; }
    get label() { return __classPrivateFieldGet(this, _AudioUnitBoxAdapter_input, "f").getValue().mapOr(input => input.labelField.getValue(), ""); }
    audioUnitBoxAdapter() { return this; }
    indicesLimit() {
        const adapters = __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").rootBoxAdapter.audioUnits.adapters();
        const startIndex = this.indexField.getValue();
        const unitType = this.type;
        let min = startIndex;
        let max = startIndex;
        while (min > 0) {
            if (adapters[min - 1].type === unitType) {
                min--;
            }
            else {
                break;
            }
        }
        while (max < adapters.length - 1) {
            if (adapters[max + 1].type === unitType) {
                max++;
            }
            else {
                break;
            }
        }
        return [min, max + 1];
    }
    move(delta) { __classPrivateFieldGet(this, _AudioUnitBoxAdapter_context, "f").rootBoxAdapter.audioUnits.move(this, delta); }
    moveTrack(adapter, delta) { __classPrivateFieldGet(this, _AudioUnitBoxAdapter_tracks, "f").collection.move(adapter, delta); }
    deleteTrack(adapter) { __classPrivateFieldGet(this, _AudioUnitBoxAdapter_tracks, "f").delete(adapter); }
    toString() { return `{${this.constructor.name}}`; }
    terminate() { __classPrivateFieldGet(this, _AudioUnitBoxAdapter_terminator, "f").terminate(); }
}
_a = AudioUnitBoxAdapter, _AudioUnitBoxAdapter_terminator = new WeakMap(), _AudioUnitBoxAdapter_context = new WeakMap(), _AudioUnitBoxAdapter_box = new WeakMap(), _AudioUnitBoxAdapter_parametric = new WeakMap(), _AudioUnitBoxAdapter_tracks = new WeakMap(), _AudioUnitBoxAdapter_input = new WeakMap(), _AudioUnitBoxAdapter_midiEffects = new WeakMap(), _AudioUnitBoxAdapter_audioEffects = new WeakMap(), _AudioUnitBoxAdapter_auxSends = new WeakMap(), _AudioUnitBoxAdapter_output = new WeakMap(), _AudioUnitBoxAdapter_instances = new WeakSet(), _AudioUnitBoxAdapter_wrapParameters = function _AudioUnitBoxAdapter_wrapParameters(box) {
    return {
        volume: __classPrivateFieldGet(this, _AudioUnitBoxAdapter_parametric, "f").createParameter(box.volume, _a.VolumeMapper, StringMapping.decible, "volume"),
        panning: __classPrivateFieldGet(this, _AudioUnitBoxAdapter_parametric, "f").createParameter(box.panning, ValueMapping.bipolar(), StringMapping.panning, "panning", 0.5),
        mute: __classPrivateFieldGet(this, _AudioUnitBoxAdapter_parametric, "f").createParameter(box.mute, ValueMapping.bool, StringMapping.bool, "mute"),
        solo: __classPrivateFieldGet(this, _AudioUnitBoxAdapter_parametric, "f").createParameter(box.solo, ValueMapping.bool, StringMapping.bool, "solo")
    };
}, _AudioUnitBoxAdapter_sanityCheck = function _AudioUnitBoxAdapter_sanityCheck() {
    const address = this.address.toString();
    const capture = __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").capture.targetAddress.unwrapOrUndefined();
    const fail = () => `AudioUnit '${address}' must have a capture. AudioUnit is typed ${this.type} and has input ${__classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").input.pointerHub.incoming().at(0)?.box.name}, but capture is ${capture}`;
    assert(this.type !== AudioUnitType.Instrument || __classPrivateFieldGet(this, _AudioUnitBoxAdapter_box, "f").capture.targetAddress.nonEmpty(), fail);
};
AudioUnitBoxAdapter.VolumeMapper = ValueMapping.decibel(-96.0, -9.0, +6.0);
