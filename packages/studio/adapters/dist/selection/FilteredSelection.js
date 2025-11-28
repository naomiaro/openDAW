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
var _FilteredSelection_selection, _FilteredSelection_filter, _FilteredSelection_mapping, _FilteredSelection_set, _FilteredSelection_listeners, _FilteredSelection_subscription;
import { Listeners } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
export class FilteredSelection {
    constructor(selection, filter, mapping) {
        _FilteredSelection_selection.set(this, void 0);
        _FilteredSelection_filter.set(this, void 0);
        _FilteredSelection_mapping.set(this, void 0);
        _FilteredSelection_set.set(this, void 0);
        _FilteredSelection_listeners.set(this, void 0);
        _FilteredSelection_subscription.set(this, void 0);
        __classPrivateFieldSet(this, _FilteredSelection_selection, selection, "f");
        __classPrivateFieldSet(this, _FilteredSelection_filter, filter, "f");
        __classPrivateFieldSet(this, _FilteredSelection_mapping, mapping, "f");
        __classPrivateFieldSet(this, _FilteredSelection_set, Address.newSet(addressable => addressable.address), "f");
        __classPrivateFieldSet(this, _FilteredSelection_listeners, new Listeners(), "f");
        __classPrivateFieldGet(this, _FilteredSelection_selection, "f").selected()
            .filter(element => __classPrivateFieldGet(this, _FilteredSelection_filter, "f").call(this, element))
            .forEach(element => __classPrivateFieldGet(this, _FilteredSelection_set, "f").add(__classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fy(element)));
        __classPrivateFieldSet(this, _FilteredSelection_subscription, __classPrivateFieldGet(this, _FilteredSelection_selection, "f").catchupAndSubscribe({
            onSelected: (element) => {
                if (__classPrivateFieldGet(this, _FilteredSelection_filter, "f").call(this, element)) {
                    const value = __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fy(element);
                    __classPrivateFieldGet(this, _FilteredSelection_set, "f").add(value);
                    __classPrivateFieldGet(this, _FilteredSelection_listeners, "f").proxy.onSelected(value);
                }
            },
            onDeselected: (element) => {
                if (__classPrivateFieldGet(this, _FilteredSelection_filter, "f").call(this, element)) {
                    __classPrivateFieldGet(this, _FilteredSelection_listeners, "f").proxy.onDeselected(__classPrivateFieldGet(this, _FilteredSelection_set, "f").removeByKey(element.address));
                }
            }
        }), "f");
    }
    terminate() { __classPrivateFieldGet(this, _FilteredSelection_subscription, "f").terminate(); }
    select(...selectables) {
        __classPrivateFieldGet(this, _FilteredSelection_selection, "f").select(...selectables.map(selectable => __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fx(selectable)));
    }
    deselect(...selectables) {
        __classPrivateFieldGet(this, _FilteredSelection_selection, "f").deselect(...selectables.map(selectable => __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fx(selectable)));
    }
    deselectAll() {
        __classPrivateFieldGet(this, _FilteredSelection_selection, "f").deselect(...(__classPrivateFieldGet(this, _FilteredSelection_set, "f").values().map(selectable => __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fx(selectable))));
    }
    distance(inventory) {
        return __classPrivateFieldGet(this, _FilteredSelection_selection, "f").distance(inventory.map(selectable => __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fx(selectable))).map(item => __classPrivateFieldGet(this, _FilteredSelection_mapping, "f").fy(item));
    }
    isEmpty() { return __classPrivateFieldGet(this, _FilteredSelection_set, "f").size() === 0; }
    nonEmpty() { return __classPrivateFieldGet(this, _FilteredSelection_set, "f").size() > 0; }
    count() { return __classPrivateFieldGet(this, _FilteredSelection_set, "f").size(); }
    isSelected(selectable) { return __classPrivateFieldGet(this, _FilteredSelection_set, "f").hasKey(selectable.address); }
    selected() { return __classPrivateFieldGet(this, _FilteredSelection_set, "f").values(); }
    subscribe(listener) {
        return __classPrivateFieldGet(this, _FilteredSelection_listeners, "f").subscribe(listener);
    }
    catchupAndSubscribe(listener) {
        __classPrivateFieldGet(this, _FilteredSelection_set, "f").forEach(selectable => listener.onSelected(selectable));
        return this.subscribe(listener);
    }
}
_FilteredSelection_selection = new WeakMap(), _FilteredSelection_filter = new WeakMap(), _FilteredSelection_mapping = new WeakMap(), _FilteredSelection_set = new WeakMap(), _FilteredSelection_listeners = new WeakMap(), _FilteredSelection_subscription = new WeakMap();
