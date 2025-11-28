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
var _ModuleConnectorAdapter_boxAdapters, _ModuleConnectorAdapter_field, _ModuleConnectorAdapter_direction, _ModuleConnectorAdapter_name;
import { Pointers } from "@opendaw/studio-enums";
import { Arrays } from "@opendaw/lib-std";
import { ModuleConnectionAdapter } from "./connection";
export var Direction;
(function (Direction) {
    Direction["Input"] = "input";
    Direction["Output"] = "output";
})(Direction || (Direction = {}));
export class ModuleConnectorAdapter {
    static create(boxAdapters, field, direction, name) {
        return new ModuleConnectorAdapter(boxAdapters, field, direction, name ?? field.fieldName);
    }
    constructor(boxAdapters, field, direction, name) {
        _ModuleConnectorAdapter_boxAdapters.set(this, void 0);
        _ModuleConnectorAdapter_field.set(this, void 0);
        _ModuleConnectorAdapter_direction.set(this, void 0);
        _ModuleConnectorAdapter_name.set(this, void 0);
        __classPrivateFieldSet(this, _ModuleConnectorAdapter_boxAdapters, boxAdapters, "f");
        __classPrivateFieldSet(this, _ModuleConnectorAdapter_field, field, "f");
        __classPrivateFieldSet(this, _ModuleConnectorAdapter_direction, direction, "f");
        __classPrivateFieldSet(this, _ModuleConnectorAdapter_name, name, "f");
    }
    matches(other) {
        return this.direction !== other.direction && this.field.pointerRules.accepts
            .some(accepts => other.field.pointerRules.accepts
            .some(type => type === accepts));
    }
    get connections() {
        if (__classPrivateFieldGet(this, _ModuleConnectorAdapter_field, "f").pointerHub.isEmpty()) {
            return Arrays.empty();
        }
        return __classPrivateFieldGet(this, _ModuleConnectorAdapter_field, "f").pointerHub.filter(Pointers.VoltageConnection)
            .map(({ box }) => __classPrivateFieldGet(this, _ModuleConnectorAdapter_boxAdapters, "f").adapterFor(box, ModuleConnectionAdapter));
    }
    get field() { return __classPrivateFieldGet(this, _ModuleConnectorAdapter_field, "f"); }
    get address() { return __classPrivateFieldGet(this, _ModuleConnectorAdapter_field, "f").address; }
    get direction() { return __classPrivateFieldGet(this, _ModuleConnectorAdapter_direction, "f"); }
    get name() { return __classPrivateFieldGet(this, _ModuleConnectorAdapter_name, "f"); }
    toString() {
        return `{ModuleConnectorAdapter address: ${__classPrivateFieldGet(this, _ModuleConnectorAdapter_field, "f").address.toString()}, direction: ${__classPrivateFieldGet(this, _ModuleConnectorAdapter_direction, "f")}}`;
    }
}
_ModuleConnectorAdapter_boxAdapters = new WeakMap(), _ModuleConnectorAdapter_field = new WeakMap(), _ModuleConnectorAdapter_direction = new WeakMap(), _ModuleConnectorAdapter_name = new WeakMap();
