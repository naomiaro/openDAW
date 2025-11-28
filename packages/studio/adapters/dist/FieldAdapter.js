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
var _FieldAdapter_field, _FieldAdapter_valueMapping, _FieldAdapter_stringMapping, _FieldAdapter_name, _FieldAdapter_anchor, _FieldAdapter_terminator, _FieldAdapter_valueChangeNotifier, _FieldAdapter_trackBoxAdapter;
import { clamp, Notifier, Option, Terminator } from "@opendaw/lib-std";
export class FieldAdapter {
    constructor(field, valueMapping, stringMapping, name, anchor) {
        _FieldAdapter_field.set(this, void 0);
        _FieldAdapter_valueMapping.set(this, void 0);
        _FieldAdapter_stringMapping.set(this, void 0);
        _FieldAdapter_name.set(this, void 0);
        _FieldAdapter_anchor.set(this, void 0);
        _FieldAdapter_terminator.set(this, new Terminator());
        _FieldAdapter_valueChangeNotifier.set(this, void 0);
        _FieldAdapter_trackBoxAdapter.set(this, Option.None);
        __classPrivateFieldSet(this, _FieldAdapter_field, field, "f");
        __classPrivateFieldSet(this, _FieldAdapter_valueMapping, valueMapping, "f");
        __classPrivateFieldSet(this, _FieldAdapter_stringMapping, stringMapping, "f");
        __classPrivateFieldSet(this, _FieldAdapter_name, name, "f");
        __classPrivateFieldSet(this, _FieldAdapter_anchor, anchor ?? 0.0, "f");
        __classPrivateFieldSet(this, _FieldAdapter_valueChangeNotifier, __classPrivateFieldGet(this, _FieldAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _FieldAdapter_terminator, "f").own(__classPrivateFieldGet(this, _FieldAdapter_field, "f").subscribe(() => __classPrivateFieldGet(this, _FieldAdapter_valueChangeNotifier, "f").notify(this)));
        /*
        For debugging: It's not live because floating errors expose false positives,
            and I am too lazy to implement this in the mappings itself.
        */
        if (field.getValue() !== valueMapping.clamp(field.getValue())) {
            console.warn(`${name} (${field.getValue()}) is out of bounds`, valueMapping);
        }
    }
    get field() { return __classPrivateFieldGet(this, _FieldAdapter_field, "f"); }
    get valueMapping() { return __classPrivateFieldGet(this, _FieldAdapter_valueMapping, "f"); }
    get stringMapping() { return __classPrivateFieldGet(this, _FieldAdapter_stringMapping, "f"); }
    get name() { return __classPrivateFieldGet(this, _FieldAdapter_name, "f"); }
    get anchor() { return __classPrivateFieldGet(this, _FieldAdapter_anchor, "f"); }
    get type() { return __classPrivateFieldGet(this, _FieldAdapter_field, "f").type; }
    get address() { return __classPrivateFieldGet(this, _FieldAdapter_field, "f").address; }
    get track() { return __classPrivateFieldGet(this, _FieldAdapter_trackBoxAdapter, "f"); }
    subscribe(observer) { return __classPrivateFieldGet(this, _FieldAdapter_valueChangeNotifier, "f").subscribe(observer); }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    getValue() { return __classPrivateFieldGet(this, _FieldAdapter_field, "f").getValue(); }
    setValue(value) { __classPrivateFieldGet(this, _FieldAdapter_field, "f").setValue(__classPrivateFieldGet(this, _FieldAdapter_valueMapping, "f").clamp(value)); }
    setUnitValue(value) { this.setValue(__classPrivateFieldGet(this, _FieldAdapter_valueMapping, "f").y(value)); }
    getUnitValue() { return __classPrivateFieldGet(this, _FieldAdapter_valueMapping, "f").x(this.getValue()); }
    getPrintValue() { return __classPrivateFieldGet(this, _FieldAdapter_stringMapping, "f").x(this.getValue()); }
    setPrintValue(text) {
        const result = __classPrivateFieldGet(this, _FieldAdapter_stringMapping, "f").y(text);
        if (result.type === "unitValue") {
            this.setUnitValue(clamp(result.value, 0.0, 1.0));
        }
        else if (result.type === "explicit") {
            this.setValue(this.valueMapping.clamp(result.value));
        }
        else {
            console.debug(`Unknown text input: '${result.value}'`);
        }
    }
    reset() { this.setValue(__classPrivateFieldGet(this, _FieldAdapter_valueMapping, "f").clamp(__classPrivateFieldGet(this, _FieldAdapter_field, "f").initValue)); }
    terminate() { __classPrivateFieldGet(this, _FieldAdapter_terminator, "f").terminate(); }
}
_FieldAdapter_field = new WeakMap(), _FieldAdapter_valueMapping = new WeakMap(), _FieldAdapter_stringMapping = new WeakMap(), _FieldAdapter_name = new WeakMap(), _FieldAdapter_anchor = new WeakMap(), _FieldAdapter_terminator = new WeakMap(), _FieldAdapter_valueChangeNotifier = new WeakMap(), _FieldAdapter_trackBoxAdapter = new WeakMap();
