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
var _VelocityDeviceBoxAdapter_instances, _VelocityDeviceBoxAdapter_context, _VelocityDeviceBoxAdapter_box, _VelocityDeviceBoxAdapter_parametric, _VelocityDeviceBoxAdapter_random, _VelocityDeviceBoxAdapter_wrapParameters;
import { clampUnit, Random, StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class VelocityDeviceBoxAdapter {
    constructor(context, box) {
        _VelocityDeviceBoxAdapter_instances.add(this);
        this.type = "midi-effect";
        this.accepts = "midi";
        _VelocityDeviceBoxAdapter_context.set(this, void 0);
        _VelocityDeviceBoxAdapter_box.set(this, void 0);
        _VelocityDeviceBoxAdapter_parametric.set(this, void 0);
        _VelocityDeviceBoxAdapter_random.set(this, void 0);
        __classPrivateFieldSet(this, _VelocityDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _VelocityDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _VelocityDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_context, "f")), "f");
        __classPrivateFieldSet(this, _VelocityDeviceBoxAdapter_random, Random.create(), "f");
        this.namedParameter = __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_instances, "m", _VelocityDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    computeVelocity(position, original) {
        const { magnetPosition, magnetStrength, randomSeed, randomAmount, offset, mix } = this.namedParameter;
        __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_random, "f").setSeed(randomSeed.valueAt(position) + position);
        const magnet = original + (magnetPosition.valueAt(position) - original) * magnetStrength.valueAt(position);
        const random = (__classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_random, "f").uniform() * 2.0 - 1.0) * randomAmount.valueAt(position);
        const delta = offset.valueAt(position);
        const wet = mix.valueAt(position);
        return original * (1.0 - wet) + (clampUnit(magnet + random + delta)) * wet;
    }
    get box() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").terminate(); }
}
_VelocityDeviceBoxAdapter_context = new WeakMap(), _VelocityDeviceBoxAdapter_box = new WeakMap(), _VelocityDeviceBoxAdapter_parametric = new WeakMap(), _VelocityDeviceBoxAdapter_random = new WeakMap(), _VelocityDeviceBoxAdapter_instances = new WeakSet(), _VelocityDeviceBoxAdapter_wrapParameters = function _VelocityDeviceBoxAdapter_wrapParameters(box) {
    return {
        magnetPosition: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.magnetPosition, ValueMapping.unipolar(), StringMapping.percent(), "Position"),
        magnetStrength: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.magnetStrength, ValueMapping.unipolar(), StringMapping.percent(), "Strength"),
        randomSeed: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.randomSeed, ValueMapping.linearInteger(0, 0xFFFF), StringMapping.numeric({ unit: "", fractionDigits: 0 }), "Seed"),
        randomAmount: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.randomAmount, ValueMapping.unipolar(), StringMapping.percent(), "Amount"),
        offset: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.offset, ValueMapping.bipolar(), StringMapping.percent(), "Offset"),
        mix: __classPrivateFieldGet(this, _VelocityDeviceBoxAdapter_parametric, "f").createParameter(box.mix, ValueMapping.unipolar(), StringMapping.percent(), "Mix")
    };
};
