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
var _TrackBoxAdapter_instances, _TrackBoxAdapter_context, _TrackBoxAdapter_box, _TrackBoxAdapter_terminator, _TrackBoxAdapter_clips, _TrackBoxAdapter_regions, _TrackBoxAdapter_listIndex, _TrackBoxAdapter_catchupAndSubscribeTargetDeviceName, _TrackBoxAdapter_catchupAndSubscribeTargetControlName;
import { asInstanceOf, DefaultObservableValue, isInstanceOf, Option, panic, Terminable, Terminator } from "@opendaw/lib-std";
import { StringField } from "@opendaw/lib-box";
import { UpdateClockRate } from "@opendaw/lib-dsp";
import { TrackClips } from "./TrackClips";
import { TrackRegions } from "./TrackRegions";
import { AudioUnitBoxAdapter } from "../audio-unit/AudioUnitBoxAdapter";
import { TrackType } from "./TrackType";
import { ValueClipBoxAdapter } from "./clip/ValueClipBoxAdapter";
import { ValueRegionBoxAdapter } from "./region/ValueRegionBoxAdapter";
import { AudioUnitBox } from "@opendaw/studio-boxes";
export class TrackBoxAdapter {
    constructor(context, box) {
        _TrackBoxAdapter_instances.add(this);
        _TrackBoxAdapter_context.set(this, void 0);
        _TrackBoxAdapter_box.set(this, void 0);
        _TrackBoxAdapter_terminator.set(this, void 0);
        _TrackBoxAdapter_clips.set(this, void 0);
        _TrackBoxAdapter_regions.set(this, void 0);
        _TrackBoxAdapter_listIndex.set(this, void 0);
        __classPrivateFieldSet(this, _TrackBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _TrackBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _TrackBoxAdapter_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _TrackBoxAdapter_clips, __classPrivateFieldGet(this, _TrackBoxAdapter_terminator, "f").own(new TrackClips(this, context.boxAdapters)), "f");
        __classPrivateFieldSet(this, _TrackBoxAdapter_regions, __classPrivateFieldGet(this, _TrackBoxAdapter_terminator, "f").own(new TrackRegions(this, context.boxAdapters)), "f");
        __classPrivateFieldSet(this, _TrackBoxAdapter_listIndex, __classPrivateFieldGet(this, _TrackBoxAdapter_terminator, "f").own(new DefaultObservableValue(-1)), "f");
    }
    catchupAndSubscribePath(observer) {
        const path = [Option.None, Option.None];
        const updater = () => {
            if (path.every(option => option.nonEmpty())) {
                observer(Option.wrap(path.map(option => option.unwrap())));
            }
            else {
                observer(Option.None);
            }
        };
        return Terminable.many(__classPrivateFieldGet(this, _TrackBoxAdapter_instances, "m", _TrackBoxAdapter_catchupAndSubscribeTargetDeviceName).call(this, option => {
            if (path[0].equals(option)) {
                return;
            }
            path[0] = option;
            updater();
        }), __classPrivateFieldGet(this, _TrackBoxAdapter_instances, "m", _TrackBoxAdapter_catchupAndSubscribeTargetControlName).call(this, option => {
            if (path[1].equals(option)) {
                return;
            }
            path[1] = option;
            updater();
        }));
    }
    set targetDeviceName(value) {
        __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").target.targetVertex.ifSome(targetVertex => {
            const vertex = targetVertex.box;
            if (vertex instanceof AudioUnitBox) {
                const adapter = __classPrivateFieldGet(this, _TrackBoxAdapter_context, "f").boxAdapters.adapterFor(vertex, AudioUnitBoxAdapter);
                return adapter.input.getValue().ifSome(({ labelField }) => labelField.setValue(value));
            }
            else if ("label" in vertex && vertex.label instanceof StringField) {
                return vertex.label.setValue(value);
            }
        });
    }
    get targetDeviceName() {
        return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").target.targetVertex.flatMap(targetVertex => {
            const vertex = targetVertex.box;
            if (vertex instanceof AudioUnitBox) {
                const adapter = __classPrivateFieldGet(this, _TrackBoxAdapter_context, "f").boxAdapters.adapterFor(vertex, AudioUnitBoxAdapter);
                return adapter.input.label;
            }
            else if ("label" in vertex && vertex.label instanceof StringField) {
                return Option.wrap(vertex.label.getValue());
            }
            else {
                return Option.wrap(vertex.name);
            }
        });
    }
    terminate() { __classPrivateFieldGet(this, _TrackBoxAdapter_terminator, "f").terminate(); }
    get audioUnit() { return asInstanceOf(__classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").tracks.targetVertex.unwrap().box, AudioUnitBox); }
    get target() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").target; }
    get clips() { return __classPrivateFieldGet(this, _TrackBoxAdapter_clips, "f"); }
    get regions() { return __classPrivateFieldGet(this, _TrackBoxAdapter_regions, "f"); }
    get enabled() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").enabled; }
    get indexField() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").index; }
    get type() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").type.getValue(); }
    get box() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").address; }
    get listIndex() { return __classPrivateFieldGet(this, _TrackBoxAdapter_listIndex, "f").getValue(); }
    set listIndex(value) { __classPrivateFieldGet(this, _TrackBoxAdapter_listIndex, "f").setValue(value); }
    accepts(subject) {
        switch (subject.type) {
            case "audio-clip":
                return this.type === TrackType.Audio;
            case "note-clip":
                return this.type === TrackType.Notes;
            case "value-clip":
                return this.type === TrackType.Value;
            case "audio-region":
                return this.type === TrackType.Audio;
            case "note-region":
                return this.type === TrackType.Notes;
            case "value-region":
                return this.type === TrackType.Value;
        }
    }
    valueAt(position, fallback) {
        if (!this.enabled.getValue()) {
            return fallback;
        }
        let value = fallback;
        const intervals = __classPrivateFieldGet(this, _TrackBoxAdapter_context, "f").clipSequencing.iterate(this.uuid, position, position + UpdateClockRate);
        for (const { optClip, sectionFrom } of intervals) {
            value = optClip.match({
                none: () => {
                    const region = this.regions.collection.lowerEqual(position, region => !region.mute);
                    if (region === null) {
                        const firstRegion = this.regions.collection.optAt(0);
                        return isInstanceOf(firstRegion, ValueRegionBoxAdapter) ? firstRegion.incomingValue(fallback) : fallback;
                    }
                    else if (isInstanceOf(region, ValueRegionBoxAdapter)) {
                        if (position < region.complete) {
                            return region.valueAt(position, fallback);
                        }
                        else {
                            return region.outgoingValue(fallback);
                        }
                    }
                    return fallback;
                },
                some: clip => {
                    if (sectionFrom === position) {
                        if (isInstanceOf(clip, ValueClipBoxAdapter)) {
                            return clip.valueAt(position, fallback);
                        }
                    }
                    return fallback;
                }
            });
        }
        return value;
    }
}
_TrackBoxAdapter_context = new WeakMap(), _TrackBoxAdapter_box = new WeakMap(), _TrackBoxAdapter_terminator = new WeakMap(), _TrackBoxAdapter_clips = new WeakMap(), _TrackBoxAdapter_regions = new WeakMap(), _TrackBoxAdapter_listIndex = new WeakMap(), _TrackBoxAdapter_instances = new WeakSet(), _TrackBoxAdapter_catchupAndSubscribeTargetDeviceName = function _TrackBoxAdapter_catchupAndSubscribeTargetDeviceName(observer) {
    const targetVertex = __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").target.targetVertex;
    if (targetVertex.nonEmpty()) {
        const vertex = targetVertex.unwrap().box;
        if (vertex instanceof AudioUnitBox) {
            const adapter = __classPrivateFieldGet(this, _TrackBoxAdapter_context, "f").boxAdapters.adapterFor(vertex, AudioUnitBoxAdapter);
            return adapter.input.catchupAndSubscribeLabelChange(option => observer(option));
        }
        else if ("label" in vertex && vertex.label instanceof StringField) {
            return vertex.label.catchupAndSubscribe(owner => observer(Option.wrap(owner.getValue())));
        }
        else {
            // This will probably not happen. It is just a fallback.
            observer(Option.wrap(vertex.name));
            return Terminable.Empty;
        }
    }
    observer(Option.None);
    return Terminable.Empty;
}, _TrackBoxAdapter_catchupAndSubscribeTargetControlName = function _TrackBoxAdapter_catchupAndSubscribeTargetControlName(observer) {
    const type = this.type;
    switch (type) {
        case TrackType.Audio:
        case TrackType.Notes: {
            observer(Option.wrap(TrackType[type]));
            return Terminable.Empty;
        }
        case TrackType.Value: {
            const target = __classPrivateFieldGet(this, _TrackBoxAdapter_box, "f").target.targetVertex.unwrap();
            if (target.isField()) {
                observer(__classPrivateFieldGet(this, _TrackBoxAdapter_context, "f").parameterFieldAdapters.opt(target.address).map(vertex => vertex.name));
            }
            else if (target.isBox()) {
                // I cannot think of a scenario where target is a box, but at least the UI shows the box's name
                observer(Option.wrap(target.name));
            }
            else {
                return panic("Illegal State. Vertex is not a field nor box.");
            }
            return Terminable.Empty;
        }
        case TrackType.Undefined: {
            observer(Option.wrap(""));
            return Terminable.Empty;
        }
        default: {
            observer(Option.None);
            return Terminable.Empty;
        }
    }
};
