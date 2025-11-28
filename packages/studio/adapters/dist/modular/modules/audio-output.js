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
var _ModularAudioOutputAdapter_voltageInput;
import { Arrays } from "@opendaw/lib-std";
import { AbstractModuleAdapter } from "../abstract";
import { Direction, ModuleConnectorAdapter } from "../connector";
export class ModularAudioOutputAdapter extends AbstractModuleAdapter {
    constructor(context, box) {
        super(context, box);
        _ModularAudioOutputAdapter_voltageInput.set(this, void 0);
        __classPrivateFieldSet(this, _ModularAudioOutputAdapter_voltageInput, ModuleConnectorAdapter.create(context.boxAdapters, box.input, Direction.Input, "Input"), "f");
    }
    get voltageInput() { return __classPrivateFieldGet(this, _ModularAudioOutputAdapter_voltageInput, "f"); }
    get inputs() {
        return [__classPrivateFieldGet(this, _ModularAudioOutputAdapter_voltageInput, "f")];
    }
    get outputs() {
        return Arrays.empty();
    }
}
_ModularAudioOutputAdapter_voltageInput = new WeakMap();
