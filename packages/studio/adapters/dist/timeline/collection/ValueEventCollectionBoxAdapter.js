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
var _ValueEventCollectionBoxAdapter_instances, _ValueEventCollectionBoxAdapter_terminator, _ValueEventCollectionBoxAdapter_context, _ValueEventCollectionBoxAdapter_box, _ValueEventCollectionBoxAdapter_changeNotifier, _ValueEventCollectionBoxAdapter_adapters, _ValueEventCollectionBoxAdapter_events, _ValueEventCollectionBoxAdapter_onEventsChanged;
import { ValueEventBox, ValueEventCollectionBox } from "@opendaw/studio-boxes";
import { asDefined, Curve, linear, Notifier, Option, panic, Terminator, UUID } from "@opendaw/lib-std";
import { EventCollection, Interpolation, ValueEvent } from "@opendaw/lib-dsp";
import { Pointers } from "@opendaw/studio-enums";
import { ValueEventBoxAdapter } from "../event/ValueEventBoxAdapter";
import { InterpolationFieldAdapter } from "../event/InterpolationFieldAdapter";
export class ValueEventCollectionBoxAdapter {
    constructor(context, box) {
        _ValueEventCollectionBoxAdapter_instances.add(this);
        _ValueEventCollectionBoxAdapter_terminator.set(this, new Terminator());
        _ValueEventCollectionBoxAdapter_context.set(this, void 0);
        _ValueEventCollectionBoxAdapter_box.set(this, void 0);
        _ValueEventCollectionBoxAdapter_changeNotifier.set(this, void 0);
        _ValueEventCollectionBoxAdapter_adapters.set(this, void 0);
        _ValueEventCollectionBoxAdapter_events.set(this, void 0);
        __classPrivateFieldSet(this, _ValueEventCollectionBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ValueEventCollectionBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ValueEventCollectionBoxAdapter_changeNotifier, new Notifier(), "f");
        __classPrivateFieldSet(this, _ValueEventCollectionBoxAdapter_adapters, UUID.newSet(adapter => adapter.uuid), "f");
        __classPrivateFieldSet(this, _ValueEventCollectionBoxAdapter_events, EventCollection.create(ValueEventBoxAdapter.Comparator), "f");
        const addValueProcedure = (box) => {
            const adapter = asDefined(box.accept({
                visitValueEventBox: (box) => __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(box, ValueEventBoxAdapter)
            }), `Could not find adapter for ${box}`);
            if (__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_adapters, "f").add(adapter)) {
                __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f").add(adapter);
                __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_instances, "m", _ValueEventCollectionBoxAdapter_onEventsChanged).call(this);
            }
        };
        __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").events.pointerHub.incoming().forEach(({ box }) => addValueProcedure(box));
        __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").events.pointerHub.subscribe({
            onAdded: ({ box }) => addValueProcedure(box),
            onRemoved: ({ box: { address: { uuid } } }) => {
                __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f").remove(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_adapters, "f").removeByKey(uuid));
                __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_instances, "m", _ValueEventCollectionBoxAdapter_onEventsChanged).call(this);
            }
        }));
        __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_terminator, "f").own(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").owners.pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_changeNotifier, "f").notify(this),
            onRemoved: () => __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_changeNotifier, "f").notify(this)
        }));
    }
    valueAt(position, fallback) { return ValueEvent.valueAt(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f"), position, fallback); }
    copy() {
        const graph = __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_context, "f").boxGraph;
        const boxCopy = ValueEventCollectionBox.create(graph, UUID.generate());
        __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f").asArray().forEach(source => source.copyTo({ events: boxCopy.events }));
        return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(boxCopy, ValueEventCollectionBoxAdapter);
    }
    cut(position) {
        const low = this.events.lowerEqual(position);
        const high = this.events.greaterEqual(position);
        if (null === high) {
            if (null === low) {
                return Option.None;
            }
            return Option.wrap(this.createEvent({
                position,
                value: low.value,
                index: low.index,
                interpolation: low.interpolation
            }));
        }
        if (null === low) {
            return Option.wrap(this.createEvent({
                position,
                value: high.value,
                index: high.index,
                interpolation: high.interpolation
            }));
        }
        if (low.position === position) {
            return Option.wrap(low);
        }
        if (low.interpolation.type === "none") {
            return Option.wrap(this.createEvent({
                position,
                value: low.value,
                index: low.index,
                interpolation: low.interpolation
            }));
        }
        if (low.interpolation.type === "linear") {
            const { position: p0, value: v0 } = low;
            const { position: p1, value: v1 } = high;
            return Option.wrap(this.createEvent({
                position,
                value: linear(v0, v1, (position - p0) / (p1 - p0)),
                index: 0,
                interpolation: low.interpolation
            }));
        }
        if (low.interpolation.type === "curve") {
            const { position: p0, value: y0 } = low;
            const { position: p1, value: y1 } = high;
            const steps = p1 - p0;
            const cutOffset = position - p0;
            const curve = Curve.byHalf(steps, y0, Curve.valueAt({
                slope: low.interpolation.slope,
                steps,
                y0,
                y1
            }, steps * 0.5), y1);
            const cutValue = Curve.valueAt(curve, cutOffset);
            const lowSlope = Curve.slopeByHalf(y0, Curve.valueAt(curve, cutOffset * 0.5), cutValue);
            InterpolationFieldAdapter.write(low.box.interpolation, Interpolation.Curve(lowSlope));
            return Option.wrap(this.createEvent({
                position,
                value: cutValue,
                index: 0,
                interpolation: Interpolation.Curve(Curve.slopeByHalf(cutValue, Curve.valueAt(curve, (cutOffset + steps) * 0.5), y1))
            }));
        }
        return panic("Unknown interpolation type");
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_changeNotifier, "f").subscribe(observer); }
    createEvent({ position, index, value, interpolation }) {
        const eventBox = ValueEventBox.create(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(position);
            box.index.setValue(index);
            box.value.setValue(value);
            box.events.refer(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").events);
        });
        InterpolationFieldAdapter.write(eventBox.interpolation, interpolation);
        return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_context, "f").boxAdapters.adapterFor(eventBox, ValueEventBoxAdapter);
    }
    requestSorting() {
        __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f").onIndexingChanged();
        this.onEventPropertyChanged();
    }
    onEventPropertyChanged() { __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_instances, "m", _ValueEventCollectionBoxAdapter_onEventsChanged).call(this); }
    terminate() { __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_terminator, "f").terminate(); }
    get box() { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").address; }
    get numOwners() { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").owners.pointerHub.filter(Pointers.ValueEventCollection).length; }
    get events() { return __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_events, "f"); }
    toString() { return `{ValueEventCollectionBox ${UUID.toString(__classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_box, "f").address.uuid)}}`; }
}
_ValueEventCollectionBoxAdapter_terminator = new WeakMap(), _ValueEventCollectionBoxAdapter_context = new WeakMap(), _ValueEventCollectionBoxAdapter_box = new WeakMap(), _ValueEventCollectionBoxAdapter_changeNotifier = new WeakMap(), _ValueEventCollectionBoxAdapter_adapters = new WeakMap(), _ValueEventCollectionBoxAdapter_events = new WeakMap(), _ValueEventCollectionBoxAdapter_instances = new WeakSet(), _ValueEventCollectionBoxAdapter_onEventsChanged = function _ValueEventCollectionBoxAdapter_onEventsChanged() { __classPrivateFieldGet(this, _ValueEventCollectionBoxAdapter_changeNotifier, "f").notify(this); };
