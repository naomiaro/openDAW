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
var _PianoModeAdapter_object, _PianoModeAdapter_keyboard, _PianoModeAdapter_timeRangeInQuarters, _PianoModeAdapter_noteScale, _PianoModeAdapter_noteLabels, _PianoModeAdapter_transpose;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { FieldAdapter } from "./FieldAdapter";
import { Propagation } from "@opendaw/lib-box";
export class PianoModeAdapter {
    constructor(object) {
        _PianoModeAdapter_object.set(this, void 0);
        _PianoModeAdapter_keyboard.set(this, void 0);
        _PianoModeAdapter_timeRangeInQuarters.set(this, void 0);
        _PianoModeAdapter_noteScale.set(this, void 0);
        _PianoModeAdapter_noteLabels.set(this, void 0);
        _PianoModeAdapter_transpose.set(this, void 0);
        __classPrivateFieldSet(this, _PianoModeAdapter_object, object, "f");
        __classPrivateFieldSet(this, _PianoModeAdapter_keyboard, new FieldAdapter(__classPrivateFieldGet(this, _PianoModeAdapter_object, "f").keyboard, ValueMapping.values([88, 76, 61, 49]), StringMapping.numeric({ fractionDigits: 1 }), "Keyboard Type"), "f");
        __classPrivateFieldSet(this, _PianoModeAdapter_timeRangeInQuarters, new FieldAdapter(__classPrivateFieldGet(this, _PianoModeAdapter_object, "f").timeRangeInQuarters, ValueMapping.exponential(1, 64), StringMapping.numeric({ fractionDigits: 1 }), "Time-Range"), "f");
        __classPrivateFieldSet(this, _PianoModeAdapter_noteScale, new FieldAdapter(__classPrivateFieldGet(this, _PianoModeAdapter_object, "f").noteScale, ValueMapping.exponential(0.5, 2.0), StringMapping.numeric({ fractionDigits: 1 }), "Note Scale"), "f");
        __classPrivateFieldSet(this, _PianoModeAdapter_noteLabels, new FieldAdapter(__classPrivateFieldGet(this, _PianoModeAdapter_object, "f").noteLabels, ValueMapping.bool, StringMapping.bool, "Note Labels"), "f");
        __classPrivateFieldSet(this, _PianoModeAdapter_transpose, new FieldAdapter(__classPrivateFieldGet(this, _PianoModeAdapter_object, "f").transpose, ValueMapping.linearInteger(-48, 48), StringMapping.numeric({ fractionDigits: 0 }), "Transpose"), "f");
    }
    subscribe(observer) {
        return __classPrivateFieldGet(this, _PianoModeAdapter_object, "f").box.subscribe(Propagation.Children, () => observer(this));
    }
    get object() { return __classPrivateFieldGet(this, _PianoModeAdapter_object, "f"); }
    get keyboard() { return __classPrivateFieldGet(this, _PianoModeAdapter_keyboard, "f"); }
    get timeRangeInQuarters() { return __classPrivateFieldGet(this, _PianoModeAdapter_timeRangeInQuarters, "f"); }
    get noteScale() { return __classPrivateFieldGet(this, _PianoModeAdapter_noteScale, "f"); }
    get noteLabels() { return __classPrivateFieldGet(this, _PianoModeAdapter_noteLabels, "f"); }
    get transpose() { return __classPrivateFieldGet(this, _PianoModeAdapter_transpose, "f"); }
}
_PianoModeAdapter_object = new WeakMap(), _PianoModeAdapter_keyboard = new WeakMap(), _PianoModeAdapter_timeRangeInQuarters = new WeakMap(), _PianoModeAdapter_noteScale = new WeakMap(), _PianoModeAdapter_noteLabels = new WeakMap(), _PianoModeAdapter_transpose = new WeakMap();
