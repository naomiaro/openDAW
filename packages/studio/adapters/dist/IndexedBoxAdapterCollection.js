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
var _IndexedBoxAdapterCollection_field, _IndexedBoxAdapterCollection_entries, _IndexedBoxAdapterCollection_listeners, _IndexedBoxAdapterCollection_subscription, _IndexedBoxAdapterCollection_sorted;
import { assert, BinarySearch, clamp, Listeners, Option, UUID } from "@opendaw/lib-std";
import { IndexComparator } from "./IndexComparator";
export class IndexedBoxAdapterCollection {
    static create(field, provider, pointers) {
        return new IndexedBoxAdapterCollection(field, provider, pointers);
    }
    constructor(field, provider, pointers) {
        _IndexedBoxAdapterCollection_field.set(this, void 0);
        _IndexedBoxAdapterCollection_entries.set(this, void 0);
        _IndexedBoxAdapterCollection_listeners.set(this, void 0);
        _IndexedBoxAdapterCollection_subscription.set(this, void 0);
        _IndexedBoxAdapterCollection_sorted.set(this, null);
        __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_field, field, "f");
        __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_entries, UUID.newSet(entry => entry.adapter.uuid), "f");
        __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_listeners, new Listeners(), "f");
        __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_subscription, field.pointerHub.catchupAndSubscribe({
            onAdded: (pointer) => {
                __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_sorted, null, "f");
                const adapter = provider(pointer.box);
                const subscription = adapter.indexField.subscribe(() => {
                    __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_sorted, null, "f");
                    __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_listeners, "f").proxy.onReorder(adapter);
                });
                const added = __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").add({ adapter, subscription });
                assert(added, `Could not add ${adapter}`);
                __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_listeners, "f").proxy.onAdd(adapter);
            },
            onRemoved: (pointer) => {
                __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_sorted, null, "f");
                const uuid = pointer.box.address.uuid;
                const { adapter, subscription } = __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").removeByKey(uuid);
                subscription.terminate();
                __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_listeners, "f").proxy.onRemove(adapter);
            }
        }, pointers), "f");
    }
    field() { return __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_field, "f"); }
    subscribe(listener) {
        return __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_listeners, "f").subscribe(listener);
    }
    catchupAndSubscribe(listener) {
        __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").forEach(({ adapter }) => listener.onAdd(adapter));
        return this.subscribe(listener);
    }
    getAdapterByIndex(index) {
        const idx = BinarySearch.exactMapped(this.adapters(), index, IndexComparator, adapter => adapter.indexField.getValue());
        return idx === -1 ? Option.None : Option.wrap(this.adapters()[idx]);
    }
    getAdapterById(uuid) { return __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").opt(uuid).map(({ adapter }) => adapter); }
    getMinFreeIndex() {
        const adapters = this.adapters();
        for (let index = 0; index < adapters.length; index++) {
            if (adapters[index].indexField.getValue() > index) {
                return index;
            }
        }
        return adapters.length;
    }
    adapters() {
        if (__classPrivateFieldGet(this, _IndexedBoxAdapterCollection_sorted, "f") === null) {
            __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_sorted, __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").values()
                .map(({ adapter }) => adapter)
                .sort((a, b) => a.indexField.getValue() - b.indexField.getValue()), "f");
        }
        return __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_sorted, "f");
    }
    move(adapter, delta) {
        this.moveIndex(adapter.indexField.getValue(), delta);
    }
    moveIndex(startIndex, delta) {
        const adapters = this.adapters();
        const adapter = adapters[startIndex];
        if (delta < 0) {
            const newIndex = clamp(startIndex + delta, 0, adapters.length - 1);
            for (let index = newIndex; index < startIndex; index++) {
                adapters[index].indexField.setValue(index + 1);
            }
            adapter.indexField.setValue(newIndex);
        }
        else if (delta > 1) {
            const newIndex = clamp(startIndex + (delta - 1), 0, adapters.length - 1);
            for (let index = startIndex; index < newIndex; index++) {
                adapters[index + 1].indexField.setValue(index);
            }
            adapter.indexField.setValue(newIndex);
        }
        else {
            console.warn(`moveIndex had no effect: startIndex: ${startIndex}, delta: ${delta}`);
        }
    }
    size() { return __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").size(); }
    isEmpty() { return this.size() === 0; }
    terminate() {
        __classPrivateFieldSet(this, _IndexedBoxAdapterCollection_sorted, null, "f");
        __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").forEach(({ subscription }) => subscription.terminate());
        __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_entries, "f").clear();
        __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_listeners, "f").terminate();
        __classPrivateFieldGet(this, _IndexedBoxAdapterCollection_subscription, "f").terminate();
    }
}
_IndexedBoxAdapterCollection_field = new WeakMap(), _IndexedBoxAdapterCollection_entries = new WeakMap(), _IndexedBoxAdapterCollection_listeners = new WeakMap(), _IndexedBoxAdapterCollection_subscription = new WeakMap(), _IndexedBoxAdapterCollection_sorted = new WeakMap();
