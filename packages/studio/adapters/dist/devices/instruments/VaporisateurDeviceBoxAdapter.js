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
var _VaporisateurDeviceBoxAdapter_instances, _VaporisateurDeviceBoxAdapter_context, _VaporisateurDeviceBoxAdapter_box, _VaporisateurDeviceBoxAdapter_parametric, _VaporisateurDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
import { VoicingMode } from "@opendaw/studio-enums";
import { VaporisateurSettings } from "./VaporisateurSettings";
export class VaporisateurDeviceBoxAdapter {
    constructor(context, box) {
        _VaporisateurDeviceBoxAdapter_instances.add(this);
        this.type = "instrument";
        this.accepts = "midi";
        _VaporisateurDeviceBoxAdapter_context.set(this, void 0);
        _VaporisateurDeviceBoxAdapter_box.set(this, void 0);
        _VaporisateurDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _VaporisateurDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _VaporisateurDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _VaporisateurDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_instances, "m", _VaporisateurDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get enabledField() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return true; }
    deviceHost() {
        return __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").terminate(); }
}
_VaporisateurDeviceBoxAdapter_context = new WeakMap(), _VaporisateurDeviceBoxAdapter_box = new WeakMap(), _VaporisateurDeviceBoxAdapter_parametric = new WeakMap(), _VaporisateurDeviceBoxAdapter_instances = new WeakSet(), _VaporisateurDeviceBoxAdapter_wrapParameters = function _VaporisateurDeviceBoxAdapter_wrapParameters(box) {
    const VoiceModes = [VoicingMode.Monophonic, VoicingMode.Polyphonic];
    return {
        oscillators: box.oscillators.fields().map(osc => ({
            waveform: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(osc.waveform, ValueMapping.linearInteger(0, 3), StringMapping.indices("", ["Sine", "Triangle", "Sawtooth", "Square"]), "Waveform"),
            volume: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(osc.volume, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "Volume"),
            octave: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(osc.octave, ValueMapping.linearInteger(-3, 3), StringMapping.numeric({ unit: "oct" }), "Octave", 0.5),
            tune: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(osc.tune, ValueMapping.linear(-1200.0, +1200.0), StringMapping.numeric({ unit: "ct", fractionDigits: 0 }), "Tune", 0.5)
        })),
        noise: {
            volume: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.noise.volume, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "Volume"),
            attack: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.noise.attack, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Attack"),
            hold: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.noise.hold, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Hold"),
            release: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.noise.release, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Release")
        },
        filterOrder: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.filterOrder, VaporisateurSettings.FILTER_ORDER_VALUE_MAPPING, VaporisateurSettings.FILTER_ORDER_STRING_MAPPING, "Flt. Order"),
        cutoff: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.cutoff, VaporisateurSettings.CUTOFF_VALUE_MAPPING, VaporisateurSettings.CUTOFF_STRING_MAPPING, "Flt. Cutoff"),
        resonance: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.resonance, ValueMapping.exponential(0.01, 10.0), StringMapping.numeric({ unit: "q", fractionDigits: 3 }), "Flt. Q"),
        attack: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.attack, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Attack"),
        decay: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.decay, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Decay"),
        sustain: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.sustain, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 1 }), "Sustain"),
        release: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.release, ValueMapping.exponential(0.001, 5.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "Release"),
        filterEnvelope: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.filterEnvelope, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Flt. Env.", 0.5),
        filterKeyboard: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.filterKeyboard, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Flt. Kbd.", 0.5),
        voicingMode: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.voicingMode, ValueMapping.values(VoiceModes), StringMapping.values("", VoiceModes, ["mono", "poly"]), "Play Mode", 0.5),
        glideTime: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.glideTime, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 1 }), "Glide time", 0.0),
        unisonCount: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.unisonCount, ValueMapping.values([1, 3, 5]), StringMapping.values("#", [1, 3, 5], [1, 3, 5].map(x => String(x))), "Unisono", 0.0),
        unisonDetune: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.unisonDetune, ValueMapping.exponential(1.0, 1200.0), StringMapping.numeric({ unit: "ct", fractionDigits: 0 }), "Detune", 0.0),
        unisonStereo: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.unisonStereo, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 0 }), "Stereo", 0.0),
        lfoWaveform: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.lfo.waveform, VaporisateurSettings.LFO_WAVEFORM_VALUE_MAPPING, VaporisateurSettings.LFO_WAVEFORM_STRING_MAPPING, "LFO Shape", 0.0),
        lfoRate: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.lfo.rate, ValueMapping.exponential(0.0001, 30.0), StringMapping.numeric({ unit: "Hz", fractionDigits: 1, unitPrefix: true }), "Rate", 0.0),
        lfoTargetTune: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.lfo.targetTune, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Vibrato ⦿", 0.5),
        lfoTargetVolume: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.lfo.targetVolume, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Tremolo ⦿", 0.5),
        lfoTargetCutoff: __classPrivateFieldGet(this, _VaporisateurDeviceBoxAdapter_parametric, "f").createParameter(box.lfo.targetCutoff, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Cutoff ⦿", 0.5)
    };
};
