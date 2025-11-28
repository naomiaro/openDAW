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
var _PitchDeviceBoxAdapter_instances, _PitchDeviceBoxAdapter_context, _PitchDeviceBoxAdapter_box, _PitchDeviceBoxAdapter_parametric, _PitchDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class PitchDeviceBoxAdapter {
    constructor(context, box) {
        _PitchDeviceBoxAdapter_instances.add(this);
        this.type = "midi-effect";
        this.accepts = "midi";
        _PitchDeviceBoxAdapter_context.set(this, void 0);
        _PitchDeviceBoxAdapter_box.set(this, void 0);
        _PitchDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _PitchDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _PitchDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _PitchDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _PitchDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_instances, "m", _PitchDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _PitchDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_parametric, "f").terminate(); }
}
_PitchDeviceBoxAdapter_context = new WeakMap(), _PitchDeviceBoxAdapter_box = new WeakMap(), _PitchDeviceBoxAdapter_parametric = new WeakMap(), _PitchDeviceBoxAdapter_instances = new WeakSet(), _PitchDeviceBoxAdapter_wrapParameters = function _PitchDeviceBoxAdapter_wrapParameters(box) {
    return {
        octaves: __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_parametric, "f").createParameter(box.octaves, ValueMapping.linearInteger(-7, 7), StringMapping.numeric({ unit: "oct", fractionDigits: 0 }), "octaves"),
        semiTones: __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_parametric, "f").createParameter(box.semiTones, ValueMapping.linearInteger(-36, 36), StringMapping.numeric({ unit: "st", fractionDigits: 0 }), "semi-tones"),
        cent: __classPrivateFieldGet(this, _PitchDeviceBoxAdapter_parametric, "f").createParameter(box.cents, ValueMapping.linear(-50.0, 50.0), StringMapping.numeric({ unit: "cents", fractionDigits: 1 }), "cents")
    };
};
