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
var _BoxAdapterCollection_entries, _BoxAdapterCollection_listeners, _BoxAdapterCollection_subscription;
import { assert, Listeners, UUID } from "@opendaw/lib-std";
export class BoxAdapterCollection {
    constructor(pointerHub, provider, pointers) {
        _BoxAdapterCollection_entries.set(this, void 0);
        _BoxAdapterCollection_listeners.set(this, void 0);
        _BoxAdapterCollection_subscription.set(this, void 0);
        __classPrivateFieldSet(this, _BoxAdapterCollection_entries, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _BoxAdapterCollection_listeners, new Listeners(), "f");
        __classPrivateFieldSet(this, _BoxAdapterCollection_subscription, pointerHub.catchupAndSubscribe({
            onAdded: (pointer) => {
                const adapter = provider(pointer.box);
                const added = __classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").add(adapter);
                assert(added, `Could not add ${adapter}`);
                __classPrivateFieldGet(this, _BoxAdapterCollection_listeners, "f").proxy.onAdd(adapter);
            },
            onRemoved: (pointer) => {
                const uuid = pointer.box.address.uuid;
                __classPrivateFieldGet(this, _BoxAdapterCollection_listeners, "f").proxy.onRemove(__classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").removeByKey(uuid));
            }
        }, pointers), "f");
    }
    subscribe(listener) { return __classPrivateFieldGet(this, _BoxAdapterCollection_listeners, "f").subscribe(listener); }
    catchupAndSubscribe(listener) {
        __classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").forEach(adapter => listener.onAdd(adapter));
        return this.subscribe(listener);
    }
    adapters() { return __classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").values(); }
    size() { return __classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").size(); }
    isEmpty() { return this.size() === 0; }
    terminate() {
        __classPrivateFieldGet(this, _BoxAdapterCollection_entries, "f").clear();
        __classPrivateFieldGet(this, _BoxAdapterCollection_listeners, "f").terminate();
        __classPrivateFieldGet(this, _BoxAdapterCollection_subscription, "f").terminate();
    }
}
_BoxAdapterCollection_entries = new WeakMap(), _BoxAdapterCollection_listeners = new WeakMap(), _BoxAdapterCollection_subscription = new WeakMap();
