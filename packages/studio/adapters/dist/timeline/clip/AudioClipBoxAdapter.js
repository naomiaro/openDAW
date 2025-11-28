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
var _AudioClipBoxAdapter_instances, _AudioClipBoxAdapter_terminator, _AudioClipBoxAdapter_context, _AudioClipBoxAdapter_box, _AudioClipBoxAdapter_selectedValue, _AudioClipBoxAdapter_changeNotifier, _AudioClipBoxAdapter_isConstructing, _AudioClipBoxAdapter_fileAdapter, _AudioClipBoxAdapter_fileSubscription, _AudioClipBoxAdapter_dispatchChange;
import { PPQN } from "@opendaw/lib-dsp";
import { DefaultObservableValue, Notifier, Option, safeExecute, Terminator, UUID } from "@opendaw/lib-std";
import { AudioClipBox } from "@opendaw/studio-boxes";
import { Propagation } from "@opendaw/lib-box";
import { TrackBoxAdapter } from "../TrackBoxAdapter";
import { AudioFileBoxAdapter } from "../../audio/AudioFileBoxAdapter";
export class AudioClipBoxAdapter {
    constructor(context, box) {
        _AudioClipBoxAdapter_instances.add(this);
        this.type = "audio-clip";
        _AudioClipBoxAdapter_terminator.set(this, new Terminator());
        _AudioClipBoxAdapter_context.set(this, void 0);
        _AudioClipBoxAdapter_box.set(this, void 0);
        _AudioClipBoxAdapter_selectedValue.set(this, void 0);
        _AudioClipBoxAdapter_changeNotifier.set(this, void 0);
        _AudioClipBoxAdapter_isConstructing.set(this, void 0); // Prevents stack overflow due to infinite adapter queries
        _AudioClipBoxAdapter_fileAdapter.set(this, Option.None);
        _AudioClipBoxAdapter_fileSubscription.set(this, Option.None);
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_isConstructing, true, "f");
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_selectedValue, __classPrivateFieldGet(this, _AudioClipBoxAdapter_terminator, "f").own(new DefaultObservableValue(false)), "f");
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_changeNotifier, __classPrivateFieldGet(this, _AudioClipBoxAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _AudioClipBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").pointerHub.subscribe({
            onAdded: () => __classPrivateFieldGet(this, _AudioClipBoxAdapter_instances, "m", _AudioClipBoxAdapter_dispatchChange).call(this),
            onRemoved: () => __classPrivateFieldGet(this, _AudioClipBoxAdapter_instances, "m", _AudioClipBoxAdapter_dispatchChange).call(this)
        }), __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").file.catchupAndSubscribe((pointerField) => {
            __classPrivateFieldSet(this, _AudioClipBoxAdapter_fileAdapter, pointerField.targetVertex
                .map(vertex => __classPrivateFieldGet(this, _AudioClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, AudioFileBoxAdapter)), "f");
            __classPrivateFieldGet(this, _AudioClipBoxAdapter_fileSubscription, "f").ifSome(subscription => subscription.terminate());
            __classPrivateFieldSet(this, _AudioClipBoxAdapter_fileSubscription, __classPrivateFieldGet(this, _AudioClipBoxAdapter_fileAdapter, "f").map(adapter => adapter.getOrCreateLoader().subscribe(() => __classPrivateFieldGet(this, _AudioClipBoxAdapter_instances, "m", _AudioClipBoxAdapter_dispatchChange).call(this))), "f");
        }), __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").subscribe(Propagation.Children, (_update) => __classPrivateFieldGet(this, _AudioClipBoxAdapter_instances, "m", _AudioClipBoxAdapter_dispatchChange).call(this)), {
            terminate: () => {
                __classPrivateFieldGet(this, _AudioClipBoxAdapter_fileSubscription, "f").ifSome(subscription => subscription.terminate());
                __classPrivateFieldSet(this, _AudioClipBoxAdapter_fileSubscription, Option.None, "f");
            }
        });
        __classPrivateFieldSet(this, _AudioClipBoxAdapter_isConstructing, false, "f");
    }
    catchupAndSubscribeSelected(observer) {
        return __classPrivateFieldGet(this, _AudioClipBoxAdapter_selectedValue, "f").catchupAndSubscribe(observer);
    }
    subscribeChange(observer) { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_changeNotifier, "f").subscribe(observer); }
    accept(visitor) { return safeExecute(visitor.visitAudioClipBoxAdapter, this); }
    consolidate() { }
    clone(_mirrored) {
        AudioClipBox.create(__classPrivateFieldGet(this, _AudioClipBoxAdapter_context, "f").boxGraph, UUID.generate(), box => {
            box.index.setValue(this.indexField.getValue());
            box.gain.setValue(this.gain);
            box.label.setValue(this.label);
            box.hue.setValue(this.hue);
            box.duration.setValue(this.duration);
            box.mute.setValue(this.mute);
            box.clips.refer(__classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").clips.targetVertex.unwrap());
            box.file.refer(__classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").file.targetVertex.unwrap());
            box.events.refer(__classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").events.targetVertex.unwrap());
        });
    }
    onSelected() { __classPrivateFieldGet(this, _AudioClipBoxAdapter_selectedValue, "f").setValue(true); }
    onDeselected() { __classPrivateFieldGet(this, _AudioClipBoxAdapter_selectedValue, "f").setValue(false); }
    get isSelected() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_selectedValue, "f").getValue(); }
    terminate() { __classPrivateFieldGet(this, _AudioClipBoxAdapter_terminator, "f").terminate(); }
    get box() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").index; }
    get duration() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").duration.getValue(); }
    get mute() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").mute.getValue(); }
    get hue() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").hue.getValue(); }
    get gain() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").gain.getValue(); }
    get file() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_fileAdapter, "f").unwrap("Cannot access file."); }
    get hasCollection() { return !this.optCollection.isEmpty(); }
    get optCollection() { return Option.None; }
    get label() { return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").label.getValue(); }
    get trackBoxAdapter() {
        if (__classPrivateFieldGet(this, _AudioClipBoxAdapter_isConstructing, "f")) {
            return Option.None;
        }
        return __classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").clips.targetVertex
            .map(vertex => __classPrivateFieldGet(this, _AudioClipBoxAdapter_context, "f").boxAdapters.adapterFor(vertex.box, TrackBoxAdapter));
    }
    get isMirrowed() { return false; }
    get canMirror() { return false; }
    toString() { return `{AudioClipBoxAdapter ${UUID.toString(__classPrivateFieldGet(this, _AudioClipBoxAdapter_box, "f").address.uuid)} d: ${PPQN.toString(this.duration)}}`; }
}
_AudioClipBoxAdapter_terminator = new WeakMap(), _AudioClipBoxAdapter_context = new WeakMap(), _AudioClipBoxAdapter_box = new WeakMap(), _AudioClipBoxAdapter_selectedValue = new WeakMap(), _AudioClipBoxAdapter_changeNotifier = new WeakMap(), _AudioClipBoxAdapter_isConstructing = new WeakMap(), _AudioClipBoxAdapter_fileAdapter = new WeakMap(), _AudioClipBoxAdapter_fileSubscription = new WeakMap(), _AudioClipBoxAdapter_instances = new WeakSet(), _AudioClipBoxAdapter_dispatchChange = function _AudioClipBoxAdapter_dispatchChange() {
    __classPrivateFieldGet(this, _AudioClipBoxAdapter_changeNotifier, "f").notify();
    this.trackBoxAdapter.unwrapOrNull()?.clips?.dispatchChange();
};
