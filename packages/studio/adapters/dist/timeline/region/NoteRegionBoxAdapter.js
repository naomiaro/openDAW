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
var _NoteRegionBoxAdapter_instances, _NoteRegionBoxAdapter_terminator, _NoteRegionBoxAdapter_context, _NoteRegionBoxAdapter_box, _NoteRegionBoxAdapter_changeNotifier, _NoteRegionBoxAdapter_isConstructing, _NoteRegionBoxAdapter_isSelected, _NoteRegionBoxAdapter_eventCollectionSubscription, _NoteRegionBoxAdapter_dispatchChange;
import { LoopableRegion, PPQN, RegionCollection } from "@opendaw/lib-dsp";
import { Arrays, Notifier, Option, safeExecute, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { Propagation } from "@opendaw/lib-box";
import { NoteEventCollectionBox, NoteRegionBox } from "@opendaw/studio-boxes";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { NoteEventCollectionBoxAdapter } from "../collection/NoteEventCollectionBoxAdapter";
export class NoteRegionBoxAdapter {
    constructor(context, box) {
        _NoteRegionBoxAdapter_instances.add(this);
        this.type = "note-region";
        _NoteRegionBoxAdapter_terminator.set(this, new Terminator());
        _NoteRegionBoxAdapter_context.set(this, void 0);
        _NoteRegionBoxAdapter_box.set(this, void 0);
        _NoteRegionBoxAdapter_changeNotifier.set(this, void 0);
        _NoteRegionBoxAdapter_isConstructing.set(this, void 0); // Prevents stack overflow due to infinite adapter queries
        _NoteRegionBoxAdapter_isSelected.set(this, void 0);
        _NoteRegionBoxAdapter_eventCollectionSubscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_changeNotifier, new Notifier(), "f");
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_isConstructing, true, "f");
        __classPrivateFieldGet(this, _NoteRegionBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this)
        }), __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.trackBoxAdapter.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const track = this.trackBoxAdapter.unwrap();
                if (__classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").position.address.equals(update.address)) {
                    track.regions.onIndexingChanged();
                    __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this);
                }
                else {
                    __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this);
                }
            }
        }), __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").events.catchupAndSubscribe(({ targetVertex }) => {
            __classPrivateFieldGet(this, _NoteRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
            __classPrivateFieldSet(this, _NoteRegionBoxAdapter_eventCollectionSubscription, targetVertex.match({
                none: () => Terminable.Empty,
                some: ({ box }) => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxAdapters
                    .adapterFor(box, NoteEventCollectionBoxAdapter)
                    .subscribeChange(() => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this))
            }), "f");
            __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this);
        }));
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_isConstructing, false, "f");
    }
    set position(value) { __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").position.setValue(value); }
    set duration(value) { __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").duration.setValue(value); }
    set loopOffset(value) { __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").loopOffset.setValue(value); }
    set loopDuration(value) { __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").loopDuration.setValue(value); }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) { return safeExecute(visitor.visitNoteRegionBoxAdapter, this); }
    onSelected() {
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_isSelected, true, "f");
        __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this);
    }
    onDeselected() {
        __classPrivateFieldSet(this, _NoteRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldGet(this, _NoteRegionBoxAdapter_instances, "m", _NoteRegionBoxAdapter_dispatchChange).call(this);
    }
    get isSelected() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_isSelected, "f"); }
    *iterateActiveNotesAt(position) {
        const optCollection = this.optCollection;
        if (optCollection.isEmpty()) {
            return;
        }
        const collection = optCollection.unwrap();
        const local = LoopableRegion.globalToLocal(this, position);
        for (const event of collection.events.iterateFrom(local - collection.maxDuration)) {
            if (local < event.position) {
                return;
            }
            if (local < event.complete) {
                yield event.copyAsNoteEvent();
            }
        }
    }
    terminate() {
        __classPrivateFieldGet(this, _NoteRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
        __classPrivateFieldGet(this, _NoteRegionBoxAdapter_terminator, "f").terminate();
    }
    get box() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").position.getValue(); }
    get duration() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").duration.getValue(); }
    get loopOffset() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").loopOffset.getValue(); }
    get loopDuration() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").loopDuration.getValue(); }
    get offset() { return this.position - this.loopOffset; }
    get complete() { return this.position + this.duration; }
    get mute() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").hue.getValue(); }
    get hasCollection() { return this.optCollection.nonEmpty(); }
    get optCollection() {
        return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, NoteEventCollectionBoxAdapter));
    }
    get label() { return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").label.getValue(); }
    get trackBoxAdapter() {
        if (__classPrivateFieldGet(this, _NoteRegionBoxAdapter_isConstructing, "f")) {
            return Option.None;
        }
        return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").regions.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get isMirrowed() { return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false); }
    get canMirror() { return true; }
    copyTo(params) {
        const eventCollection = this.optCollection.unwrap("Cannot make copy without event-collection");
        const eventTarget = params?.consolidate === true
            ? eventCollection.copy().box.owners
            : eventCollection.box.owners;
        return __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxAdapters.adapterFor(NoteRegionBox.create(__classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(params?.position ?? this.position);
            box.duration.setValue(params?.duration ?? this.duration);
            box.loopOffset.setValue(params?.loopOffset ?? this.loopOffset);
            box.loopDuration.setValue(params?.loopDuration ?? this.loopDuration);
            box.hue.setValue(this.hue);
            box.label.setValue(this.label);
            box.mute.setValue(this.mute);
            box.events.refer(eventTarget);
            box.regions.refer(params?.track ?? __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").regions.targetVertex.unwrap());
        }), NoteRegionBoxAdapter);
    }
    consolidate() {
        if (!this.isMirrowed) {
            return;
        }
        this.optCollection.ifSome(source => {
            const graph = __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxGraph;
            const target = NoteEventCollectionBox.create(graph, UUID.generate());
            source.events.asArray().forEach(adapter => adapter.copyTo({ events: target.events }));
            __classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").events.refer(target.owners);
        });
    }
    canFlatten(regions) {
        return regions.length > 0 && Arrays.satisfy(regions, (a, b) => a.trackBoxAdapter.contains(b.trackBoxAdapter.unwrap()))
            && regions.every(region => region.isSelected && region instanceof NoteRegionBoxAdapter);
    }
    flatten(regions) {
        if (!this.canFlatten(regions)) {
            return Option.None;
        }
        const graph = __classPrivateFieldGet(this, _NoteRegionBoxAdapter_context, "f").boxGraph;
        const sorted = regions.toSorted(RegionCollection.Comparator);
        const first = Arrays.getFirst(sorted, "Internal error (no first)");
        const last = Arrays.getLast(sorted, "Internal error (no last)");
        const rangeMin = first.position;
        const rangeMax = last.position + last.duration;
        const trackBoxAdapter = first.trackBoxAdapter.unwrap();
        const collectionBox = NoteEventCollectionBox.create(graph, UUID.generate());
        const overlapping = Array.from(trackBoxAdapter.regions.collection.iterateRange(rangeMin, rangeMax));
        overlapping
            .filter(region => region.isSelected)
            .forEach(anyRegion => {
            const region = anyRegion; // we made that sure in canFlatten
            for (const { resultStart, resultEnd, rawStart } of LoopableRegion.locateLoops(region, region.position, region.complete)) {
                const searchStart = Math.floor(resultStart - rawStart);
                const searchEnd = Math.floor(resultEnd - rawStart);
                for (const event of region.optCollection.unwrap().events.iterateRange(searchStart, searchEnd)) {
                    event.copyTo({
                        position: event.position + rawStart - first.position,
                        events: collectionBox.events
                    });
                }
            }
        });
        overlapping.forEach(({ box }) => box.delete());
        return Option.wrap(NoteRegionBox.create(graph, UUID.generate(), box => {
            box.position.setValue(rangeMin);
            box.duration.setValue(rangeMax - rangeMin);
            box.loopDuration.setValue(rangeMax - rangeMin);
            box.loopOffset.setValue(0);
            box.hue.setValue(this.hue);
            box.mute.setValue(this.mute);
            box.label.setValue(this.label);
            box.events.refer(collectionBox.owners);
            box.regions.refer(trackBoxAdapter.box.regions);
        }));
    }
    toString() { return `{NoteRegionBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _NoteRegionBoxAdapter_box, "f").address.uuid)} p: ${PPQN.toString(this.position)}, c: ${PPQN.toString(this.complete)}}`; }
}
_NoteRegionBoxAdapter_terminator = new WeakMap(), _NoteRegionBoxAdapter_context = new WeakMap(), _NoteRegionBoxAdapter_box = new WeakMap(), _NoteRegionBoxAdapter_changeNotifier = new WeakMap(), _NoteRegionBoxAdapter_isConstructing = new WeakMap(), _NoteRegionBoxAdapter_isSelected = new WeakMap(), _NoteRegionBoxAdapter_eventCollectionSubscription = new WeakMap(), _NoteRegionBoxAdapter_instances = new WeakSet(), _NoteRegionBoxAdapter_dispatchChange = function _NoteRegionBoxAdapter_dispatchChange() {
    __classPrivateFieldGet(this, _NoteRegionBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.regions?.dispatchChange();
};
