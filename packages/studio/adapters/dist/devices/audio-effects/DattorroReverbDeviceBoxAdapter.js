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
var _DattorroReverbDeviceBoxAdapter_instances, _DattorroReverbDeviceBoxAdapter_context, _DattorroReverbDeviceBoxAdapter_box, _DattorroReverbDeviceBoxAdapter_parametric, _DattorroReverbDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class DattorroReverbDeviceBoxAdapter {
    constructor(context, box) {
        _DattorroReverbDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _DattorroReverbDeviceBoxAdapter_context.set(this, void 0);
        _DattorroReverbDeviceBoxAdapter_box.set(this, void 0);
        _DattorroReverbDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _DattorroReverbDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _DattorroReverbDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _DattorroReverbDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_instances, "m", _DattorroReverbDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").terminate(); }
}
_DattorroReverbDeviceBoxAdapter_context = new WeakMap(), _DattorroReverbDeviceBoxAdapter_box = new WeakMap(), _DattorroReverbDeviceBoxAdapter_parametric = new WeakMap(), _DattorroReverbDeviceBoxAdapter_instances = new WeakSet(), _DattorroReverbDeviceBoxAdapter_wrapParameters = function _DattorroReverbDeviceBoxAdapter_wrapParameters(box) {
    return {
        preDelay: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.preDelay, ValueMapping.linear(0.0, 1000.0), StringMapping.numeric({ unit: box.preDelay.unit }), "Pre-Delay"),
        bandwidth: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.bandwidth, ValueMapping.unipolar(), StringMapping.percent(), "Bandwidth"),
        inputDiffusion1: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.inputDiffusion1, ValueMapping.unipolar(), StringMapping.percent(), "Tank 1"),
        inputDiffusion2: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.inputDiffusion2, ValueMapping.unipolar(), StringMapping.percent(), "Tank 2"),
        decay: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.decay, ValueMapping.unipolar(), StringMapping.percent(), "Decay"),
        decayDiffusion1: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.decayDiffusion1, ValueMapping.unipolar(), StringMapping.percent(), "Tank 1"),
        decayDiffusion2: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.decayDiffusion2, ValueMapping.unipolar(), StringMapping.percent(), "Tank 2"),
        damping: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.damping, ValueMapping.unipolar(), StringMapping.percent(), "Damping"),
        excursionRate: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.excursionRate, ValueMapping.unipolar(), StringMapping.numeric({ unit: box.excursionRate.unit }), "Rate"),
        excursionDepth: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.excursionDepth, ValueMapping.unipolar(), StringMapping.numeric({ unit: box.excursionDepth.unit }), "Depth"),
        wet: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.wet, ValueMapping.DefaultDecibel, StringMapping.decible, "Wet"),
        dry: __classPrivateFieldGet(this, _DattorroReverbDeviceBoxAdapter_parametric, "f").createParameter(box.dry, ValueMapping.DefaultDecibel, StringMapping.decible, "Dry")
    };
};
