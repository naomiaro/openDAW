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
var _ArpeggioDeviceBoxAdapter_instances, _a, _ArpeggioDeviceBoxAdapter_context, _ArpeggioDeviceBoxAdapter_box, _ArpeggioDeviceBoxAdapter_parametric, _ArpeggioDeviceBoxAdapter_wrapParameters;
import { Fraction } from "@opendaw/lib-dsp";
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class ArpeggioDeviceBoxAdapter {
    constructor(context, box) {
        _ArpeggioDeviceBoxAdapter_instances.add(this);
        this.type = "midi-effect";
        this.accepts = "midi";
        _ArpeggioDeviceBoxAdapter_context.set(this, void 0);
        _ArpeggioDeviceBoxAdapter_box.set(this, void 0);
        _ArpeggioDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _ArpeggioDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ArpeggioDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ArpeggioDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_instances, "m", _ArpeggioDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").terminate(); }
}
_a = ArpeggioDeviceBoxAdapter, _ArpeggioDeviceBoxAdapter_context = new WeakMap(), _ArpeggioDeviceBoxAdapter_box = new WeakMap(), _ArpeggioDeviceBoxAdapter_parametric = new WeakMap(), _ArpeggioDeviceBoxAdapter_instances = new WeakSet(), _ArpeggioDeviceBoxAdapter_wrapParameters = function _ArpeggioDeviceBoxAdapter_wrapParameters(box) {
    return {
        modeIndex: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.modeIndex, ValueMapping.linearInteger(0, 2), StringMapping.indices("", ["Up", "Down", "UpDown"]), "mode"),
        numOctaves: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.numOctaves, ValueMapping.linearInteger(1, 5), StringMapping.numeric({ unit: "", fractionDigits: 0 }), "Octaves"),
        rate: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.rateIndex, ValueMapping.linearInteger(0, _a.RateFractions.length - 1), _a.RateStringMapping, "Rate"),
        gate: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.gate, ValueMapping.linear(0.0, 2.0), StringMapping.percent({ fractionDigits: 0 }), "Gate"),
        repeat: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.repeat, ValueMapping.linearInteger(1, 16), StringMapping.numeric({ fractionDigits: 0 }), "Repeat"),
        velocity: __classPrivateFieldGet(this, _ArpeggioDeviceBoxAdapter_parametric, "f").createParameter(box.velocity, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 0, bipolar: false }), "Velocity")
    };
};
ArpeggioDeviceBoxAdapter.RateFractions = Fraction.builder()
    .add([1, 1]).add([1, 2]).add([1, 3]).add([1, 4])
    .add([3, 16]).add([1, 6]).add([1, 8]).add([3, 32])
    .add([1, 12]).add([1, 16]).add([3, 64]).add([1, 24])
    .add([1, 32]).add([1, 48]).add([1, 64])
    .add([1, 96]).add([1, 128])
    .asDescendingArray();
ArpeggioDeviceBoxAdapter.RateStringMapping = StringMapping.indices("", _a.RateFractions.map(([n, d]) => `${n}/${d}`));
