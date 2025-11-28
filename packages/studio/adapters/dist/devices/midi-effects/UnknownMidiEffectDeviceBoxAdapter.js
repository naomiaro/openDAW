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
var _UnknownMidiEffectDeviceBoxAdapter_context, _UnknownMidiEffectDeviceBoxAdapter_box;
import { Devices } from "../../DeviceAdapter";
export class UnknownMidiEffectDeviceBoxAdapter {
    constructor(context, box) {
        this.type = "midi-effect";
        this.accepts = "midi";
        _UnknownMidiEffectDeviceBoxAdapter_context.set(this, void 0);
        _UnknownMidiEffectDeviceBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _UnknownMidiEffectDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _UnknownMidiEffectDeviceBoxAdapter_box, box, "f");
    }
    get box() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").host; }
    get commentField() { return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").comment; }
    deviceHost() {
        return __classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _UnknownMidiEffectDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { }
}
_UnknownMidiEffectDeviceBoxAdapter_context = new WeakMap(), _UnknownMidiEffectDeviceBoxAdapter_box = new WeakMap();
