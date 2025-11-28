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
var _RevampDeviceBoxAdapter_instances, _RevampDeviceBoxAdapter_context, _RevampDeviceBoxAdapter_box, _RevampDeviceBoxAdapter_parametric, _RevampDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class RevampDeviceBoxAdapter {
    constructor(context, box) {
        _RevampDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _RevampDeviceBoxAdapter_context.set(this, void 0);
        _RevampDeviceBoxAdapter_box.set(this, void 0);
        _RevampDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _RevampDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _RevampDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _RevampDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_instances, "m", _RevampDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").host; }
    get spectrum() { return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").address.append(0xFFF); }
    deviceHost() {
        return __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f").terminate(); }
}
_RevampDeviceBoxAdapter_context = new WeakMap(), _RevampDeviceBoxAdapter_box = new WeakMap(), _RevampDeviceBoxAdapter_parametric = new WeakMap(), _RevampDeviceBoxAdapter_instances = new WeakSet(), _RevampDeviceBoxAdapter_wrapParameters = function _RevampDeviceBoxAdapter_wrapParameters(box) {
    return {
        highPass: createPass(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.highPass, "High-Pass"),
        lowShelf: createShelf(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.lowShelf, "Low-Shelf"),
        lowBell: createBell(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.lowBell, "Low-Bell"),
        midBell: createBell(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.midBell, "Mid-Bell"),
        highBell: createBell(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.highBell, "High-Bell"),
        highShelf: createShelf(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.highShelf, "High-Shelf"),
        lowPass: createPass(__classPrivateFieldGet(this, _RevampDeviceBoxAdapter_parametric, "f"), box.lowPass, "Low-Pass")
    };
};
const FrequencyMapping = ValueMapping.exponential(20.0, 20000);
const GainMapping = ValueMapping.linear(-24.0, 24.0);
const QMapping = ValueMapping.exponential(0.01, 10.0);
const createPass = (parametric, pass, name) => {
    return ({
        enabled: parametric.createParameter(pass.enabled, ValueMapping.bool, StringMapping.bool, "enabled"),
        frequency: parametric.createParameter(pass.frequency, FrequencyMapping, StringMapping.numeric({ unit: "Hz", fractionDigits: 0 }), `${name} Freq`),
        order: parametric.createParameter(pass.order, ValueMapping.linearInteger(0, 3), StringMapping.indices("db", ["12", "24", "36", "48"]), `${name} Order`),
        q: parametric.createParameter(pass.q, QMapping, StringMapping.numeric({ fractionDigits: 3 }), `${name} Q`)
    });
};
const createShelf = (parametric, shelf, name) => ({
    enabled: parametric.createParameter(shelf.enabled, ValueMapping.bool, StringMapping.bool, "enabled"),
    frequency: parametric.createParameter(shelf.frequency, FrequencyMapping, StringMapping.numeric({ unit: "Hz", fractionDigits: 0 }), `${name} Freq`),
    gain: parametric.createParameter(shelf.gain, GainMapping, StringMapping.numeric({ unit: "db", fractionDigits: 1, bipolar: true }), `${name} Gain`, 0.5)
});
const createBell = (parametric, bell, name) => ({
    enabled: parametric.createParameter(bell.enabled, ValueMapping.bool, StringMapping.bool, "enabled"),
    frequency: parametric.createParameter(bell.frequency, FrequencyMapping, StringMapping.numeric({ unit: "Hz", fractionDigits: 0 }), `${name} Freq`),
    gain: parametric.createParameter(bell.gain, GainMapping, StringMapping.numeric({ unit: "db", fractionDigits: 1, bipolar: true }), `${name} Gain`, 0.5),
    q: parametric.createParameter(bell.q, QMapping, StringMapping.numeric({ fractionDigits: 3 }), `${name} Q`)
});
