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
var _GrooveShuffleBoxAdapter_instances, _a, _GrooveShuffleBoxAdapter_terminator, _GrooveShuffleBoxAdapter_context, _GrooveShuffleBoxAdapter_box, _GrooveShuffleBoxAdapter_parametric, _GrooveShuffleBoxAdapter_groove, _GrooveShuffleBoxAdapter_amount, _GrooveShuffleBoxAdapter_duration, _GrooveShuffleBoxAdapter_wrapParameters;
import { moebiusEase, squashUnit, StringMapping, Terminator, ValueMapping } from "@opendaw/lib-std";
import { GroovePattern, PPQN } from "@opendaw/lib-dsp";
import { ParameterAdapterSet } from "../ParameterAdapterSet";
export class GrooveShuffleBoxAdapter {
    constructor(context, box) {
        _GrooveShuffleBoxAdapter_instances.add(this);
        this.type = "groove-adapter";
        _GrooveShuffleBoxAdapter_terminator.set(this, new Terminator());
        _GrooveShuffleBoxAdapter_context.set(this, void 0);
        _GrooveShuffleBoxAdapter_box.set(this, void 0);
        _GrooveShuffleBoxAdapter_parametric.set(this, void 0);
        _GrooveShuffleBoxAdapter_groove.set(this, new GroovePattern({
            duration: () => __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_duration, "f"),
            fx: x => moebiusEase(x, __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_amount, "f")),
            fy: y => moebiusEase(y, 1.0 - __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_amount, "f"))
        }));
        _GrooveShuffleBoxAdapter_amount.set(this, 0.0);
        _GrooveShuffleBoxAdapter_duration.set(this, PPQN.SemiQuaver * 2);
        __classPrivateFieldSet(this, _GrooveShuffleBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _GrooveShuffleBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _GrooveShuffleBoxAdapter_parametric, __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_terminator, "f").own(new ParameterAdapterSet(__classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_context, "f"))), "f");
        this.namedParameter = __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_instances, "m", _GrooveShuffleBoxAdapter_wrapParameters).call(this, box);
        __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_terminator, "f").ownAll(this.namedParameter.duration.catchupAndSubscribe(owner => __classPrivateFieldSet(this, _GrooveShuffleBoxAdapter_duration, owner.getValue(), "f")), this.namedParameter.amount.catchupAndSubscribe(owner => __classPrivateFieldSet(this, _GrooveShuffleBoxAdapter_amount, squashUnit(owner.getValue(), 0.01), "f")));
    }
    unwarp(position) { return __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_groove, "f").unwarp(position); }
    warp(position) { return __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_groove, "f").warp(position); }
    get box() { return __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_box, "f").address; }
    terminate() { __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_terminator, "f").terminate(); }
}
_a = GrooveShuffleBoxAdapter, _GrooveShuffleBoxAdapter_terminator = new WeakMap(), _GrooveShuffleBoxAdapter_context = new WeakMap(), _GrooveShuffleBoxAdapter_box = new WeakMap(), _GrooveShuffleBoxAdapter_parametric = new WeakMap(), _GrooveShuffleBoxAdapter_groove = new WeakMap(), _GrooveShuffleBoxAdapter_amount = new WeakMap(), _GrooveShuffleBoxAdapter_duration = new WeakMap(), _GrooveShuffleBoxAdapter_instances = new WeakSet(), _GrooveShuffleBoxAdapter_wrapParameters = function _GrooveShuffleBoxAdapter_wrapParameters(box) {
    return {
        duration: __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_parametric, "f").createParameter(box.duration, ValueMapping.values(_a.DurationPPQNs), StringMapping.values("", _a.DurationPPQNs, _a.DurationStrings), "duration"),
        amount: __classPrivateFieldGet(this, _GrooveShuffleBoxAdapter_parametric, "f").createParameter(box.amount, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 0 }), "amount")
    };
};
GrooveShuffleBoxAdapter.Durations = [
    [1, 8], [1, 4], [1, 4], [1, 2], [1, 1], [2, 1], [4, 1], [8, 1], [16, 1]
];
GrooveShuffleBoxAdapter.DurationPPQNs = _a.Durations.map(([n, d]) => PPQN.fromSignature(n, d));
GrooveShuffleBoxAdapter.DurationStrings = _a.Durations.map(([n, d]) => (`${n}/${d}`));
