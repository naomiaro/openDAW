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
var _ReverbDeviceBoxAdapter_instances, _ReverbDeviceBoxAdapter_context, _ReverbDeviceBoxAdapter_box, _ReverbDeviceBoxAdapter_parametric, _ReverbDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class ReverbDeviceBoxAdapter {
    constructor(context, box) {
        _ReverbDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _ReverbDeviceBoxAdapter_context.set(this, void 0);
        _ReverbDeviceBoxAdapter_box.set(this, void 0);
        _ReverbDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _ReverbDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ReverbDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ReverbDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_instances, "m", _ReverbDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").terminate(); }
}
_ReverbDeviceBoxAdapter_context = new WeakMap(), _ReverbDeviceBoxAdapter_box = new WeakMap(), _ReverbDeviceBoxAdapter_parametric = new WeakMap(), _ReverbDeviceBoxAdapter_instances = new WeakSet(), _ReverbDeviceBoxAdapter_wrapParameters = function _ReverbDeviceBoxAdapter_wrapParameters(box) {
    return {
        decay: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.decay, ValueMapping.unipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "Room-Size"),
        preDelay: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.preDelay, ValueMapping.exponential(0.001, 0.500), StringMapping.numeric({
            unit: "s", fractionDigits: 1, unitPrefix: true
        }), "Pre-Delay"),
        damp: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.damp, ValueMapping.unipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "damping"),
        filter: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.filter, ValueMapping.bipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "filter"),
        dry: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.dry, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "dry"),
        wet: __classPrivateFieldGet(this, _ReverbDeviceBoxAdapter_parametric, "f").createParameter(box.wet, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "wet")
    };
};
