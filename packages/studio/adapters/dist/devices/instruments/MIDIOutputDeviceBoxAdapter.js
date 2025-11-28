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
var _MIDIOutputDeviceBoxAdapter_terminator, _MIDIOutputDeviceBoxAdapter_context, _MIDIOutputDeviceBoxAdapter_box, _MIDIOutputDeviceBoxAdapter_midiDevice, _MIDIOutputDeviceBoxAdapter_parametric;
import { asInstanceOf, MutableObservableOption, StringMapping, Terminator, ValueMapping } from "@opendaw/lib-std";
import { MIDIOutputBox, MIDIOutputParameterBox } from "@opendaw/studio-boxes";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
export class MIDIOutputDeviceBoxAdapter {
    constructor(context, box) {
        _MIDIOutputDeviceBoxAdapter_terminator.set(this, new Terminator());
        this.type = "instrument";
        this.accepts = "midi";
        _MIDIOutputDeviceBoxAdapter_context.set(this, void 0);
        _MIDIOutputDeviceBoxAdapter_box.set(this, void 0);
        _MIDIOutputDeviceBoxAdapter_midiDevice.set(this, void 0);
        _MIDIOutputDeviceBoxAdapter_parametric.set(this, void 0);
        __classPrivateFieldSet(this, _MIDIOutputDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _MIDIOutputDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _MIDIOutputDeviceBoxAdapter_midiDevice, new MutableObservableOption(), "f");
        __classPrivateFieldSet(this, _MIDIOutputDeviceBoxAdapter_parametric, __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_terminator, "f").own(new ParameterAdapterSet(__classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_context, "f"))), "f");
        __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_terminator, "f").ownAll(box.parameters.pointerHub.catchupAndSubscribe({
            onAdded: (({ box }) => __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_parametric, "f")
                .createParameter(asInstanceOf(box, MIDIOutputParameterBox).value, ValueMapping.unipolar(), StringMapping.percent({ fractionDigits: 1 }), "", 0.0)),
            onRemoved: (({ box }) => __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_parametric, "f")
                .removeParameter(asInstanceOf(box, MIDIOutputParameterBox).value.address))
        }), __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").device.catchupAndSubscribe(({ targetVertex }) => targetVertex.match({
            none: () => __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_midiDevice, "f").clear(),
            some: ({ box }) => __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_midiDevice, "f").wrap(asInstanceOf(box, MIDIOutputBox))
        })));
    }
    get box() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get enabledField() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return true; }
    get parameters() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_parametric, "f"); }
    get midiDevice() { return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_midiDevice, "f"); }
    deviceHost() {
        return __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() { __classPrivateFieldGet(this, _MIDIOutputDeviceBoxAdapter_terminator, "f").terminate(); }
}
_MIDIOutputDeviceBoxAdapter_terminator = new WeakMap(), _MIDIOutputDeviceBoxAdapter_context = new WeakMap(), _MIDIOutputDeviceBoxAdapter_box = new WeakMap(), _MIDIOutputDeviceBoxAdapter_midiDevice = new WeakMap(), _MIDIOutputDeviceBoxAdapter_parametric = new WeakMap();
