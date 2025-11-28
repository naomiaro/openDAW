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
var _NoteEventCollectionBoxAdapter_instances, _NoteEventCollectionBoxAdapter_terminator, _NoteEventCollectionBoxAdapter_context, _NoteEventCollectionBoxAdapter_box, _NoteEventCollectionBoxAdapter_changeNotifier, _NoteEventCollectionBoxAdapter_adapters, _NoteEventCollectionBoxAdapter_events, _NoteEventCollectionBoxAdapter_minPitch, _NoteEventCollectionBoxAdapter_maxPitch, _NoteEventCollectionBoxAdapter_maxDuration, _NoteEventCollectionBoxAdapter_computedExtremas, _NoteEventCollectionBoxAdapter_onEventsChanged, _NoteEventCollectionBoxAdapter_computeExtremas;
import { NoteEventBox, NoteEventCollectionBox } from "@opendaw/studio-boxes";
import { asDefined, Intervals, Iterables, Notifier, Terminator, UUID } from "@opendaw/lib-std";
import { EventCollection, NoteEvent } from "@opendaw/lib-dsp";
import { Pointers } from "@opendaw/studio-enums";
import { NoteEventBoxAdapter } from "../event/NoteEventBoxAdapter";
export class NoteEventCollectionBoxAdapter {
    constructor(context, box) {
        _NoteEventCollectionBoxAdapter_instances.add(this);
        _NoteEventCollectionBoxAdapter_terminator.set(this, new Terminator());
        _NoteEventCollectionBoxAdapter_context.set(this, void 0);
        _NoteEventCollectionBoxAdapter_box.set(this, void 0);
        _NoteEventCollectionBoxAdapter_changeNotifier.set(this, void 0);
        _NoteEventCollectionBoxAdapter_adapters.set(this, void 0);
        _NoteEventCollectionBoxAdapter_events.set(this, void 0);
        _NoteEventCollectionBoxAdapter_minPitch.set(this, 60);
        _NoteEventCollectionBoxAdapter_maxPitch.set(this, 60);
        _NoteEventCollectionBoxAdapter_maxDuration.set(this, 0);
        _NoteEventCollectionBoxAdapter_computedExtremas.set(this, false);
        __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_changeNotifier, new Notifier(), "f");
        __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_adapters, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_events, EventCollection.create(NoteEvent.Comparator), "f");
        const addNoteProcedure = (box) => {
            const adapter = asDefined(box.accept({
                visitNoteEventBox: (box) => __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(box, NoteEventBoxAdapter)
            }), `Could not find adapter for ${box}`);
            if (__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_adapters, "f").add(adapter)) {
                __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").add(adapter);
                __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_onEventsChanged).call(this);
            }
        };
        __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").events.pointerHub.incoming().forEach(({ box }) => addNoteProcedure(box));
        __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").events.pointerHub.subscribe({
            onAdded: ({ box }) => addNoteProcedure(box),
            onRemoved: ({ box: { address: { uuid } } }) => {
                __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").remove(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_adapters, "f").removeByKey(uuid));
                __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_onEventsChanged).call(this);
            }
        }));
        __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").owners.pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_changeNotifier, "f").notify(this),
            onRemoved: () => __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_changeNotifier, "f").notify(this)
        }));
    }
    copy() {
        const graph = __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_context, "f").boxGraph;
        const boxCopy = NoteEventCollectionBox.create(graph, UUID.generate());
        __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").asArray().forEach(source => source.copyTo({ events: boxCopy.events }));
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(boxCopy, NoteEventCollectionBoxAdapter);
    }
    createEvent({ position, duration, velocity, pitch, chance, playCount, cent }) {
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(NoteEventBox.create(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(position);
            box.duration.setValue(duration);
            box.velocity.setValue(velocity);
            box.pitch.setValue(pitch);
            box.chance.setValue(chance);
            box.playCount.setValue(playCount);
            box.cent.setValue(cent);
            box.events.refer(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").events);
        }), NoteEventBoxAdapter);
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_changeNotifier, "f").subscribe(observer); }
    selectable() { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").asArray(); }
    selectableAt(coordinates) {
        for (const element of __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").asArray()) { // TODO Use optimized data structures
            if (element.position <= coordinates.u && coordinates.u < element.complete && element.pitch === coordinates.v) {
                return Iterables.one(element);
            }
        }
        return Iterables.empty();
    }
    selectablesBetween(begin, end) {
        const events = [];
        for (const element of __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").asArray()) { // TODO Use optimized data structures
            if (Intervals.intersect1D(element.position, element.complete, begin.u, end.u)
                && Intervals.intersect1D(element.pitch, element.pitch, begin.v, end.v)) {
                events.push(element);
            }
        }
        return events;
    }
    requestSorting() {
        __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").onIndexingChanged();
        this.onEventPropertyChanged();
    }
    onEventPropertyChanged() { __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_onEventsChanged).call(this); }
    terminate() { __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_terminator, "f").terminate(); }
    get box() { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").address; }
    get numOwners() { return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").owners.pointerHub.filter(Pointers.NoteEventCollection).length; }
    get events() {
        if (!__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_computedExtremas, "f")) {
            __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_computeExtremas).call(this);
        }
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f");
    }
    get minPitch() {
        if (!__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_computedExtremas, "f")) {
            __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_computeExtremas).call(this);
        }
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_minPitch, "f");
    }
    get maxPitch() {
        if (!__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_computedExtremas, "f")) {
            __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_computeExtremas).call(this);
        }
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_maxPitch, "f");
    }
    get maxDuration() {
        if (!__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_computedExtremas, "f")) {
            __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_instances, "m", _NoteEventCollectionBoxAdapter_computeExtremas).call(this);
        }
        return __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_maxDuration, "f");
    }
    toString() { return `{NoteEventCollectionBox ${UUID.toString(__classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_box, "f").address.uuid)}}`; }
}
_NoteEventCollectionBoxAdapter_terminator = new WeakMap(), _NoteEventCollectionBoxAdapter_context = new WeakMap(), _NoteEventCollectionBoxAdapter_box = new WeakMap(), _NoteEventCollectionBoxAdapter_changeNotifier = new WeakMap(), _NoteEventCollectionBoxAdapter_adapters = new WeakMap(), _NoteEventCollectionBoxAdapter_events = new WeakMap(), _NoteEventCollectionBoxAdapter_minPitch = new WeakMap(), _NoteEventCollectionBoxAdapter_maxPitch = new WeakMap(), _NoteEventCollectionBoxAdapter_maxDuration = new WeakMap(), _NoteEventCollectionBoxAdapter_computedExtremas = new WeakMap(), _NoteEventCollectionBoxAdapter_instances = new WeakSet(), _NoteEventCollectionBoxAdapter_onEventsChanged = function _NoteEventCollectionBoxAdapter_onEventsChanged() {
    __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_computedExtremas, false, "f");
    __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_changeNotifier, "f").notify(this);
}, _NoteEventCollectionBoxAdapter_computeExtremas = function _NoteEventCollectionBoxAdapter_computeExtremas() {
    let min = 127 | 0;
    let max = 0 | 0;
    let maxDuration = 0;
    __classPrivateFieldGet(this, _NoteEventCollectionBoxAdapter_events, "f").asArray().forEach(({ pitch, duration }) => {
        min = Math.min(min, pitch);
        max = Math.max(max, pitch);
        maxDuration = Math.max(maxDuration, duration);
    });
    __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_minPitch, min, "f");
    __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_maxPitch, max, "f");
    __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_maxDuration, maxDuration, "f");
    __classPrivateFieldSet(this, _NoteEventCollectionBoxAdapter_computedExtremas, true, "f");
};
