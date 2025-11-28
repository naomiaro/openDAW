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
var _ModuleDelayAdapter_parameterTime, _ModuleDelayAdapter_voltageInput, _ModuleDelayAdapter_voltageOutput;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { AbstractModuleAdapter } from "../abstract";
import { Direction, ModuleConnectorAdapter } from "../connector";
export class ModuleDelayAdapter extends AbstractModuleAdapter {
    constructor(context, box) {
        super(context, box);
        _ModuleDelayAdapter_parameterTime.set(this, void 0);
        _ModuleDelayAdapter_voltageInput.set(this, void 0);
        _ModuleDelayAdapter_voltageOutput.set(this, void 0);
        __classPrivateFieldSet(this, _ModuleDelayAdapter_parameterTime, this.parameters.createParameter(box.time, ValueMapping.exponential(1.0, 10000.0), StringMapping.numeric({ unit: "ms" }), "Time"), "f");
        __classPrivateFieldSet(this, _ModuleDelayAdapter_voltageInput, ModuleConnectorAdapter.create(context.boxAdapters, box.voltageInput, Direction.Input, "Input"), "f");
        __classPrivateFieldSet(this, _ModuleDelayAdapter_voltageOutput, ModuleConnectorAdapter.create(context.boxAdapters, box.voltageOutput, Direction.Output, "Output"), "f");
    }
    get parameterTime() { return __classPrivateFieldGet(this, _ModuleDelayAdapter_parameterTime, "f"); }
    get voltageInput() { return __classPrivateFieldGet(this, _ModuleDelayAdapter_voltageInput, "f"); }
    get voltageOutput() { return __classPrivateFieldGet(this, _ModuleDelayAdapter_voltageOutput, "f"); }
    get inputs() {
        return [__classPrivateFieldGet(this, _ModuleDelayAdapter_voltageInput, "f")];
    }
    get outputs() {
        return [__classPrivateFieldGet(this, _ModuleDelayAdapter_voltageOutput, "f")];
    }
}
_ModuleDelayAdapter_parameterTime = new WeakMap(), _ModuleDelayAdapter_voltageInput = new WeakMap(), _ModuleDelayAdapter_voltageOutput = new WeakMap();
