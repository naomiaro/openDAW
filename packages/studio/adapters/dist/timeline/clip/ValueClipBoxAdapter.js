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
var _ValueClipBoxAdapter_instances, _ValueClipBoxAdapter_terminator, _ValueClipBoxAdapter_context, _ValueClipBoxAdapter_box, _ValueClipBoxAdapter_selectedValue, _ValueClipBoxAdapter_changeNotifier, _ValueClipBoxAdapter_isConstructing, _ValueClipBoxAdapter_eventCollectionSubscription, _ValueClipBoxAdapter_dispatchChange;
import { PPQN } from "@opendaw/lib-dsp";
import { DefaultObservableValue, Notifier, Option, safeExecute, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { Propagation } from "@opendaw/lib-box";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { ValueEventCollectionBoxAdapter } from "../collection/ValueEventCollectionBoxAdapter";
import { ValueClipBox } from "@opendaw/studio-boxes";
export class ValueClipBoxAdapter {
    constructor(context, box) {
        _ValueClipBoxAdapter_instances.add(this);
        this.type = "value-clip";
        _ValueClipBoxAdapter_terminator.set(this, new Terminator());
        _ValueClipBoxAdapter_context.set(this, void 0);
        _ValueClipBoxAdapter_box.set(this, void 0);
        _ValueClipBoxAdapter_selectedValue.set(this, void 0);
        _ValueClipBoxAdapter_changeNotifier.set(this, void 0);
        _ValueClipBoxAdapter_isConstructing.set(this, void 0); // Prevents stack overflow due to infinite adapter queries
        _ValueClipBoxAdapter_eventCollectionSubscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_isConstructing, true, "f");
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_selectedValue, __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").own(new DefaultObservableValue(false)), "f");
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_changeNotifier, __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _ValueClipBoxAdapter_instances, "m", _ValueClipBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _ValueClipBoxAdapter_instances, "m", _ValueClipBoxAdapter_dispatchChange).call(this)
        }));
        __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").subscribe(Propagation.Children, (_update) => __classPrivateFieldGet(this, _ValueClipBoxAdapter_instances, "m", _ValueClipBoxAdapter_dispatchChange).call(this)));
        __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").events.catchupAndSubscribe(({ targetVertex }) => {
            __classPrivateFieldGet(this, _ValueClipBoxAdapter_eventCollectionSubscription, "f").terminate();
            __classPrivateFieldSet(this, _ValueClipBoxAdapter_eventCollectionSubscription, targetVertex.match({
                none: () => Terminable.Empty,
                some: ({ box }) => __classPrivateFieldGet(this, _ValueClipBoxAdapter_context, "f").boxAdapters
                    .adapterFor(box, ValueEventCollectionBoxAdapter)
                    .subscribeChange(() => __classPrivateFieldGet(this, _ValueClipBoxAdapter_instances, "m", _ValueClipBoxAdapter_dispatchChange).call(this))
            }), "f");
            __classPrivateFieldGet(this, _ValueClipBoxAdapter_instances, "m", _ValueClipBoxAdapter_dispatchChange).call(this);
        }));
        __classPrivateFieldSet(this, _ValueClipBoxAdapter_isConstructing, false, "f");
    }
    valueAt(position, fallback) {
        const content = this.optCollection;
        return content.isEmpty() ? fallback : content.unwrap().valueAt(position % this.duration, fallback);
    }
    catchupAndSubscribeSelected(observer) {
        return __classPrivateFieldGet(this, _ValueClipBoxAdapter_selectedValue, "f").catchupAndSubscribe(observer);
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) { return safeExecute(visitor.visitValueClipBoxAdapter, this); }
    consolidate() {
        if (this.isMirrowed) {
            __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").events.refer(this.optCollection.unwrap().copy().box.owners);
        }
    }
    clone(consolidate) {
        const events = consolidate ? this.optCollection.unwrap().copy().box.owners : __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").events.targetVertex.unwrap();
        ValueClipBox.create(__classPrivateFieldGet(this, _ValueClipBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.index.setValue(this.indexField.getValue());
            box.label.setValue(this.label);
            box.hue.setValue(this.hue);
            box.duration.setValue(this.duration);
            box.mute.setValue(this.mute);
            box.clips.refer(__classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").clips.targetVertex.unwrap());
            box.events.refer(events);
        });
    }
    onSelected() { __classPrivateFieldGet(this, _ValueClipBoxAdapter_selectedValue, "f").setValue(true); }
    onDeselected() { __classPrivateFieldGet(this, _ValueClipBoxAdapter_selectedValue, "f").setValue(false); }
    get isSelected() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_selectedValue, "f").getValue(); }
    terminate() {
        __classPrivateFieldGet(this, _ValueClipBoxAdapter_eventCollectionSubscription, "f").terminate();
        __classPrivateFieldGet(this, _ValueClipBoxAdapter_terminator, "f").terminate();
    }
    get box() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").index; }
    get duration() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").duration.getValue(); }
    get mute() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").hue.getValue(); }
    get hasCollection() { return !this.optCollection.isEmpty(); }
    get events() {
        return this.optCollection.map(collection => collection.events);
    }
    get optCollection() {
        return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _ValueClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, ValueEventCollectionBoxAdapter));
    }
    get label() { return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").label.getValue(); }
    get trackBoxAdapter() {
        if (__classPrivateFieldGet(this, _ValueClipBoxAdapter_isConstructing, "f")) {
            return Option.None;
        }
        return __classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").clips.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _ValueClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get isMirrowed() { return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false); }
    get canMirror() { return true; }
    toString() { return `{ValueClipBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _ValueClipBoxAdapter_box, "f").address.uuid)} d: ${PPQN.toString(this.duration)}}`; }
}
_ValueClipBoxAdapter_terminator = new WeakMap(), _ValueClipBoxAdapter_context = new WeakMap(), _ValueClipBoxAdapter_box = new WeakMap(), _ValueClipBoxAdapter_selectedValue = new WeakMap(), _ValueClipBoxAdapter_changeNotifier = new WeakMap(), _ValueClipBoxAdapter_isConstructing = new WeakMap(), _ValueClipBoxAdapter_eventCollectionSubscription = new WeakMap(), _ValueClipBoxAdapter_instances = new WeakSet(), _ValueClipBoxAdapter_dispatchChange = function _ValueClipBoxAdapter_dispatchChange() {
    __classPrivateFieldGet(this, _ValueClipBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.clips?.dispatchChange();
};
