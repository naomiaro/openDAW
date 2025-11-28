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
var _AbstractModuleAdapter_context, _AbstractModuleAdapter_box, _AbstractModuleAdapter_terminator, _AbstractModuleAdapter_attributes, _AbstractModuleAdapter_parameters, _AbstractModuleAdapter_selected;
import { Terminator } from "@opendaw/lib-std";
import { ParameterAdapterSet } from "../ParameterAdapterSet";
import { ModularAdapter } from "./modular";
export class AbstractModuleAdapter {
    constructor(context, box) {
        _AbstractModuleAdapter_context.set(this, void 0);
        _AbstractModuleAdapter_box.set(this, void 0);
        _AbstractModuleAdapter_terminator.set(this, void 0);
        _AbstractModuleAdapter_attributes.set(this, void 0);
        _AbstractModuleAdapter_parameters.set(this, void 0);
        _AbstractModuleAdapter_selected.set(this, false);
        __classPrivateFieldSet(this, _AbstractModuleAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AbstractModuleAdapter_box, box, "f");
        __classPrivateFieldSet(this, _AbstractModuleAdapter_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _AbstractModuleAdapter_attributes, box.attributes, "f");
        __classPrivateFieldSet(this, _AbstractModuleAdapter_parameters, __classPrivateFieldGet(this, _AbstractModuleAdapter_terminator, "f").own(new ParameterAdapterSet(context)), "f");
    }
    get inputs() {
        throw new Error("Method not implemented.");
    }
    get outputs() {
        throw new Error("Method not implemented.");
    }
    own(terminable) { return __classPrivateFieldGet(this, _AbstractModuleAdapter_terminator, "f").own(terminable); }
    ownAll(...terminables) { __classPrivateFieldGet(this, _AbstractModuleAdapter_terminator, "f").ownAll(...terminables); }
    onSelected() { __classPrivateFieldSet(this, _AbstractModuleAdapter_selected, true, "f"); }
    onDeselected() { __classPrivateFieldSet(this, _AbstractModuleAdapter_selected, false, "f"); }
    isSelected() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_selected, "f"); }
    get box() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_box, "f"); }
    get attributes() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_attributes, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_box, "f").address; }
    get parameters() { return __classPrivateFieldGet(this, _AbstractModuleAdapter_parameters, "f"); }
    get modular() {
        return __classPrivateFieldGet(this, _AbstractModuleAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _AbstractModuleAdapter_box, "f").attributes.collection.targetVertex.unwrap().box, ModularAdapter);
    }
    terminate() { __classPrivateFieldGet(this, _AbstractModuleAdapter_terminator, "f").terminate(); }
}
_AbstractModuleAdapter_context = new WeakMap(), _AbstractModuleAdapter_box = new WeakMap(), _AbstractModuleAdapter_terminator = new WeakMap(), _AbstractModuleAdapter_attributes = new WeakMap(), _AbstractModuleAdapter_parameters = new WeakMap(), _AbstractModuleAdapter_selected = new WeakMap();
