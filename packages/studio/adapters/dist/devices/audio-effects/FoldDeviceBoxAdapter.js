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
var _FoldDeviceBoxAdapter_instances, _FoldDeviceBoxAdapter_context, _FoldDeviceBoxAdapter_box, _FoldDeviceBoxAdapter_parametric, _FoldDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class FoldDeviceBoxAdapter {
    constructor(context, box) {
        _FoldDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _FoldDeviceBoxAdapter_context.set(this, void 0);
        _FoldDeviceBoxAdapter_box.set(this, void 0);
        _FoldDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _FoldDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _FoldDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _FoldDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _FoldDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_instances, "m", _FoldDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _FoldDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_parametric, "f").terminate(); }
}
_FoldDeviceBoxAdapter_context = new WeakMap(), _FoldDeviceBoxAdapter_box = new WeakMap(), _FoldDeviceBoxAdapter_parametric = new WeakMap(), _FoldDeviceBoxAdapter_instances = new WeakSet(), _FoldDeviceBoxAdapter_wrapParameters = function _FoldDeviceBoxAdapter_wrapParameters(box) {
    return {
        drive: __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_parametric, "f").createParameter(box.drive, ValueMapping.linear(0.0, 30.0), StringMapping.decible, "Drive"),
        volume: __classPrivateFieldGet(this, _FoldDeviceBoxAdapter_parametric, "f").createParameter(box.volume, ValueMapping.linear(-18.0, 0.0), StringMapping.decible, "Volume")
    };
};
