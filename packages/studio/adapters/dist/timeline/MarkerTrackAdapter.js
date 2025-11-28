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
var _MarkerTrackAdapter_context, _MarkerTrackAdapter_object, _MarkerTrackAdapter_adapters, _MarkerTrackAdapter_events, _MarkerTrackAdapter_subscription;
import { assert, Notifier, UUID } from "@opendaw/lib-std";
import { EventCollection } from "@opendaw/lib-dsp";
import { MarkerBoxAdapter } from "./MarkerBoxAdapter";
import { MarkerBox } from "@opendaw/studio-boxes";
export class MarkerTrackAdapter {
    constructor(context, object) {
        _MarkerTrackAdapter_context.set(this, void 0);
        _MarkerTrackAdapter_object.set(this, void 0);
        _MarkerTrackAdapter_adapters.set(this, void 0);
        _MarkerTrackAdapter_events.set(this, void 0);
        _MarkerTrackAdapter_subscription.set(this, void 0);
        __classPrivateFieldSet(this, _MarkerTrackAdapter_context, context, "f");
        __classPrivateFieldSet(this, _MarkerTrackAdapter_object, object, "f");
        this.changeNotifier = new Notifier();
        __classPrivateFieldSet(this, _MarkerTrackAdapter_adapters, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _MarkerTrackAdapter_events, EventCollection.create(MarkerBoxAdapter.Comparator), "f");
        __classPrivateFieldSet(this, _MarkerTrackAdapter_subscription, __classPrivateFieldGet(this, _MarkerTrackAdapter_object, "f").markers.pointerHub.catchupAndSubscribe({
            onAdded: ({ box }) => {
                if (box instanceof MarkerBox) {
                    const adapter = __classPrivateFieldGet(this, _MarkerTrackAdapter_context, "f").boxAdapters.adapterFor(box, MarkerBoxAdapter);
                    const added = __classPrivateFieldGet(this, _MarkerTrackAdapter_adapters, "f").add(adapter);
                    assert(added, "Could not add adapter");
                    __classPrivateFieldGet(this, _MarkerTrackAdapter_events, "f").add(adapter);
                    this.dispatchChange();
                }
            },
            onRemoved: ({ box: { address: { uuid } } }) => {
                __classPrivateFieldGet(this, _MarkerTrackAdapter_events, "f").remove(__classPrivateFieldGet(this, _MarkerTrackAdapter_adapters, "f").removeByKey(uuid));
                this.dispatchChange();
            }
        }), "f");
    }
    subscribe(observer) { return this.changeNotifier.subscribe(observer); }
    get context() { return __classPrivateFieldGet(this, _MarkerTrackAdapter_context, "f"); }
    get enabled() { return __classPrivateFieldGet(this, _MarkerTrackAdapter_object, "f").enabled.getValue(); }
    get events() { return __classPrivateFieldGet(this, _MarkerTrackAdapter_events, "f"); }
    get object() { return __classPrivateFieldGet(this, _MarkerTrackAdapter_object, "f"); }
    dispatchChange() { this.changeNotifier.notify(); }
    onSortingChanged() {
        __classPrivateFieldGet(this, _MarkerTrackAdapter_events, "f").onIndexingChanged();
        this.dispatchChange();
    }
    terminate() { __classPrivateFieldGet(this, _MarkerTrackAdapter_subscription, "f").terminate(); }
}
_MarkerTrackAdapter_context = new WeakMap(), _MarkerTrackAdapter_object = new WeakMap(), _MarkerTrackAdapter_adapters = new WeakMap(), _MarkerTrackAdapter_events = new WeakMap(), _MarkerTrackAdapter_subscription = new WeakMap();
