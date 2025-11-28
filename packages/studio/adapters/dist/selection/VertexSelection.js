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
var _VertexSelection_instances, _VertexSelection_lifeTime, _VertexSelection_entityMap, _VertexSelection_selectableMap, _VertexSelection_listeners, _VertexSelection_target, _VertexSelection_watch;
import { asInstanceOf, assert, Listeners, Option, Terminator, UUID } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { SelectionBox } from "@opendaw/studio-boxes";
import { FilteredSelection } from "./FilteredSelection";
/**
 * Represents the main selection management within a document.
 * This class maintains selections for different users, with each user having their own unique selection.
 */
export class VertexSelection {
    constructor(editing, boxGraph) {
        _VertexSelection_instances.add(this);
        this.editing = editing;
        this.boxGraph = boxGraph;
        _VertexSelection_lifeTime.set(this, void 0);
        _VertexSelection_entityMap.set(this, void 0); // sorted on entity
        _VertexSelection_selectableMap.set(this, void 0); // sorted on selectable
        _VertexSelection_listeners.set(this, void 0);
        _VertexSelection_target.set(this, Option.None);
        __classPrivateFieldSet(this, _VertexSelection_lifeTime, new Terminator(), "f");
        __classPrivateFieldSet(this, _VertexSelection_entityMap, UUID.newSet(entry => entry.box.address.uuid), "f");
        __classPrivateFieldSet(this, _VertexSelection_selectableMap, Address.newSet(entry => entry.selectable.address), "f");
        __classPrivateFieldSet(this, _VertexSelection_listeners, new Listeners(), "f");
    }
    switch(target) {
        this.release();
        console.debug(`VertexSelection.switch(${target.address.toString()})`);
        __classPrivateFieldSet(this, _VertexSelection_target, Option.wrap(target), "f");
        __classPrivateFieldGet(this, _VertexSelection_lifeTime, "f").own(__classPrivateFieldGet(this, _VertexSelection_instances, "m", _VertexSelection_watch).call(this, target));
        return this;
    }
    release() {
        if (__classPrivateFieldGet(this, _VertexSelection_target, "f").isEmpty()) {
            return;
        }
        __classPrivateFieldSet(this, _VertexSelection_target, Option.None, "f");
        __classPrivateFieldGet(this, _VertexSelection_lifeTime, "f").terminate();
        __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").forEach(entry => __classPrivateFieldGet(this, _VertexSelection_listeners, "f").proxy.onDeselected(entry.selectable));
        __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").clear();
        __classPrivateFieldGet(this, _VertexSelection_entityMap, "f").clear();
    }
    createFilteredSelection(affiliate, map) {
        return new FilteredSelection(this, affiliate, map);
    }
    select(...selectables) {
        if (__classPrivateFieldGet(this, _VertexSelection_target, "f").isEmpty()) {
            console.debug(`Cannot select without a user`);
            return;
        }
        if (selectables.length === 0) {
            return;
        }
        this.editing.modify(() => {
            const selection = __classPrivateFieldGet(this, _VertexSelection_target, "f").unwrap();
            for (const selectable of selectables) {
                if (!__classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").hasKey(selectable.address)) {
                    SelectionBox.create(this.boxGraph, UUID.generate(), box => {
                        box.selectable.refer(selectable);
                        box.selection.refer(selection);
                    });
                }
            }
        }, false);
    }
    deselect(...selectables) {
        if (__classPrivateFieldGet(this, _VertexSelection_target, "f").isEmpty()) {
            console.debug(`Cannot deselect without a user`);
            return;
        }
        if (selectables.length === 0) {
            return;
        }
        this.editing.modify(() => selectables
            .forEach(selectable => __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").get(selectable.address).box.delete()), false);
    }
    deselectAll() {
        this.deselect(...__classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").values().map(entry => entry.selectable));
    }
    distance(inventory) {
        const excludes = [];
        for (const selectable of inventory) {
            if (!__classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").hasKey(selectable.address)) {
                excludes.push(selectable);
            }
        }
        return excludes;
    }
    isEmpty() { return __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").size() === 0; }
    count() { return __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").size(); }
    isSelected(selectable) { return __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").hasKey(selectable.address); }
    selected() { return __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").values().map(entry => entry.selectable); }
    subscribe(listener) { return __classPrivateFieldGet(this, _VertexSelection_listeners, "f").subscribe(listener); }
    catchupAndSubscribe(listener) {
        this.selected().forEach(element => listener.onSelected(element));
        return __classPrivateFieldGet(this, _VertexSelection_listeners, "f").subscribe(listener);
    }
}
_VertexSelection_lifeTime = new WeakMap(), _VertexSelection_entityMap = new WeakMap(), _VertexSelection_selectableMap = new WeakMap(), _VertexSelection_listeners = new WeakMap(), _VertexSelection_target = new WeakMap(), _VertexSelection_instances = new WeakSet(), _VertexSelection_watch = function _VertexSelection_watch(target) {
    return target.pointerHub.catchupAndSubscribe({
        onAdded: (pointer) => {
            const box = asInstanceOf(pointer.box, SelectionBox);
            assert(box.isAttached(), "SelectionBox is not attached");
            const selectable = box.selectable.targetVertex
                .unwrap(() => `SelectionBox has no target (${box.selectable.targetAddress.unwrapOrUndefined()
                ?.toString() ?? "No address"})`);
            const entry = { box, selectable };
            __classPrivateFieldGet(this, _VertexSelection_listeners, "f").proxy.onSelected(selectable);
            assert(__classPrivateFieldGet(this, _VertexSelection_entityMap, "f").add(entry), "Could not add to entityMap");
            assert(__classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").add(entry), "Could not add to selectableMap");
        },
        onRemoved: (pointer) => {
            const box = asInstanceOf(pointer.box, SelectionBox);
            const entry = __classPrivateFieldGet(this, _VertexSelection_entityMap, "f").removeByKey(box.address.uuid);
            assert(entry.box === box, "Broken selection");
            const selectable = entry.selectable;
            __classPrivateFieldGet(this, _VertexSelection_listeners, "f").proxy.onDeselected(selectable);
            __classPrivateFieldGet(this, _VertexSelection_selectableMap, "f").removeByKey(selectable.address);
        }
    }, Pointers.Selection);
};
