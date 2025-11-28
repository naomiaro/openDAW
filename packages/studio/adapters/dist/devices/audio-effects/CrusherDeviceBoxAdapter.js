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
var _CrusherDeviceBoxAdapter_instances, _CrusherDeviceBoxAdapter_context, _CrusherDeviceBoxAdapter_box, _CrusherDeviceBoxAdapter_parametric, _CrusherDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class CrusherDeviceBoxAdapter {
    constructor(context, box) {
        _CrusherDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _CrusherDeviceBoxAdapter_context.set(this, void 0);
        _CrusherDeviceBoxAdapter_box.set(this, void 0);
        _CrusherDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _CrusherDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _CrusherDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _CrusherDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_instances, "m", _CrusherDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_parametric, "f").terminate(); }
}
_CrusherDeviceBoxAdapter_context = new WeakMap(), _CrusherDeviceBoxAdapter_box = new WeakMap(), _CrusherDeviceBoxAdapter_parametric = new WeakMap(), _CrusherDeviceBoxAdapter_instances = new WeakSet(), _CrusherDeviceBoxAdapter_wrapParameters = function _CrusherDeviceBoxAdapter_wrapParameters(box) {
    return {
        crush: __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_parametric, "f").createParameter(box.crush, ValueMapping.unipolar(), StringMapping.percent(), "Crush"),
        bits: __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_parametric, "f").createParameter(box.bits, ValueMapping.linearInteger(1, 16), StringMapping.numeric(), "Bits"),
        boost: __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_parametric, "f").createParameter(box.boost, ValueMapping.linear(0.0, 24.0), StringMapping.decible, "Boost"),
        mix: __classPrivateFieldGet(this, _CrusherDeviceBoxAdapter_parametric, "f").createParameter(box.mix, ValueMapping.exponential(0.001, 1.0), StringMapping.percent(), "Mix")
    };
};
