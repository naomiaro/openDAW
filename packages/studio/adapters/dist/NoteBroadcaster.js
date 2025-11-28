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
var _NoteBroadcaster_terminator, _NoteBroadcaster_broadcaster, _NoteBroadcaster_address, _NoteBroadcaster_bits;
import { Bits, EmptyExec, Terminator } from "@opendaw/lib-std";
export class NoteBroadcaster {
    constructor(broadcaster, address) {
        _NoteBroadcaster_terminator.set(this, new Terminator());
        _NoteBroadcaster_broadcaster.set(this, void 0);
        _NoteBroadcaster_address.set(this, void 0);
        _NoteBroadcaster_bits.set(this, void 0);
        __classPrivateFieldSet(this, _NoteBroadcaster_broadcaster, broadcaster, "f");
        __classPrivateFieldSet(this, _NoteBroadcaster_address, address, "f");
        __classPrivateFieldSet(this, _NoteBroadcaster_bits, new Bits(128), "f");
        __classPrivateFieldGet(this, _NoteBroadcaster_terminator, "f").own(__classPrivateFieldGet(this, _NoteBroadcaster_broadcaster, "f").broadcastIntegers(__classPrivateFieldGet(this, _NoteBroadcaster_address, "f"), new Int32Array(__classPrivateFieldGet(this, _NoteBroadcaster_bits, "f").buffer), EmptyExec));
    }
    noteOn(note) {
        if (note >= 0 && note < 128) {
            __classPrivateFieldGet(this, _NoteBroadcaster_bits, "f").setBit(note, true);
        }
    }
    noteOff(note) {
        if (note >= 0 && note < 128) {
            __classPrivateFieldGet(this, _NoteBroadcaster_bits, "f").setBit(note, false);
        }
    }
    reset() { }
    clear() { __classPrivateFieldGet(this, _NoteBroadcaster_bits, "f").clear(); }
    terminate() { __classPrivateFieldGet(this, _NoteBroadcaster_terminator, "f").terminate(); }
    toString() { return `{${this.constructor.name}}`; }
}
_NoteBroadcaster_terminator = new WeakMap(), _NoteBroadcaster_broadcaster = new WeakMap(), _NoteBroadcaster_address = new WeakMap(), _NoteBroadcaster_bits = new WeakMap();
