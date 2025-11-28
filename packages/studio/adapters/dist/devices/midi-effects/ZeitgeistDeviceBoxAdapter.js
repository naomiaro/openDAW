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
var _ZeitgeistDeviceBoxAdapter_context, _ZeitgeistDeviceBoxAdapter_box;
import { Devices } from "../../DeviceAdapter";
import { GrooveAdapter } from "../../grooves/GrooveBoxAdapter";
export class ZeitgeistDeviceBoxAdapter {
    constructor(context, box) {
        this.type = "midi-effect";
        this.accepts = "midi";
        _ZeitgeistDeviceBoxAdapter_context.set(this, void 0);
        _ZeitgeistDeviceBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _ZeitgeistDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ZeitgeistDeviceBoxAdapter_box, box, "f");
        this.groove(); // force creation of GrooveAdapter
    }
    get box() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    groove() {
        return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").groove.targetVertex.unwrap("no groove").box, GrooveAdapter.checkType);
    }
    catchupAndSubscribeGroove(observer) {
        return __classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_box, "f").groove.catchupAndSubscribe(pointer => observer(__classPrivateFieldGet(this, _ZeitgeistDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(pointer.targetVertex.unwrap("No groove found").box, GrooveAdapter.checkType)));
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { }
}
_ZeitgeistDeviceBoxAdapter_context = new WeakMap(), _ZeitgeistDeviceBoxAdapter_box = new WeakMap();
