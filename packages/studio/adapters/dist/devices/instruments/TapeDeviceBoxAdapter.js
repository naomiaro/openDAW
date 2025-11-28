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
var _TapeDeviceBoxAdapter_instances, _TapeDeviceBoxAdapter_context, _TapeDeviceBoxAdapter_box, _TapeDeviceBoxAdapter_parametric, _TapeDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
export class TapeDeviceBoxAdapter {
    constructor(context, box) {
        _TapeDeviceBoxAdapter_instances.add(this);
        this.type = "instrument";
        this.accepts = "audio";
        _TapeDeviceBoxAdapter_context.set(this, void 0);
        _TapeDeviceBoxAdapter_box.set(this, void 0);
        _TapeDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _TapeDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _TapeDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _TapeDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _TapeDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_instances, "m", _TapeDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Audio; }
    get enabledField() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return false; }
    deviceHost() {
        return __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _TapeDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_parametric, "f").terminate(); }
}
_TapeDeviceBoxAdapter_context = new WeakMap(), _TapeDeviceBoxAdapter_box = new WeakMap(), _TapeDeviceBoxAdapter_parametric = new WeakMap(), _TapeDeviceBoxAdapter_instances = new WeakSet(), _TapeDeviceBoxAdapter_wrapParameters = function _TapeDeviceBoxAdapter_wrapParameters(box) {
    return {
        flutter: __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_parametric, "f").createParameter(box.flutter, ValueMapping.unipolar(), StringMapping.percent(), "flutter"),
        wow: __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_parametric, "f").createParameter(box.wow, ValueMapping.unipolar(), StringMapping.percent(), "wow"),
        noise: __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_parametric, "f").createParameter(box.noise, ValueMapping.unipolar(), StringMapping.percent(), "noise"),
        saturation: __classPrivateFieldGet(this, _TapeDeviceBoxAdapter_parametric, "f").createParameter(box.saturation, ValueMapping.unipolar(), StringMapping.percent(), "saturation")
    };
};
