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
var _StereoToolDeviceBoxAdapter_instances, _StereoToolDeviceBoxAdapter_context, _StereoToolDeviceBoxAdapter_box, _StereoToolDeviceBoxAdapter_parametric, _StereoToolDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class StereoToolDeviceBoxAdapter {
    constructor(context, box) {
        _StereoToolDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _StereoToolDeviceBoxAdapter_context.set(this, void 0);
        _StereoToolDeviceBoxAdapter_box.set(this, void 0);
        _StereoToolDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _StereoToolDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _StereoToolDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _StereoToolDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_instances, "m", _StereoToolDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").terminate(); }
}
_StereoToolDeviceBoxAdapter_context = new WeakMap(), _StereoToolDeviceBoxAdapter_box = new WeakMap(), _StereoToolDeviceBoxAdapter_parametric = new WeakMap(), _StereoToolDeviceBoxAdapter_instances = new WeakSet(), _StereoToolDeviceBoxAdapter_wrapParameters = function _StereoToolDeviceBoxAdapter_wrapParameters(box) {
    return {
        volume: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.volume, ValueMapping.decibel(-72.0, 0.0, 12.0), StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "Volume"),
        panning: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.panning, ValueMapping.bipolar(), StringMapping.panning, "Panning", 0.5),
        stereo: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.stereo, ValueMapping.bipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "stereo", 0.5),
        invertL: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.invertL, ValueMapping.bool, StringMapping.bool, "Invert Left"),
        invertR: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.invertR, ValueMapping.bool, StringMapping.bool, "Invert Right"),
        swap: __classPrivateFieldGet(this, _StereoToolDeviceBoxAdapter_parametric, "f").createParameter(box.swap, ValueMapping.bool, StringMapping.bool, "Swap")
    };
};
