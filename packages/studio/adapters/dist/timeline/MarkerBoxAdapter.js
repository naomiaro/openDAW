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
var _MarkerBoxAdapter_terminator, _MarkerBoxAdapter_context, _MarkerBoxAdapter_box;
import { Terminator, UUID } from "@opendaw/lib-std";
import { Propagation } from "@opendaw/lib-box";
import { TimelineBoxAdapter } from "./TimelineBoxAdapter";
export class MarkerBoxAdapter {
    constructor(context, box) {
        this.type = "marker-event";
        _MarkerBoxAdapter_terminator.set(this, new Terminator());
        _MarkerBoxAdapter_context.set(this, void 0);
        _MarkerBoxAdapter_box.set(this, void 0);
        __classPrivateFieldSet(this, _MarkerBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _MarkerBoxAdapter_box, box, "f");
        __classPrivateFieldGet(this, _MarkerBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.trackAdapter.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const track = this.trackAdapter.unwrap();
                if (__classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").position.address.equals(update.address)) {
                    track.onSortingChanged();
                }
                else {
                    track.dispatchChange();
                }
            }
        }));
    }
    get box() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").position.getValue(); }
    get plays() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").plays.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").hue.getValue(); }
    get label() { return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").label.getValue(); }
    get trackAdapter() {
        return __classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").track.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _MarkerBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TimelineBoxAdapter).markerTrack);
    }
    terminate() { __classPrivateFieldGet(this, _MarkerBoxAdapter_terminator, "f").terminate(); }
    toString() { return `{MarkerBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _MarkerBoxAdapter_box, "f").address.uuid).substring(0, 4)}, plays: ${this.plays}`; }
}
_MarkerBoxAdapter_terminator = new WeakMap(), _MarkerBoxAdapter_context = new WeakMap(), _MarkerBoxAdapter_box = new WeakMap();
MarkerBoxAdapter.Comparator = (a, b) => a.position - b.position;
