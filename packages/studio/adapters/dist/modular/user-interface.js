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
var _DeviceInterfaceKnobAdapter_instances, _DeviceInterfaceKnobAdapter_context, _DeviceInterfaceKnobAdapter_box, _DeviceInterfaceKnobAdapter_parameterTarget_get;
import { Modules } from "./module";
export class DeviceInterfaceKnobAdapter {
    constructor(context, box) {
        _DeviceInterfaceKnobAdapter_instances.add(this);
        _DeviceInterfaceKnobAdapter_context.set(this, void 0);
        _DeviceInterfaceKnobAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _DeviceInterfaceKnobAdapter_context, context, "f");
        __classPrivateFieldSet(this, _DeviceInterfaceKnobAdapter_box, box, "f");
    }
    get box() { return __classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_box, "f").address; }
    get moduleAdapter() {
        return Modules.adapterFor(__classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_context, "f").boxAdapters, __classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_instances, "a", _DeviceInterfaceKnobAdapter_parameterTarget_get).box);
    }
    get parameterAdapter() {
        return this.moduleAdapter.parameters.parameterAt(__classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_instances, "a", _DeviceInterfaceKnobAdapter_parameterTarget_get).address);
    }
    terminate() {
    }
}
_DeviceInterfaceKnobAdapter_context = new WeakMap(), _DeviceInterfaceKnobAdapter_box = new WeakMap(), _DeviceInterfaceKnobAdapter_instances = new WeakSet(), _DeviceInterfaceKnobAdapter_parameterTarget_get = function _DeviceInterfaceKnobAdapter_parameterTarget_get() {
    return __classPrivateFieldGet(this, _DeviceInterfaceKnobAdapter_box, "f").parameter.targetVertex.unwrap("Parameter not assigned");
};
