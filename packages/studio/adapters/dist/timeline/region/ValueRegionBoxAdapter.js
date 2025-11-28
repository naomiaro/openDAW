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
var _ValueRegionBoxAdapter_instances, _ValueRegionBoxAdapter_terminator, _ValueRegionBoxAdapter_context, _ValueRegionBoxAdapter_box, _ValueRegionBoxAdapter_changeNotifier, _ValueRegionBoxAdapter_isSelected, _ValueRegionBoxAdapter_isConstructing, _ValueRegionBoxAdapter_eventCollectionSubscription, _ValueRegionBoxAdapter_dispatchChange;
import { LoopableRegion, PPQN, RegionCollection } from "@opendaw/lib-dsp";
import { Arrays, Notifier, Option, safeExecute, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { Propagation } from "@opendaw/lib-box";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { ValueEventCollectionBoxAdapter } from "../collection/ValueEventCollectionBoxAdapter";
import { ValueEventCollectionBox, ValueRegionBox } from "@opendaw/studio-boxes";
export class ValueRegionBoxAdapter {
    constructor(context, box) {
        _ValueRegionBoxAdapter_instances.add(this);
        this.type = "value-region";
        _ValueRegionBoxAdapter_terminator.set(this, new Terminator());
        _ValueRegionBoxAdapter_context.set(this, void 0);
        _ValueRegionBoxAdapter_box.set(this, void 0);
        _ValueRegionBoxAdapter_changeNotifier.set(this, void 0);
        _ValueRegionBoxAdapter_isSelected.set(this, void 0);
        _ValueRegionBoxAdapter_isConstructing.set(this, void 0); // Prevents stack overflow due to infinite adapter queries
        _ValueRegionBoxAdapter_eventCollectionSubscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_isConstructing, true, "f");
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_changeNotifier, new Notifier(), "f");
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this)
        }));
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.trackBoxAdapter.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const track = this.trackBoxAdapter.unwrap();
                if (__classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").position.address.equals(update.address)) {
                    track.regions.onIndexingChanged();
                    __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this);
                }
                else {
                    __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this);
                }
            }
        }));
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").events.catchupAndSubscribe(({ targetVertex }) => {
            __classPrivateFieldGet(this, _ValueRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
            __classPrivateFieldSet(this, _ValueRegionBoxAdapter_eventCollectionSubscription, targetVertex.match({
                none: () => Terminable.Empty,
                some: ({ box }) => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxAdapters
                    .adapterFor(box, ValueEventCollectionBoxAdapter)
                    .subscribeChange(() => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this))
            }), "f");
            __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this);
        }));
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_isConstructing, false, "f");
    }
    valueAt(position, fallback) {
        const content = this.optCollection;
        return content.isEmpty() ? fallback : content.unwrap().valueAt(LoopableRegion.globalToLocal(this, position), fallback);
    }
    incomingValue(fallback) { return this.valueAt(this.position, fallback); }
    outgoingValue(fallback) {
        const optContent = this.optCollection;
        if (optContent.isEmpty()) {
            return fallback;
        }
        const content = optContent.unwrap();
        const endsOnLoopPass = (this.complete - this.offset) % this.loopDuration === 0;
        return endsOnLoopPass
            ? content.valueAt(this.loopDuration, fallback)
            : content.valueAt(LoopableRegion.globalToLocal(this, this.complete), fallback);
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) {
        return safeExecute(visitor.visitValueRegionBoxAdapter, this);
    }
    onSelected() {
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_isSelected, true, "f");
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this);
    }
    onDeselected() {
        __classPrivateFieldSet(this, _ValueRegionBoxAdapter_isSelected, false, "f");
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this);
    }
    get isSelected() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_isSelected, "f"); }
    onValuesPropertyChanged() { __classPrivateFieldGet(this, _ValueRegionBoxAdapter_instances, "m", _ValueRegionBoxAdapter_dispatchChange).call(this); }
    onValuesSortingChanged() { this.onValuesPropertyChanged(); }
    terminate() {
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_eventCollectionSubscription, "f").terminate();
        __classPrivateFieldGet(this, _ValueRegionBoxAdapter_terminator, "f").terminate();
    }
    get box() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").position.getValue(); }
    get duration() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").duration.getValue(); }
    get loopOffset() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").loopOffset.getValue(); }
    get loopDuration() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").loopDuration.getValue(); }
    get offset() { return this.position - this.loopOffset; }
    get complete() { return this.position + this.duration; }
    get mute() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").hue.getValue(); }
    get hasCollection() { return !this.optCollection.isEmpty(); }
    get events() {
        return this.optCollection.map(collection => collection.events);
    }
    get optCollection() {
        return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, ValueEventCollectionBoxAdapter));
    }
    get label() { return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").label.getValue(); }
    get trackBoxAdapter() {
        if (__classPrivateFieldGet(this, _ValueRegionBoxAdapter_isConstructing, "f")) {
            return Option.None;
        }
        return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").regions.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get isMirrowed() { return this.optCollection.mapOr(adapter => adapter.numOwners > 1, false); }
    get canMirror() { return true; }
    set position(value) { __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").position.setValue(value); }
    set duration(value) { __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").duration.setValue(value); }
    set loopOffset(value) { __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").loopOffset.setValue(value); }
    set loopDuration(value) { __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").loopDuration.setValue(value); }
    copyTo(params) {
        const eventCollection = this.optCollection.unwrap("Cannot make copy without event-collection");
        const eventTarget = params?.consolidate === true
            ? eventCollection.copy().box.owners
            : eventCollection.box.owners;
        return __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxAdapters.adapterFor(ValueRegionBox.create(__classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(params?.position ?? this.position);
            box.duration.setValue(params?.duration ?? this.duration);
            box.loopOffset.setValue(params?.loopOffset ?? this.loopOffset);
            box.loopDuration.setValue(params?.loopDuration ?? this.loopDuration);
            box.hue.setValue(this.hue);
            box.label.setValue(this.label);
            box.mute.setValue(this.mute);
            box.events.refer(eventTarget);
            box.regions.refer(params?.track ?? __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").regions.targetVertex.unwrap());
        }), ValueRegionBoxAdapter);
    }
    consolidate() {
        if (!this.isMirrowed) {
            return;
        }
        this.events.ifSome(events => {
            const graph = __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxGraph;
            const collectionBox = ValueEventCollectionBox.create(graph, UUID.generate());
            events.asArray().forEach(adapter => adapter.copyTo({ events: collectionBox.events }));
            __classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").events.refer(collectionBox.owners);
        });
    }
    canFlatten(_regions) {
        return false;
        /*return regions.length > 0 && Arrays.satisfy(regions, (a, b) => a.trackAdapter.contains(b.trackAdapter.unwrap()))
                && regions.every(region => region.isSelected && region instanceof ValueRegionBoxAdapter)*/
    }
    flatten(regions) {
        if (!this.canFlatten(regions)) {
            return Option.None;
        }
        const graph = __classPrivateFieldGet(this, _ValueRegionBoxAdapter_context, "f").boxGraph;
        const sorted = regions.toSorted(RegionCollection.Comparator);
        const first = Arrays.getFirst(sorted, "Internal error (no first)");
        const last = Arrays.getLast(sorted, "Internal error (no last)");
        const rangeMin = first.position;
        const rangeMax = last.position + last.duration;
        const trackBoxAdapter = first.trackBoxAdapter.unwrap();
        const collectionBox = ValueEventCollectionBox.create(graph, UUID.generate());
        const overlapping = Array.from(trackBoxAdapter.regions.collection.iterateRange(rangeMin, rangeMax));
        overlapping
            .filter(region => region.isSelected)
            .forEach(anyRegion => {
            const region = anyRegion; // we made that sure in canFlatten
            for (const { resultStart, resultEnd, rawStart } of LoopableRegion.locateLoops(region, region.position, region.complete)) {
                const searchStart = Math.floor(resultStart - rawStart);
                const searchEnd = Math.floor(resultEnd - rawStart);
                for (const _event of region.events.unwrap().iterateRange(searchStart, searchEnd)) {
                    // TODO Flatten
                }
            }
        });
        overlapping.forEach(({ box }) => box.delete());
        return Option.wrap(ValueRegionBox.create(graph, UUID.generate(), box => {
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
    toString() { return `{ValueRegionBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _ValueRegionBoxAdapter_box, "f").address.uuid)} p: ${PPQN.toString(this.position)}, c: ${PPQN.toString(this.complete)}}`; }
}
_ValueRegionBoxAdapter_terminator = new WeakMap(), _ValueRegionBoxAdapter_context = new WeakMap(), _ValueRegionBoxAdapter_box = new WeakMap(), _ValueRegionBoxAdapter_changeNotifier = new WeakMap(), _ValueRegionBoxAdapter_isSelected = new WeakMap(), _ValueRegionBoxAdapter_isConstructing = new WeakMap(), _ValueRegionBoxAdapter_eventCollectionSubscription = new WeakMap(), _ValueRegionBoxAdapter_instances = new WeakSet(), _ValueRegionBoxAdapter_dispatchChange = function _ValueRegionBoxAdapter_dispatchChange() {
    __classPrivateFieldGet(this, _ValueRegionBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.regions?.dispatchChange();
};
