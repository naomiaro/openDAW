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
var _NoteClipBoxAdapter_instances, _NoteClipBoxAdapter_terminator, _NoteClipBoxAdapter_context, _NoteClipBoxAdapter_box, _NoteClipBoxAdapter_selectedValue, _NoteClipBoxAdapter_changeNotifier, _NoteClipBoxAdapter_isConstructing, _NoteClipBoxAdapter_eventCollectionSubscription, _NoteClipBoxAdapter_dispatchChange;
import { DefaultObservableValue, Notifier, Option, safeExecute, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { PPQN } from "@opendaw/lib-dsp";
import { Propagation } from "@opendaw/lib-box";
import { NoteClipBox } from "@opendaw/studio-boxes";
import { NoteEventCollectionBoxAdapter } from "../collection/NoteEventCollectionBoxAdapter";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
export class NoteClipBoxAdapter {
    constructor(context, box) {
        _NoteClipBoxAdapter_instances.add(this);
        this.type = "note-clip";
        _NoteClipBoxAdapter_terminator.set(this, new Terminator());
        _NoteClipBoxAdapter_context.set(this, void 0);
        _NoteClipBoxAdapter_box.set(this, void 0);
        _NoteClipBoxAdapter_selectedValue.set(this, void 0);
        _NoteClipBoxAdapter_changeNotifier.set(this, void 0);
        _NoteClipBoxAdapter_isConstructing.set(this, void 0); // Prevents stack overflow due to infinite adapter queries
        _NoteClipBoxAdapter_eventCollectionSubscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_isConstructing, true, "f");
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_selectedValue, __classPrivateFieldGet(this, _NoteClipBoxAdapter_terminator, "f").own(new DefaultObservableValue(false)), "f");
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_changeNotifier, __classPrivateFieldGet(this, _NoteClipBoxAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _NoteClipBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _NoteClipBoxAdapter_instances, "m", _NoteClipBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _NoteClipBoxAdapter_instances, "m", _NoteClipBoxAdapter_dispatchChange).call(this)
        }), __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").subscribe(Propagation.Children, (_update) => __classPrivateFieldGet(this, _NoteClipBoxAdapter_instances, "m", _NoteClipBoxAdapter_dispatchChange).call(this)), __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").events.catchupAndSubscribe(({ targetVertex }) => {
            __classPrivateFieldGet(this, _NoteClipBoxAdapter_eventCollectionSubscription, "f").terminate();
            __classPrivateFieldSet(this, _NoteClipBoxAdapter_eventCollectionSubscription, targetVertex.match({
                none: () => Terminable.Empty,
                some: ({ box }) => __classPrivateFieldGet(this, _NoteClipBoxAdapter_context, "f").boxAdapters
                    .adapterFor(box, NoteEventCollectionBoxAdapter)
                    .subscribeChange(() => __classPrivateFieldGet(this, _NoteClipBoxAdapter_instances, "m", _NoteClipBoxAdapter_dispatchChange).call(this))
            }), "f");
            __classPrivateFieldGet(this, _NoteClipBoxAdapter_instances, "m", _NoteClipBoxAdapter_dispatchChange).call(this);
        }));
        __classPrivateFieldSet(this, _NoteClipBoxAdapter_isConstructing, false, "f");
    }
    catchupAndSubscribeSelected(observer) {
        return __classPrivateFieldGet(this, _NoteClipBoxAdapter_selectedValue, "f").catchupAndSubscribe(observer);
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) { return safeExecute(visitor.visitNoteClipBoxAdapter, this); }
    consolidate() {
        if (this.isMirrowed) {
            __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").events.refer(this.optCollection.unwrap().copy().box.owners);
        }
    }
    clone(consolidate) {
        const events = consolidate ? this.optCollection.unwrap().copy().box.owners : __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").events.targetVertex.unwrap();
        NoteClipBox.create(__classPrivateFieldGet(this, _NoteClipBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.index.setValue(this.indexField.getValue());
            box.label.setValue(this.label);
            box.hue.setValue(this.hue);
            box.duration.setValue(this.duration);
            box.mute.setValue(this.mute);
            box.clips.refer(__classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").clips.targetVertex.unwrap());
            box.events.refer(events);
        });
    }
    onSelected() { __classPrivateFieldGet(this, _NoteClipBoxAdapter_selectedValue, "f").setValue(true); }
    onDeselected() { __classPrivateFieldGet(this, _NoteClipBoxAdapter_selectedValue, "f").setValue(false); }
    get isSelected() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_selectedValue, "f").getValue(); }
    terminate() {
        __classPrivateFieldGet(this, _NoteClipBoxAdapter_eventCollectionSubscription, "f").terminate();
        __classPrivateFieldGet(this, _NoteClipBoxAdapter_terminator, "f").terminate();
    }
    get box() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").index; }
    get duration() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").duration.getValue(); }
    get mute() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").hue.getValue(); }
    get events() {
        return this.optCollection.map(collection => collection.events);
    }
    get hasCollection() { return !this.optCollection.isEmpty(); }
    get optCollection() {
        return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _NoteClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, NoteEventCollectionBoxAdapter));
    }
    get label() { return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").label.getValue(); }
    get trackBoxAdapter() {
        if (__classPrivateFieldGet(this, _NoteClipBoxAdapter_isConstructing, "f")) {
            return Option.None;
        }
        return __classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").clips.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _NoteClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get isMirrowed() { return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false); }
    get canMirror() { return true; }
    toString() { return `{NoteClipBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _NoteClipBoxAdapter_box, "f").address.uuid)} d: ${PPQN.toString(this.duration)}}`; }
}
_NoteClipBoxAdapter_terminator = new WeakMap(), _NoteClipBoxAdapter_context = new WeakMap(), _NoteClipBoxAdapter_box = new WeakMap(), _NoteClipBoxAdapter_selectedValue = new WeakMap(), _NoteClipBoxAdapter_changeNotifier = new WeakMap(), _NoteClipBoxAdapter_isConstructing = new WeakMap(), _NoteClipBoxAdapter_eventCollectionSubscription = new WeakMap(), _NoteClipBoxAdapter_instances = new WeakSet(), _NoteClipBoxAdapter_dispatchChange = function _NoteClipBoxAdapter_dispatchChange() {
    __classPrivateFieldGet(this, _NoteClipBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.clips?.dispatchChange();
};
