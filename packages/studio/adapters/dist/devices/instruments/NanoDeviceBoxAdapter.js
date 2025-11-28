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
var _NanoDeviceBoxAdapter_instances, _NanoDeviceBoxAdapter_context, _NanoDeviceBoxAdapter_box, _NanoDeviceBoxAdapter_parametric, _NanoDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
export class NanoDeviceBoxAdapter {
    constructor(context, box) {
        _NanoDeviceBoxAdapter_instances.add(this);
        this.type = "instrument";
        this.accepts = "midi";
        _NanoDeviceBoxAdapter_context.set(this, void 0);
        _NanoDeviceBoxAdapter_box.set(this, void 0);
        _NanoDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _NanoDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _NanoDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _NanoDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _NanoDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_instances, "m", _NanoDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get enabledField() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return true; }
    deviceHost() {
        return __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _NanoDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_parametric, "f").terminate(); }
}
_NanoDeviceBoxAdapter_context = new WeakMap(), _NanoDeviceBoxAdapter_box = new WeakMap(), _NanoDeviceBoxAdapter_parametric = new WeakMap(), _NanoDeviceBoxAdapter_instances = new WeakSet(), _NanoDeviceBoxAdapter_wrapParameters = function _NanoDeviceBoxAdapter_wrapParameters(box) {
    return {
        volume: __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_parametric, "f").createParameter(box.volume, ValueMapping.DefaultDecibel, StringMapping.numeric({ unit: "db", fractionDigits: 1 }), "volume"),
        release: __classPrivateFieldGet(this, _NanoDeviceBoxAdapter_parametric, "f").createParameter(box.release, ValueMapping.exponential(0.001, 8.0), StringMapping.numeric({ unit: "s", fractionDigits: 3 }), "release")
    };
};
