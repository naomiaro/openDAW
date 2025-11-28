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
var _ModularDeviceBoxAdapter_context, _ModularDeviceBoxAdapter_box;
import { panic } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { Devices } from "../../DeviceAdapter";
import { ModularAdapter } from "../../modular/modular";
import { DeviceInterfaceKnobAdapter } from "../../modular/user-interface";
export class ModularDeviceBoxAdapter {
    constructor(context, box) {
        this.type = "audio-effect";
        this.accepts = "audio";
        _ModularDeviceBoxAdapter_context.set(this, void 0);
        _ModularDeviceBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _ModularDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ModularDeviceBoxAdapter_box, box, "f");
    }
    get box() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").host; }
    parameterAt(_fieldIndices) { return panic("Not yet implemented"); }
    deviceHost() {
        return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    modular() {
        return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").modularSetup.targetVertex.unwrap("No Modular found").box, ModularAdapter);
    }
    elements() {
        return __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_box, "f").userInterface.elements.pointerHub.filter(Pointers.DeviceUserInterface)
            .map(pointer => __classPrivateFieldGet(this, _ModularDeviceBoxAdapter_context, "f").boxAdapters.adapterFor(pointer.box, DeviceInterfaceKnobAdapter));
    }
    terminate() { }
}
_ModularDeviceBoxAdapter_context = new WeakMap(), _ModularDeviceBoxAdapter_box = new WeakMap();
