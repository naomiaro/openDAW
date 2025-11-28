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
var _TrackClips_trackBoxAdapter, _TrackClips_terminator, _TrackClips_changeNotifier, _TrackClips_collection;
import { Pointers } from "@opendaw/studio-enums";
import { Notifier, Terminator } from "@opendaw/lib-std";
import { IndexedBoxAdapterCollection } from "../IndexedBoxAdapterCollection";
import { ClipAdapters } from "./ClipBoxAdapter";
export class TrackClips {
    constructor(adapter, boxAdapters) {
        _TrackClips_trackBoxAdapter.set(this, void 0);
        _TrackClips_terminator.set(this, void 0);
        _TrackClips_changeNotifier.set(this, void 0);
        _TrackClips_collection.set(this, void 0);
        __classPrivateFieldSet(this, _TrackClips_trackBoxAdapter, adapter, "f");
        __classPrivateFieldSet(this, _TrackClips_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _TrackClips_changeNotifier, __classPrivateFieldGet(this, _TrackClips_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldSet(this, _TrackClips_collection, __classPrivateFieldGet(this, _TrackClips_terminator, "f").own(IndexedBoxAdapterCollection.create(adapter.box.clips, box => ClipAdapters.for(boxAdapters, box), Pointers.ClipCollection)), "f");
        __classPrivateFieldGet(this, _TrackClips_collection, "f").subscribe({
            onAdd: () => this.dispatchChange(),
            onRemove: () => this.dispatchChange(),
            onReorder: () => this.dispatchChange()
        });
    }
    get trackBoxAdapter() { return __classPrivateFieldGet(this, _TrackClips_trackBoxAdapter, "f"); }
    get collection() { return __classPrivateFieldGet(this, _TrackClips_collection, "f"); }
    dispatchChange() { __classPrivateFieldGet(this, _TrackClips_changeNotifier, "f").notify(); }
    subscribeChanges(observer) { return __classPrivateFieldGet(this, _TrackClips_changeNotifier, "f").subscribe(observer); }
    terminate() { __classPrivateFieldGet(this, _TrackClips_terminator, "f").terminate(); }
}
_TrackClips_trackBoxAdapter = new WeakMap(), _TrackClips_terminator = new WeakMap(), _TrackClips_changeNotifier = new WeakMap(), _TrackClips_collection = new WeakMap();
