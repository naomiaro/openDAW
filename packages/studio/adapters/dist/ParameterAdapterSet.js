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
var _ParameterAdapterSet_context, _ParameterAdapterSet_parameters;
import { Address } from "@opendaw/lib-box";
import { assert } from "@opendaw/lib-std";
import { AutomatableParameterFieldAdapter } from "./AutomatableParameterFieldAdapter";
export class ParameterAdapterSet {
    constructor(context) {
        _ParameterAdapterSet_context.set(this, void 0);
        _ParameterAdapterSet_parameters.set(this, void 0);
        __classPrivateFieldSet(this, _ParameterAdapterSet_context, context, "f");
        __classPrivateFieldSet(this, _ParameterAdapterSet_parameters, Address.newSet(adapter => adapter.address), "f");
    }
    terminate() {
        __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").forEach(parameter => parameter.terminate());
        __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").clear();
    }
    parameters() { return __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").values(); }
    parameterAt(address) {
        return __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").getOrThrow(address, () => new Error(`No ParameterAdapter found at [${address.toString()}]`));
    }
    createParameter(field, valueMapping, stringMapping, name, anchor) {
        const adapter = new AutomatableParameterFieldAdapter(__classPrivateFieldGet(this, _ParameterAdapterSet_context, "f"), field, valueMapping, stringMapping, name, anchor);
        const added = __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").add(adapter);
        assert(added, `Could not add adapter for ${field}`);
        return adapter;
    }
    removeParameter(address) {
        return __classPrivateFieldGet(this, _ParameterAdapterSet_parameters, "f").removeByKey(address);
    }
}
_ParameterAdapterSet_context = new WeakMap(), _ParameterAdapterSet_parameters = new WeakMap();
