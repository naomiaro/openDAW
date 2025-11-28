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
var _TimelineBoxAdapter_box, _TimelineBoxAdapter_markerTrack;
import { MarkerTrackAdapter } from "./MarkerTrackAdapter";
import { PPQN } from "@opendaw/lib-dsp";
export class TimelineBoxAdapter {
    constructor(context, box) {
        _TimelineBoxAdapter_box.set(this, void 0);
        _TimelineBoxAdapter_markerTrack.set(this, void 0);
        __classPrivateFieldSet(this, _TimelineBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _TimelineBoxAdapter_markerTrack, new MarkerTrackAdapter(context, __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").markerTrack), "f");
    }
    terminate() { }
    get box() { return __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").address; }
    get markerTrack() { return __classPrivateFieldGet(this, _TimelineBoxAdapter_markerTrack, "f"); }
    get signature() {
        return [
            __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").signature.nominator.getValue(), __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").signature.denominator.getValue()
        ];
    }
    get signatureDuration() {
        const { nominator, denominator } = __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").signature;
        return PPQN.fromSignature(nominator.getValue(), denominator.getValue());
    }
    catchupAndSubscribeSignature(observer) {
        observer(this.signature);
        return __classPrivateFieldGet(this, _TimelineBoxAdapter_box, "f").signature.subscribe(() => observer(this.signature));
    }
}
_TimelineBoxAdapter_box = new WeakMap(), _TimelineBoxAdapter_markerTrack = new WeakMap();
