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
var _ValueEventBoxAdapter_terminator, _ValueEventBoxAdapter_context, _ValueEventBoxAdapter_box, _ValueEventBoxAdapter_interpolation, _ValueEventBoxAdapter_interpolationSubscription, _ValueEventBoxAdapter_isSelected;
import { Arrays, Cache, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { Propagation } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { ValueEventBox } from "@opendaw/studio-boxes";
import { ValueEventCollectionBoxAdapter } from "../collection/ValueEventCollectionBoxAdapter";
import { InterpolationFieldAdapter } from "./InterpolationFieldAdapter";
export class ValueEventBoxAdapter {
    constructor(context, box) {
        this.type = "value-event";
        _ValueEventBoxAdapter_terminator.set(this, new Terminator());
        _ValueEventBoxAdapter_context.set(this, void 0);
        _ValueEventBoxAdapter_box.set(this, void 0);
        _ValueEventBoxAdapter_interpolation.set(this, void 0);
        _ValueEventBoxAdapter_interpolationSubscription.set(this, void 0);
        _ValueEventBoxAdapter_isSelected.set(this, false);
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_interpolation, __classPrivateFieldGet(this, _ValueEventBoxAdapter_terminator, "f").own(new Cache(() => InterpolationFieldAdapter.read(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation))), "f");
        const invalidateInterpolation = () => {
            __classPrivateFieldGet(this, _ValueEventBoxAdapter_interpolation, "f").invalidate();
            this.collection.ifSome(collection => collection.onEventPropertyChanged());
        };
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.collection.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const collection = this.collection.unwrap();
                const updatedFieldKeys = update.address.fieldKeys;
                const indexChanged = Arrays.equals(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").index.address.fieldKeys, updatedFieldKeys);
                const positionChanged = Arrays.equals(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").position.address.fieldKeys, updatedFieldKeys);
                if (indexChanged || positionChanged) {
                    collection.requestSorting();
                }
                else {
                    collection.onEventPropertyChanged();
                }
            }
        }), __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation.subscribe(invalidateInterpolation), __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation.pointerHub.subscribe({
            onAdded: ({ box }) => {
                __classPrivateFieldGet(this, _ValueEventBoxAdapter_interpolationSubscription, "f").terminate();
                __classPrivateFieldSet(this, _ValueEventBoxAdapter_interpolationSubscription, box.subscribe(Propagation.Children, invalidateInterpolation), "f");
                invalidateInterpolation();
            },
            onRemoved: () => {
                __classPrivateFieldGet(this, _ValueEventBoxAdapter_interpolationSubscription, "f").terminate();
                __classPrivateFieldSet(this, _ValueEventBoxAdapter_interpolationSubscription, Terminable.Empty, "f");
                invalidateInterpolation();
            }
        }));
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_interpolationSubscription, __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation.pointerHub
            .filter(Pointers.ValueInterpolation)
            .at(0)?.box
            .subscribe(Propagation.Children, invalidateInterpolation)
            ?? Terminable.Empty, "f");
    }
    onSelected() {
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_isSelected, true, "f");
        this.collection.ifSome(region => region.onEventPropertyChanged());
    }
    onDeselected() {
        __classPrivateFieldSet(this, _ValueEventBoxAdapter_isSelected, false, "f");
        this.collection.ifSome(region => region.onEventPropertyChanged());
    }
    terminate() {
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_interpolationSubscription, "f").terminate();
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_terminator, "f").terminate();
    }
    get box() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").position.getValue(); }
    get index() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").index.getValue(); }
    set interpolation(value) { InterpolationFieldAdapter.write(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation, value); }
    get interpolation() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_interpolation, "f").get(); }
    get value() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").value.getValue(); }
    get isSelected() { return __classPrivateFieldGet(this, _ValueEventBoxAdapter_isSelected, "f"); }
    get collection() {
        return __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _ValueEventBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, ValueEventCollectionBoxAdapter));
    }
    copyTo(options) {
        const eventBox = ValueEventBox.create(__classPrivateFieldGet(this, _ValueEventBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(options?.position ?? this.position);
            box.index.setValue(options?.index ?? this.index);
            box.events.refer(options?.events ?? this.collection.unwrap().box.events);
            box.value.setValue(options?.value ?? this.value);
        });
        InterpolationFieldAdapter.write(eventBox.interpolation, options?.interpolation ?? this.interpolation);
        return __classPrivateFieldGet(this, _ValueEventBoxAdapter_context, "f").boxAdapters.adapterFor(eventBox, ValueEventBoxAdapter);
    }
    copyFrom(options) {
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").position.setValue(options?.position ?? this.position);
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").index.setValue(options?.index ?? this.index);
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").events.refer(options?.events ?? this.collection.unwrap().box.events);
        __classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").value.setValue(options?.value ?? this.value);
        InterpolationFieldAdapter.write(__classPrivateFieldGet(this, _ValueEventBoxAdapter_box, "f").interpolation, options?.interpolation ?? this.interpolation);
        return this;
    }
    toString() { return `{ValueEventBoxAdapter position: ${this.position} index: ${this.index}}`; }
}
_ValueEventBoxAdapter_terminator = new WeakMap(), _ValueEventBoxAdapter_context = new WeakMap(), _ValueEventBoxAdapter_box = new WeakMap(), _ValueEventBoxAdapter_interpolation = new WeakMap(), _ValueEventBoxAdapter_interpolationSubscription = new WeakMap(), _ValueEventBoxAdapter_isSelected = new WeakMap();
ValueEventBoxAdapter.Comparator = (a, b) => {
    const positionDiff = a.position - b.position;
    if (positionDiff !== 0) {
        return positionDiff;
    }
    const indexDiff = a.index - b.index;
    if (indexDiff !== 0) {
        return indexDiff;
    }
    throw new Error(`${a} and ${b} are identical in terms of comparison`);
};
