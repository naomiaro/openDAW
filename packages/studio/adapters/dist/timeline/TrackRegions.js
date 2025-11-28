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
var _TrackRegions_trackBoxAdapter, _TrackRegions_terminator, _TrackRegions_changeNotifier, _TrackRegions_regionsListeners, _TrackRegions_collection, _TrackRegions_adapters;
import { RegionCollection } from "@opendaw/lib-dsp";
import { assert, Listeners, Notifier, Terminator, UUID } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { RegionAdapters, RegionComparator } from "./RegionBoxAdapter";
export class TrackRegions {
    constructor(adapter, boxAdapters) {
        _TrackRegions_trackBoxAdapter.set(this, void 0);
        _TrackRegions_terminator.set(this, void 0);
        _TrackRegions_changeNotifier.set(this, void 0);
        _TrackRegions_regionsListeners.set(this, void 0);
        _TrackRegions_collection.set(this, void 0);
        _TrackRegions_adapters.set(this, void 0);
        __classPrivateFieldSet(this, _TrackRegions_trackBoxAdapter, adapter, "f");
        __classPrivateFieldSet(this, _TrackRegions_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _TrackRegions_changeNotifier, __classPrivateFieldGet(this, _TrackRegions_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldSet(this, _TrackRegions_regionsListeners, __classPrivateFieldGet(this, _TrackRegions_terminator, "f").own(new Listeners()), "f");
        __classPrivateFieldSet(this, _TrackRegions_collection, RegionCollection.create(RegionComparator), "f");
        __classPrivateFieldSet(this, _TrackRegions_adapters, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldGet(this, _TrackRegions_terminator, "f").ownAll(__classPrivateFieldGet(this, _TrackRegions_trackBoxAdapter, "f").box.regions.pointerHub.catchupAndSubscribe({
            onAdded: ({ box }) => {
                const adapter = RegionAdapters.for(boxAdapters, box);
                const added = __classPrivateFieldGet(this, _TrackRegions_adapters, "f").add(adapter);
                assert(added, `Cannot add ${box}`);
                __classPrivateFieldGet(this, _TrackRegions_collection, "f").add(adapter);
                __classPrivateFieldGet(this, _TrackRegions_regionsListeners, "f").forEach(listener => listener.onAdded(adapter));
                this.dispatchChange();
            },
            onRemoved: ({ box: { address: { uuid } } }) => {
                const adapter = __classPrivateFieldGet(this, _TrackRegions_adapters, "f").removeByKey(uuid);
                __classPrivateFieldGet(this, _TrackRegions_collection, "f").remove(adapter);
                __classPrivateFieldGet(this, _TrackRegions_regionsListeners, "f").forEach(listener => listener.onRemoved(adapter));
                this.dispatchChange();
            }
        }, Pointers.RegionCollection));
    }
    get trackBoxAdapter() { return __classPrivateFieldGet(this, _TrackRegions_trackBoxAdapter, "f"); }
    get collection() { return __classPrivateFieldGet(this, _TrackRegions_collection, "f"); }
    get adapters() { return __classPrivateFieldGet(this, _TrackRegions_adapters, "f"); }
    onIndexingChanged() {
        __classPrivateFieldGet(this, _TrackRegions_collection, "f").onIndexingChanged();
        this.dispatchChange();
    }
    catchupAndSubscribe(listener) {
        this.collection.asArray().forEach(listener.onAdded);
        return __classPrivateFieldGet(this, _TrackRegions_regionsListeners, "f").subscribe(listener);
    }
    subscribeChanges(observer) { return __classPrivateFieldGet(this, _TrackRegions_changeNotifier, "f").subscribe(observer); }
    dispatchChange() { __classPrivateFieldGet(this, _TrackRegions_changeNotifier, "f").notify(); }
    terminate() { __classPrivateFieldGet(this, _TrackRegions_terminator, "f").terminate(); }
}
_TrackRegions_trackBoxAdapter = new WeakMap(), _TrackRegions_terminator = new WeakMap(), _TrackRegions_changeNotifier = new WeakMap(), _TrackRegions_regionsListeners = new WeakMap(), _TrackRegions_collection = new WeakMap(), _TrackRegions_adapters = new WeakMap();
