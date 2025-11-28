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
var _DelayDeviceBoxAdapter_instances, _a, _DelayDeviceBoxAdapter_context, _DelayDeviceBoxAdapter_box, _DelayDeviceBoxAdapter_parametric, _DelayDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Fraction } from "@opendaw/lib-dsp";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class DelayDeviceBoxAdapter {
    constructor(context, box) {
        _DelayDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _DelayDeviceBoxAdapter_context.set(this, void 0);
        _DelayDeviceBoxAdapter_box.set(this, void 0);
        _DelayDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _DelayDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _DelayDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _DelayDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _DelayDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_instances, "m", _DelayDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _DelayDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").terminate(); }
}
_a = DelayDeviceBoxAdapter, _DelayDeviceBoxAdapter_context = new WeakMap(), _DelayDeviceBoxAdapter_box = new WeakMap(), _DelayDeviceBoxAdapter_parametric = new WeakMap(), _DelayDeviceBoxAdapter_instances = new WeakSet(), _DelayDeviceBoxAdapter_wrapParameters = function _DelayDeviceBoxAdapter_wrapParameters(box) {
    return {
        delay: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.delay, ValueMapping.linearInteger(0, _a.OffsetFractions.length - 1), _a.OffsetStringMapping, "delay"),
        feedback: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.feedback, ValueMapping.unipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "feedback"),
        cross: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.cross, ValueMapping.unipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "cross"),
        filter: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.filter, ValueMapping.bipolar(), StringMapping.numeric({ unit: "%", fractionDigits: 0 }), "filter", 0.5),
        dry: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.dry, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "dry"),
        wet: __classPrivateFieldGet(this, _DelayDeviceBoxAdapter_parametric, "f").createParameter(box.wet, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "wet")
    };
};
DelayDeviceBoxAdapter.OffsetFractions = Fraction.builder()
    .add([1, 1]).add([1, 2]).add([1, 3]).add([1, 4])
    .add([3, 16]).add([1, 6]).add([1, 8]).add([3, 32])
    .add([1, 12]).add([1, 16]).add([3, 64]).add([1, 24])
    .add([1, 32]).add([1, 48]).add([1, 64])
    .add([1, 96]).add([1, 128])
    .asDescendingArray();
DelayDeviceBoxAdapter.OffsetStringMapping = StringMapping.indices("", _a.OffsetFractions.map(([n, d]) => `${n}/${d}`));
