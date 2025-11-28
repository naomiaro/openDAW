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
var _AudioBusBoxAdapter_context, _AudioBusBoxAdapter_box;
import { Propagation } from "@opendaw/lib-box";
import { Devices } from "../DeviceAdapter";
import { IconSymbol } from "@opendaw/studio-enums";
export class AudioBusBoxAdapter {
    constructor(context, box) {
        this.type = "bus";
        this.accepts = "audio";
        _AudioBusBoxAdapter_context.set(this, void 0);
        _AudioBusBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _AudioBusBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AudioBusBoxAdapter_box, box, "f");
    }
    catchupAndSubscribe(observer) {
        observer(this);
        return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").subscribe(Propagation.Children, () => observer(this));
    }
    get uuid() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").address; }
    get box() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f"); }
    get enabledField() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").minimized; }
    get iconField() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").icon; }
    get labelField() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").label; }
    get colorField() { return __classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").color; }
    get iconSymbol() { return IconSymbol.fromName(this.iconField.getValue() ?? "audio-bus"); }
    deviceHost() {
        return __classPrivateFieldGet(this, _AudioBusBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _AudioBusBoxAdapter_box, "f").output.targetVertex.unwrap("No AudioUnitBox found").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { }
    toString() { return `{${this.constructor.name}}`; }
}
_AudioBusBoxAdapter_context = new WeakMap(), _AudioBusBoxAdapter_box = new WeakMap();
