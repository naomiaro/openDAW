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
var _ModuleMultiplierAdapter_voltageInputX, _ModuleMultiplierAdapter_voltageInputY, _ModuleMultiplierAdapter_voltageOutput;
import { AbstractModuleAdapter } from "../abstract";
import { Direction, ModuleConnectorAdapter } from "../connector";
export class ModuleMultiplierAdapter extends AbstractModuleAdapter {
    constructor(context, box) {
        super(context, box);
        _ModuleMultiplierAdapter_voltageInputX.set(this, void 0);
        _ModuleMultiplierAdapter_voltageInputY.set(this, void 0);
        _ModuleMultiplierAdapter_voltageOutput.set(this, void 0);
        __classPrivateFieldSet(this, _ModuleMultiplierAdapter_voltageInputX, ModuleConnectorAdapter.create(context.boxAdapters, box.voltageInputX, Direction.Input, "X"), "f");
        __classPrivateFieldSet(this, _ModuleMultiplierAdapter_voltageInputY, ModuleConnectorAdapter.create(context.boxAdapters, box.voltageInputY, Direction.Input, "Y"), "f");
        __classPrivateFieldSet(this, _ModuleMultiplierAdapter_voltageOutput, ModuleConnectorAdapter.create(context.boxAdapters, box.voltageOutput, Direction.Output, "Result"), "f");
    }
    get inputs() {
        return [__classPrivateFieldGet(this, _ModuleMultiplierAdapter_voltageInputX, "f"), __classPrivateFieldGet(this, _ModuleMultiplierAdapter_voltageInputY, "f")];
    }
    get outputs() {
        return [__classPrivateFieldGet(this, _ModuleMultiplierAdapter_voltageOutput, "f")];
    }
}
_ModuleMultiplierAdapter_voltageInputX = new WeakMap(), _ModuleMultiplierAdapter_voltageInputY = new WeakMap(), _ModuleMultiplierAdapter_voltageOutput = new WeakMap();
