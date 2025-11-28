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
var _ModularAudioInputAdapter_voltageOutput;
import { Arrays } from "@opendaw/lib-std";
import { AbstractModuleAdapter } from "../abstract";
import { Direction, ModuleConnectorAdapter } from "../connector";
export class ModularAudioInputAdapter extends AbstractModuleAdapter {
    constructor(context, box) {
        super(context, box);
        _ModularAudioInputAdapter_voltageOutput.set(this, void 0);
        __classPrivateFieldSet(this, _ModularAudioInputAdapter_voltageOutput, ModuleConnectorAdapter.create(context.boxAdapters, box.output, Direction.Output, "Output"), "f");
    }
    get voltageOutput() { return __classPrivateFieldGet(this, _ModularAudioInputAdapter_voltageOutput, "f"); }
    get inputs() {
        return Arrays.empty();
    }
    get outputs() {
        return [__classPrivateFieldGet(this, _ModularAudioInputAdapter_voltageOutput, "f")];
    }
}
_ModularAudioInputAdapter_voltageOutput = new WeakMap();
