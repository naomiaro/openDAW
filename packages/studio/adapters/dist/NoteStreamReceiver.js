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
var _NoteStreamReceiver_terminator, _NoteStreamReceiver_receiver, _NoteStreamReceiver_address, _NoteStreamReceiver_bits, _NoteStreamReceiver_notifier;
import { Bits, Notifier, Terminator } from "@opendaw/lib-std";
export class NoteStreamReceiver {
    constructor(receiver, address) {
        _NoteStreamReceiver_terminator.set(this, new Terminator());
        _NoteStreamReceiver_receiver.set(this, void 0);
        _NoteStreamReceiver_address.set(this, void 0);
        _NoteStreamReceiver_bits.set(this, void 0);
        _NoteStreamReceiver_notifier.set(this, void 0);
        __classPrivateFieldSet(this, _NoteStreamReceiver_receiver, receiver, "f");
        __classPrivateFieldSet(this, _NoteStreamReceiver_address, address, "f");
        __classPrivateFieldSet(this, _NoteStreamReceiver_bits, new Bits(128), "f");
        __classPrivateFieldSet(this, _NoteStreamReceiver_notifier, new Notifier(), "f");
        __classPrivateFieldGet(this, _NoteStreamReceiver_terminator, "f").own(__classPrivateFieldGet(this, _NoteStreamReceiver_receiver, "f").subscribeIntegers(__classPrivateFieldGet(this, _NoteStreamReceiver_address, "f"), (array) => {
            if (__classPrivateFieldGet(this, _NoteStreamReceiver_bits, "f").replace(array.buffer)) {
                __classPrivateFieldGet(this, _NoteStreamReceiver_notifier, "f").notify(this);
            }
        }));
    }
    isNoteOn(note) { return __classPrivateFieldGet(this, _NoteStreamReceiver_bits, "f").getBit(note); }
    isAnyNoteOn() { return __classPrivateFieldGet(this, _NoteStreamReceiver_bits, "f").nonEmpty(); }
    subscribe(observer) { return __classPrivateFieldGet(this, _NoteStreamReceiver_notifier, "f").subscribe(observer); }
    terminate() { __classPrivateFieldGet(this, _NoteStreamReceiver_terminator, "f").terminate(); }
}
_NoteStreamReceiver_terminator = new WeakMap(), _NoteStreamReceiver_receiver = new WeakMap(), _NoteStreamReceiver_address = new WeakMap(), _NoteStreamReceiver_bits = new WeakMap(), _NoteStreamReceiver_notifier = new WeakMap();
