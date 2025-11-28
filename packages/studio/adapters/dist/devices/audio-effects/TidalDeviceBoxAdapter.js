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
var _TidalDeviceBoxAdapter_instances, _a, _TidalDeviceBoxAdapter_context, _TidalDeviceBoxAdapter_box, _TidalDeviceBoxAdapter_parametric, _TidalDeviceBoxAdapter_wrapParameters;
import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { Fraction } from "@opendaw/lib-dsp";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
export class TidalDeviceBoxAdapter {
    constructor(context, box) {
        _TidalDeviceBoxAdapter_instances.add(this);
        this.type = "audio-effect";
        this.accepts = "audio";
        _TidalDeviceBoxAdapter_context.set(this, void 0);
        _TidalDeviceBoxAdapter_box.set(this, void 0);
        _TidalDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _TidalDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _TidalDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _TidalDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _TidalDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_instances, "m", _TidalDeviceBoxAdapter_wrapParameters).call(this, box);
    }
    get box() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").address; }
    get indexField() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").index; }
    get labelField() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").label; }
    get enabledField() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").minimized; }
    get host() { return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").host; }
    deviceHost() {
        return __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _TidalDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").terminate(); }
}
_a = TidalDeviceBoxAdapter, _TidalDeviceBoxAdapter_context = new WeakMap(), _TidalDeviceBoxAdapter_box = new WeakMap(), _TidalDeviceBoxAdapter_parametric = new WeakMap(), _TidalDeviceBoxAdapter_instances = new WeakSet(), _TidalDeviceBoxAdapter_wrapParameters = function _TidalDeviceBoxAdapter_wrapParameters(box) {
    const { RateFractions, RateStringMapping } = _a;
    return {
        slope: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.slope, ValueMapping.bipolar(), StringMapping.percent({ fractionDigits: 1 }), "Slope", 0.5),
        symmetry: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.symmetry, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 1, bipolar: true }), "Symmetry", 0.5),
        rate: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.rate, ValueMapping.values(RateFractions.map((_, index) => index)), RateStringMapping, "Rate", 0.0),
        depth: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.depth, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 1 }), "Depth", 0.0),
        offset: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.offset, ValueMapping.linear(-180.0, 180.0), StringMapping.numeric({ unit: "°", fractionDigits: 0 }), "Offset", 0.5),
        channelOffset: __classPrivateFieldGet(this, _TidalDeviceBoxAdapter_parametric, "f").createParameter(box.channelOffset, ValueMapping.linear(-180.0, 180.0), StringMapping.numeric({ unit: "°", fractionDigits: 0 }), "Ch. Offset", 0.5)
    };
};
TidalDeviceBoxAdapter.RateFractions = Fraction.builder()
    .add([1, 1]).add([1, 2]).add([1, 3]).add([1, 4])
    .add([3, 16]).add([1, 6]).add([1, 8]).add([3, 32])
    .add([1, 12]).add([1, 16]).add([3, 64]).add([1, 24])
    .add([1, 32]).add([1, 48]).add([1, 64])
    .add([1, 96]).add([1, 128])
    .asDescendingArray();
TidalDeviceBoxAdapter.RateStringMapping = StringMapping.indices("", _a.RateFractions.map(([n, d]) => `${n}/${d}`));
