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
var _SoundfontDeviceBoxAdapter_instances, _SoundfontDeviceBoxAdapter_terminator, _SoundfontDeviceBoxAdapter_context, _SoundfontDeviceBoxAdapter_box, _SoundfontDeviceBoxAdapter_parametric, _SoundfontDeviceBoxAdapter_loader, _SoundfontDeviceBoxAdapter_soundfont, _SoundfontDeviceBoxAdapter_preset, _SoundfontDeviceBoxAdapter_loaderSubscription, _SoundfontDeviceBoxAdapter_wrapParameters, _SoundfontDeviceBoxAdapter_loaderObserver;
import { MutableObservableOption, Terminable, Terminator } from "@opendaw/lib-std";
import { Devices } from "../../DeviceAdapter";
import { ParameterAdapterSet } from "../../ParameterAdapterSet";
import { TrackType } from "../../timeline/TrackType";
export class SoundfontDeviceBoxAdapter {
    constructor(context, box) {
        _SoundfontDeviceBoxAdapter_instances.add(this);
        this.type = "instrument";
        this.accepts = "midi";
        _SoundfontDeviceBoxAdapter_terminator.set(this, new Terminator());
        _SoundfontDeviceBoxAdapter_context.set(this, void 0);
        _SoundfontDeviceBoxAdapter_box.set(this, void 0);
        _SoundfontDeviceBoxAdapter_parametric.set(this, void 0);
        _SoundfontDeviceBoxAdapter_loader.set(this, void 0);
        _SoundfontDeviceBoxAdapter_soundfont.set(this, void 0);
        _SoundfontDeviceBoxAdapter_preset.set(this, void 0);
        _SoundfontDeviceBoxAdapter_loaderSubscription.set(this, Terminable.Empty);
        _SoundfontDeviceBoxAdapter_loaderObserver.set(this, (loader) => loader.match({
            none: () => {
                __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").clear();
                __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").clear();
            },
            some: loader => loader.soundfont.match({
                none: () => {
                    __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").clear();
                    __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").clear();
                    __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loaderSubscription, "f").terminate();
                    __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_loaderSubscription, loader.subscribe(state => {
                        if (state.type === "loaded") {
                            const soundfont = loader.soundfont.unwrap();
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").wrap(soundfont.presets[this.presetIndex] ?? soundfont.presets[0]);
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").wrap(soundfont);
                        }
                        else if (state.type === "error") {
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").clear();
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").clear();
                        }
                        else if (state.type === "idle") {
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").clear();
                            __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").clear();
                        }
                    }), "f");
                },
                some: soundfont => {
                    __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").wrap(soundfont);
                    __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").wrap(soundfont.presets[this.presetIndex] ?? soundfont.presets[0]);
                }
            })
        }));
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_parametric, new ParameterAdapterSet(__classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_context, "f")), "f");
        this.namedParameter = __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_instances, "m", _SoundfontDeviceBoxAdapter_wrapParameters).call(this, box);
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_loader, new MutableObservableOption(), "f");
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_soundfont, new MutableObservableOption(), "f");
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_preset, new MutableObservableOption(), "f");
        __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_terminator, "f").ownAll(__classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loader, "f").subscribe(__classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loaderObserver, "f")), __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").file.catchupAndSubscribe(({ targetVertex }) => __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loader, "f").wrapOption(targetVertex.map(({ box }) => context.soundfontManager.getOrCreate(box.address.uuid)))), __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").presetIndex.catchupAndSubscribe(owner => __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f").match({
            none: () => __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").clear(),
            some: soundfont => __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f").wrap(soundfont.presets[owner.getValue()] ?? soundfont.presets[0])
        })));
    }
    get loader() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loader, "f"); }
    get soundfont() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_soundfont, "f"); }
    get preset() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_preset, "f"); }
    get presetIndex() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").presetIndex.getValue(); }
    get box() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f"); }
    get uuid() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").address; }
    get labelField() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").label; }
    get iconField() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").icon; }
    get defaultTrackType() { return TrackType.Notes; }
    get enabledField() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").enabled; }
    get minimizedField() { return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").minimized; }
    get acceptsMidiEvents() { return true; }
    deviceHost() {
        return __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_box, "f").host.targetVertex.unwrap("no device-host").box, Devices.isHost);
    }
    audioUnitBoxAdapter() { return this.deviceHost().audioUnitBoxAdapter(); }
    terminate() {
        __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_loaderSubscription, "f").terminate();
        __classPrivateFieldSet(this, _SoundfontDeviceBoxAdapter_loaderSubscription, Terminable.Empty, "f");
        __classPrivateFieldGet(this, _SoundfontDeviceBoxAdapter_parametric, "f").terminate();
    }
}
_SoundfontDeviceBoxAdapter_terminator = new WeakMap(), _SoundfontDeviceBoxAdapter_context = new WeakMap(), _SoundfontDeviceBoxAdapter_box = new WeakMap(), _SoundfontDeviceBoxAdapter_parametric = new WeakMap(), _SoundfontDeviceBoxAdapter_loader = new WeakMap(), _SoundfontDeviceBoxAdapter_soundfont = new WeakMap(), _SoundfontDeviceBoxAdapter_preset = new WeakMap(), _SoundfontDeviceBoxAdapter_loaderSubscription = new WeakMap(), _SoundfontDeviceBoxAdapter_loaderObserver = new WeakMap(), _SoundfontDeviceBoxAdapter_instances = new WeakSet(), _SoundfontDeviceBoxAdapter_wrapParameters = function _SoundfontDeviceBoxAdapter_wrapParameters(_box) {
    return {};
};
