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
var _PlayfieldSampleBoxAdapter_instances, _PlayfieldSampleBoxAdapter_terminator, _PlayfieldSampleBoxAdapter_context, _PlayfieldSampleBoxAdapter_box, _PlayfieldSampleBoxAdapter_midiEffects, _PlayfieldSampleBoxAdapter_audioEffects, _PlayfieldSampleBoxAdapter_parametric, _PlayfieldSampleBoxAdapter_file, _PlayfieldSampleBoxAdapter_wrapParameters;
import { Pointers } from "@opendaw/studio-enums";
import { PlayfieldSampleBox } from "@opendaw/studio-boxes";
import { Option, StringMapping, Terminator, UUID, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../../DeviceAdapter";
import { IndexedBoxAdapterCollection } from "../../../IndexedBoxAdapterCollection";
import { ParameterAdapterSet } from "../../../ParameterAdapterSet";
import { AudioFileBoxAdapter } from "../../../audio/AudioFileBoxAdapter";
import { TrackType } from "../../../timeline/TrackType";
import { PlayfieldDeviceBoxAdapter } from "../PlayfieldDeviceBoxAdapter";
export class PlayfieldSampleBoxAdapter {
    constructor(context, box) {
        _PlayfieldSampleBoxAdapter_instances.add(this);
        this.class = "device-host";
        this.accepts = false;
        this.type = "instrument";
        _PlayfieldSampleBoxAdapter_terminator.set(this, new Terminator());
        _PlayfieldSampleBoxAdapter_context.set(this, void 0);
        _PlayfieldSampleBoxAdapter_box.set(this, void 0);
        _PlayfieldSampleBoxAdapter_midiEffects.set(this, void 0);
        _PlayfieldSampleBoxAdapter_audioEffects.set(this, void 0);
        _PlayfieldSampleBoxAdapter_parametric.set(this, void 0);
        _PlayfieldSampleBoxAdapter_file.set(this, Option.None);
        __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_midiEffects, __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_terminator, "f").own(IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").midiEffects, box => __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_context, "f").boxAdapters.adapterFor(box, Devices.isMidiEffect), Pointers.MidiEffectHost)), "f");
        __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_audioEffects, __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_terminator, "f").own(IndexedBoxAdapterCollection.create(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").audioEffects, box => __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_context, "f").boxAdapters.adapterFor(box, Devices.isAudioEffect), Pointers.AudioEffectHost)), "f");
        __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_parametric, __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_terminator, "f").own(new ParameterAdapterSet(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_context, "f"))), "f");
        this.namedParameter = __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_instances, "m", _PlayfieldSampleBoxAdapter_wrapParameters).call(this, box);
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").file.catchupAndSubscribe(pointer => {
            __classPrivateFieldSet(this, _PlayfieldSampleBoxAdapter_file, pointer.targetVertex.map(({ box }) => __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_context, "f").boxAdapters.adapterFor(box, AudioFileBoxAdapter)), "f");
            __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_file, "f").unwrapOrNull()?.getOrCreateLoader(); // triggers preloading file if available
        }));
    }
    get box() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").address; }
    get peakAddress() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").address.append(1001); }
    get indexField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").index; }
    get gate() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").gate.getValue(); }
    get exclude() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").exclude.getValue(); }
    get label() {
        return `${this.device().labelField.getValue()} > ${__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_file, "f").mapOr(file => file.box.fileName.getValue(), "No file")}`;
    }
    get iconField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get acceptsMidiEvents() { return true; }
    get midiEffectsField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").midiEffects; }
    get inputField() { return this.audioUnitBoxAdapter().box.input; }
    get audioEffectsField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").audioEffects; }
    get tracksField() { return this.audioUnitBoxAdapter().box.tracks; }
    get isAudioUnit() { return false; }
    file() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_file, "f"); }
    fileUUID() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").file.targetAddress.unwrap().uuid; }
    resetParameters() {
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").mute.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").solo.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").exclude.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").polyphone.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").pitch.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").attack.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").release.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").sampleStart.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").sampleEnd.reset();
        __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").gate.reset();
    }
    copyToIndex(index) {
        PlayfieldSampleBox.create(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").graph, UUID.generate(), box => {
            box.file.refer(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").file.targetVertex.unwrap());
            box.device.refer(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").device.targetVertex.unwrap());
            box.index.setValue(index);
            box.mute.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").mute.getValue());
            box.solo.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").solo.getValue());
            box.sampleStart.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").sampleStart.getValue());
            box.sampleEnd.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").sampleEnd.getValue());
            box.attack.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").attack.getValue());
            box.release.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").release.getValue());
            box.pitch.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").pitch.getValue());
            box.exclude.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").exclude.getValue());
            box.gate.setValue(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").gate.getValue());
            // TODO Copy effects?
        });
    }
    get midiEffects() {
        return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_midiEffects, "f");
    }
    get inputAdapter() {
        return Option.wrap(this);
    }
    get audioEffects() {
        return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_audioEffects, "f");
    }
    get labelField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").minimized; }
    device() {
        return __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_box, "f").device.targetVertex.unwrap().box, PlayfieldDeviceBoxAdapter);
    }
    deviceHost() { return this.device().deviceHost(); }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_terminator, "f").terminate(); }
}
_PlayfieldSampleBoxAdapter_terminator = new WeakMap(), _PlayfieldSampleBoxAdapter_context = new WeakMap(), _PlayfieldSampleBoxAdapter_box = new WeakMap(), _PlayfieldSampleBoxAdapter_midiEffects = new WeakMap(), _PlayfieldSampleBoxAdapter_audioEffects = new WeakMap(), _PlayfieldSampleBoxAdapter_parametric = new WeakMap(), _PlayfieldSampleBoxAdapter_file = new WeakMap(), _PlayfieldSampleBoxAdapter_instances = new WeakSet(), _PlayfieldSampleBoxAdapter_wrapParameters = function _PlayfieldSampleBoxAdapter_wrapParameters(box) {
    return {
        gate: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.gate, ValueMapping.linearInteger(0, 2), StringMapping.indices("", ["Off", "On", "Loop"]), "Gate"),
        mute: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.mute, ValueMapping.bool, StringMapping.bool, "Mute"),
        solo: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.solo, ValueMapping.bool, StringMapping.bool, "Solo"),
        polyphone: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.polyphone, ValueMapping.bool, StringMapping.bool, "Polyphone"),
        exclude: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.exclude, ValueMapping.bool, StringMapping.bool, "Exclude"),
        pitch: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.pitch, ValueMapping.linear(-1200, 1200), StringMapping.numeric({
            unit: "cents",
            bipolar: true,
            fractionDigits: 0
        }), "Pitch", 0.0),
        sampleStart: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.sampleStart, ValueMapping.unipolar(), StringMapping.percent(), "Start", 0.0),
        sampleEnd: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.sampleEnd, ValueMapping.unipolar(), StringMapping.percent(), "End", 1.0),
        attack: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.attack, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({
            unit: "s",
            unitPrefix: true,
            fractionDigits: 1
        }), "Attack"),
        release: __classPrivateFieldGet(this, _PlayfieldSampleBoxAdapter_parametric, "f").createParameter(box.release, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({
            unit: "s",
            unitPrefix: true,
            fractionDigits: 1
        }), "Release")
    };
};
