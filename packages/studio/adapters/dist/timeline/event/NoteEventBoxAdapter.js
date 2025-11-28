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
var _NoteEventBoxAdapter_context, _NoteEventBoxAdapter_box, _NoteEventBoxAdapter_subscription, _NoteEventBoxAdapter_isSelected;
import { NoteEvent } from "@opendaw/lib-dsp";
import { Arrays, UUID } from "@opendaw/lib-std";
import { NoteEventBox } from "@opendaw/studio-boxes";
import { Propagation } from "@opendaw/lib-box";
import { NoteEventCollectionBoxAdapter } from "../collection/NoteEventCollectionBoxAdapter";
export class NoteEventBoxAdapter {
    constructor(context, box) {
        this.type = "note-event";
        _NoteEventBoxAdapter_context.set(this, void 0);
        _NoteEventBoxAdapter_box.set(this, void 0);
        _NoteEventBoxAdapter_subscription.set(this, void 0);
        _NoteEventBoxAdapter_isSelected.set(this, false);
        __classPrivateFieldSet(this, _NoteEventBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _NoteEventBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _NoteEventBoxAdapter_subscription, __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").subscribe(Propagation.Children, (update) => {
            if (this.collection.isEmpty()) {
                return;
            }
            if (update.type === "primitive" || update.type === "pointer") {
                const collection = this.collection.unwrap();
                const updatedFieldKeys = update.address.fieldKeys;
                const pitchChanged = Arrays.equals(__classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").pitch.address.fieldKeys, updatedFieldKeys);
                const positionChanged = Arrays.equals(__classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").position.address.fieldKeys, updatedFieldKeys);
                if (pitchChanged || positionChanged) {
                    collection.requestSorting();
                }
                else {
                    collection.onEventPropertyChanged();
                }
            }
        }), "f");
    }
    onSelected() {
        __classPrivateFieldSet(this, _NoteEventBoxAdapter_isSelected, true, "f");
        this.collection.ifSome(region => region.onEventPropertyChanged());
    }
    onDeselected() {
        __classPrivateFieldSet(this, _NoteEventBoxAdapter_isSelected, false, "f");
        this.collection.ifSome(region => region.onEventPropertyChanged());
    }
    terminate() { __classPrivateFieldGet(this, _NoteEventBoxAdapter_subscription, "f").terminate(); }
    get box() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").address; }
    get position() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").position.getValue(); }
    get duration() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").duration.getValue(); }
    get complete() { return this.position + this.duration; }
    get velocity() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").velocity.getValue(); } // 0.0...1.0
    get pitch() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").pitch.getValue(); } // 0...127
    get cent() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").cent.getValue(); } // -50.0...+50.0
    get chance() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").chance.getValue(); } // 0...100%
    get playCount() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").playCount.getValue(); } // 1...16
    get playCurve() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").playCurve.getValue(); } // -1...+1
    get isSelected() { return __classPrivateFieldGet(this, _NoteEventBoxAdapter_isSelected, "f"); }
    get collection() {
        return __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").events.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _NoteEventBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, NoteEventCollectionBoxAdapter));
    }
    normalizedPitch() {
        if (this.collection.isEmpty()) {
            return 0.5;
        }
        const { minPitch, maxPitch } = this.collection.unwrap();
        return minPitch === maxPitch ? 0.5 : 1.0 - (this.pitch - minPitch) / (maxPitch - minPitch);
    }
    copyAsNoteEvent() {
        return {
            type: "note-event",
            position: this.position,
            duration: this.duration,
            pitch: this.pitch,
            cent: this.cent,
            velocity: this.velocity
        };
    }
    copyTo(options) {
        return __classPrivateFieldGet(this, _NoteEventBoxAdapter_context, "f").boxAdapters.adapterFor(NoteEventBox.create(__classPrivateFieldGet(this, _NoteEventBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.position.setValue(options?.position ?? this.position);
            box.duration.setValue(options?.duration ?? this.duration);
            box.pitch.setValue(options?.pitch ?? this.pitch);
            box.playCount.setValue(options?.playCount ?? this.playCount);
            box.events.refer(options?.events ?? this.collection.unwrap().box.events);
            box.velocity.setValue(this.velocity);
            box.cent.setValue(this.cent);
            box.chance.setValue(this.chance);
        }), NoteEventBoxAdapter);
    }
    computeCurveValue(ratio) { return NoteEvent.curveFunc(ratio, this.playCurve); }
    canConsolidate() { return this.playCount > 1; }
    consolidate() {
        const playCount = this.playCount;
        const events = this.collection.unwrap().box.events;
        const adapters = Arrays.create((index) => {
            const a = Math.floor(this.computeCurveValue(index / playCount) * this.duration);
            const b = Math.floor(this.computeCurveValue((index + 1) / playCount) * this.duration);
            return this.copyTo({
                position: Math.floor(this.position + a),
                duration: Math.max(1, b - a),
                playCount: 1,
                events
            });
        }, playCount);
        __classPrivateFieldGet(this, _NoteEventBoxAdapter_box, "f").delete();
        return adapters;
    }
}
_NoteEventBoxAdapter_context = new WeakMap(), _NoteEventBoxAdapter_box = new WeakMap(), _NoteEventBoxAdapter_subscription = new WeakMap(), _NoteEventBoxAdapter_isSelected = new WeakMap();
