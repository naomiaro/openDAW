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
var _AudioUnitTracks_adapter, _AudioUnitTracks_regionNotifier, _AudioUnitTracks_collection, _AudioUnitTracks_subscriptions, _AudioUnitTracks_subscription;
import { Notifier, Option, panic, UUID } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { TrackBox } from "@opendaw/studio-boxes";
import { IndexedBoxAdapterCollection } from "../IndexedBoxAdapterCollection";
import { TrackBoxAdapter } from "../timeline/TrackBoxAdapter";
export class AudioUnitTracks {
    constructor(adapter, boxAdapters) {
        _AudioUnitTracks_adapter.set(this, void 0);
        _AudioUnitTracks_regionNotifier.set(this, new Notifier());
        _AudioUnitTracks_collection.set(this, void 0);
        _AudioUnitTracks_subscriptions.set(this, void 0);
        _AudioUnitTracks_subscription.set(this, void 0);
        __classPrivateFieldSet(this, _AudioUnitTracks_adapter, adapter, "f");
        __classPrivateFieldSet(this, _AudioUnitTracks_collection, IndexedBoxAdapterCollection.create(adapter.box.tracks, box => boxAdapters.adapterFor(box, TrackBoxAdapter), Pointers.TrackCollection), "f");
        __classPrivateFieldSet(this, _AudioUnitTracks_subscriptions, UUID.newSet(({ uuid }) => uuid), "f");
        __classPrivateFieldSet(this, _AudioUnitTracks_subscription, __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").catchupAndSubscribe({
            onAdd: (adapter) => __classPrivateFieldGet(this, _AudioUnitTracks_subscriptions, "f").add({
                uuid: adapter.uuid,
                subscription: adapter.regions.subscribeChanges(() => __classPrivateFieldGet(this, _AudioUnitTracks_regionNotifier, "f").notify())
            }),
            onRemove: ({ uuid }) => __classPrivateFieldGet(this, _AudioUnitTracks_subscriptions, "f").removeByKey(uuid).subscription.terminate(),
            onReorder: (_adapter) => { }
        }), "f");
    }
    create(type, target, index) {
        const graph = __classPrivateFieldGet(this, _AudioUnitTracks_adapter, "f").box.graph;
        const tracks = __classPrivateFieldGet(this, _AudioUnitTracks_adapter, "f").box.tracks;
        TrackBox.create(graph, UUID.generate(), box => {
            box.index.setValue(index ?? __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").getMinFreeIndex());
            box.type.setValue(type);
            box.tracks.refer(tracks);
            box.target.refer(target);
        });
    }
    controls(target) {
        return Option.wrap(__classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").adapters()
            .find(adapter => adapter.target.targetVertex.contains(target), false));
    }
    delete(adapter) {
        const adapters = __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").adapters();
        const deleteIndex = adapters.indexOf(adapter);
        if (deleteIndex === -1) {
            return panic(`Cannot delete ${adapter}. Does not exist.`);
        }
        for (let index = deleteIndex + 1; index < adapters.length; index++) {
            adapters[index].indexField.setValue(index - 1);
        }
        adapter.box.delete();
    }
    get collection() { return __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f"); }
    values() { return __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").adapters(); }
    catchupAndSubscribe(listener) {
        return __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").catchupAndSubscribe(listener);
    }
    subscribeAnyChange(observer) { return __classPrivateFieldGet(this, _AudioUnitTracks_regionNotifier, "f").subscribe(observer); }
    terminate() {
        __classPrivateFieldGet(this, _AudioUnitTracks_collection, "f").terminate();
        __classPrivateFieldGet(this, _AudioUnitTracks_subscription, "f").terminate();
        __classPrivateFieldGet(this, _AudioUnitTracks_subscriptions, "f").forEach(({ subscription }) => subscription.terminate());
        __classPrivateFieldGet(this, _AudioUnitTracks_subscriptions, "f").clear();
    }
}
_AudioUnitTracks_adapter = new WeakMap(), _AudioUnitTracks_regionNotifier = new WeakMap(), _AudioUnitTracks_collection = new WeakMap(), _AudioUnitTracks_subscriptions = new WeakMap(), _AudioUnitTracks_subscription = new WeakMap();
