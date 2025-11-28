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
var _CompressorDeviceBoxAdapter_instances, _CompressorDeviceBoxAdapter_context, _CompressorDeviceBoxAdapter_box, _CompressorDeviceBoxAdapter_parametric, _CompressorDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class CompressorDeviceBoxAdapter {
    constructor(context, box) {
        _CompressorDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _CompressorDeviceBoxAdapter_context.set(this, void 0);
        _CompressorDeviceBoxAdapter_box.set(this, void 0);
        _CompressorDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _CompressorDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _CompressorDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _CompressorDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_instances, "m", _CompressorDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").terminate(); }
}
_CompressorDeviceBoxAdapter_context = new WeakMap(), _CompressorDeviceBoxAdapter_box = new WeakMap(), _CompressorDeviceBoxAdapter_parametric = new WeakMap(), _CompressorDeviceBoxAdapter_instances = new WeakSet(), _CompressorDeviceBoxAdapter_wrapParameters = function _CompressorDeviceBoxAdapter_wrapParameters(box) {
    return {
        lookahead: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.lookahead, ValueMapping.bool, StringMapping.bool, "Lookahead"),
        automakeup: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.automakeup, ValueMapping.bool, StringMapping.bool, "Auto Makeup"),
        autoattack: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.autoattack, ValueMapping.bool, StringMapping.bool, "Auto Attack"),
        autorelease: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.autorelease, ValueMapping.bool, StringMapping.bool, "Auto Release"),
        inputgain: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.inputgain, ValueMapping.linear(-30.0, 30.0), StringMapping.decible, "Input Gain"),
        threshold: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.threshold, ValueMapping.linear(-60.0, 0.0), StringMapping.decible, "Threshold"),
        ratio: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.ratio, ValueMapping.exponential(1.0, 24.0), StringMapping.numeric({ fractionDigits: 1 }), "Ratio"),
        knee: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.knee, ValueMapping.linear(0.0, 24.0), StringMapping.decible, "Knee"),
        attack: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.attack, ValueMapping.linear(0.0, 100.0), StringMapping.numeric({ unit: "ms", fractionDigits: 1 }), "Attack Time"),
        release: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.release, ValueMapping.linear(5.0, 1500.0), StringMapping.numeric({ unit: "ms", fractionDigits: 1 }), "Release Time"),
        makeup: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.makeup, ValueMapping.linear(-40.0, 40.0), StringMapping.decible, "Makeup Gain"),
        mix: __classPrivateFieldGet(this, _CompressorDeviceBoxAdapter_parametric, "f").createParameter(box.mix, ValueMapping.unipolar(), StringMapping.percent(), "Dry/Wet")
    };
};
