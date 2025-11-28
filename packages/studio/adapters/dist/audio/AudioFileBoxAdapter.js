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
var _AudioFileBoxAdapter_context, _AudioFileBoxAdapter_box;
export class AudioFileBoxAdapter {
    constructor(context, box) {
        _AudioFileBoxAdapter_context.set(this, void 0);
        _AudioFileBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _AudioFileBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AudioFileBoxAdapter_box, box, "f");
    }
    get box() { return __classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f").address; }
    get startInSeconds() { return __classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f").startInSeconds.getValue(); }
    get endInSeconds() { return __classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f").endInSeconds.getValue(); }
    get data() { return this.getOrCreateLoader().data; }
    get peaks() { return this.getOrCreateLoader().peaks; }
    getOrCreateLoader() {
        return __classPrivateFieldGet(this, _AudioFileBoxAdapter_context, "f").sampleManager.getOrCreate(__classPrivateFieldGet(this, _AudioFileBoxAdapter_box, "f").address.uuid);
    }
    terminate() { }
}
_AudioFileBoxAdapter_context = new WeakMap(), _AudioFileBoxAdapter_box = new WeakMap();
