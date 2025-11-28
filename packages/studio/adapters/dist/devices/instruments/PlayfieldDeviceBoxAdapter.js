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
var _PlayfieldDeviceBoxAdapter_context, _PlayfieldDeviceBoxAdapter_box, _PlayfieldDeviceBoxAdapter_samples, _PlayfieldDeviceBoxAdapter_parametric;
import { Pointers } from "@opendaw/studio-enums";
import { Devices } from "../../DeviceAdapter";
import { IndexedBoxAdapterCollection } from "../../IndexedBoxAdapterCollection";
import { PlayfieldSampleBoxAdapter } from "./Playfield/PlayfieldSampleBoxAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
export class PlayfieldDeviceBoxAdapter {
    constructor(context, box) {
        this.type = "instrument";
        this.accepts = "midi";
        _PlayfieldDeviceBoxAdapter_context.set(this, void 0);
        _PlayfieldDeviceBoxAdapter_box.set(this, void 0);
        _PlayfieldDeviceBoxAdapter_samples.set(this, void 0);
        _PlayfieldDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _PlayfieldDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _PlayfieldDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _PlayfieldDeviceBoxAdapter_samples, IndexedBoxAdapterCollection.create(box.samples, box => context.boxAdapters.adapterFor(box, PlayfieldSampleBoxAdapter), Pointers.Sample), "f");
        __classPrivateFieldSet(this, _PlayfieldDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_context, "f")), "f");
    }
    reset() { __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_samples, "f").adapters().forEach(adapter => adapter.box.delete()); }
    get box() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get enabledField() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return true; }
    get samples() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_samples, "f"); }
    get context() { return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_context, "f"); }
    deviceHost() {
        return __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _PlayfieldDeviceBoxAdapter_parametric, "f").terminate(); }
}
_PlayfieldDeviceBoxAdapter_context = new WeakMap(), _PlayfieldDeviceBoxAdapter_box = new WeakMap(), _PlayfieldDeviceBoxAdapter_samples = new WeakMap(), _PlayfieldDeviceBoxAdapter_parametric = new WeakMap();
