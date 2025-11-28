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
var _AutomatableParameterFieldAdapter_context, _AutomatableParameterFieldAdapter_field, _AutomatableParameterFieldAdapter_valueMapping, _AutomatableParameterFieldAdapter_stringMapping, _AutomatableParameterFieldAdapter_name, _AutomatableParameterFieldAdapter_anchor, _AutomatableParameterFieldAdapter_terminator, _AutomatableParameterFieldAdapter_valueChangeNotifier, _AutomatableParameterFieldAdapter_controlSource, _AutomatableParameterFieldAdapter_trackBoxAdapter, _AutomatableParameterFieldAdapter_automationHandle, _AutomatableParameterFieldAdapter_controlledValue, _AutomatableParameterFieldAdapter_midiControlled;
import { assert, clamp, Listeners, Notifier, Option, panic, Terminator } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { TrackBoxAdapter } from "./timeline/TrackBoxAdapter";
const ExternalControlTypes = [
    Pointers.Automation,
    Pointers.Modulation,
    Pointers.MidiControl,
    Pointers.ParameterController
];
export class AutomatableParameterFieldAdapter {
    constructor(context, field, valueMapping, stringMapping, name, anchor) {
        _AutomatableParameterFieldAdapter_context.set(this, void 0);
        _AutomatableParameterFieldAdapter_field.set(this, void 0);
        _AutomatableParameterFieldAdapter_valueMapping.set(this, void 0);
        _AutomatableParameterFieldAdapter_stringMapping.set(this, void 0);
        _AutomatableParameterFieldAdapter_name.set(this, void 0);
        _AutomatableParameterFieldAdapter_anchor.set(this, void 0);
        _AutomatableParameterFieldAdapter_terminator.set(this, new Terminator());
        _AutomatableParameterFieldAdapter_valueChangeNotifier.set(this, void 0);
        _AutomatableParameterFieldAdapter_controlSource.set(this, void 0);
        _AutomatableParameterFieldAdapter_trackBoxAdapter.set(this, Option.None);
        _AutomatableParameterFieldAdapter_automationHandle.set(this, Option.None);
        _AutomatableParameterFieldAdapter_controlledValue.set(this, null);
        _AutomatableParameterFieldAdapter_midiControlled.set(this, false);
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_field, field, "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_valueMapping, valueMapping, "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_stringMapping, stringMapping, "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_name, name, "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_anchor, anchor ?? 0.0, "f");
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_terminator, "f").own(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_context, "f").parameterFieldAdapters.register(this));
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_valueChangeNotifier, __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_controlSource, new Listeners(), "f");
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_terminator, "f").own(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").subscribe(() => __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueChangeNotifier, "f").notify(this)));
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_terminator, "f").own(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").pointerHub.catchupAndSubscribe({
            onAdded: (pointer) => {
                __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlSource, "f").proxy.onControlSourceAdd(mapPointerToControlSource(pointer.pointerType));
                pointer.box.accept({
                    visitTrackBox: (box) => {
                        assert(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, "f").isEmpty(), "Already assigned");
                        const adapter = __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_context, "f").boxAdapters.adapterFor(box, TrackBoxAdapter);
                        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, Option.wrap(adapter), "f");
                        if (__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_context, "f").isMainThread) {
                            __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_automationHandle, Option.wrap(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_context, "f").liveStreamReceiver
                                .subscribeFloat(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").address, value => {
                                if (__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlledValue, "f") === value) {
                                    return;
                                }
                                __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_controlledValue, value, "f");
                                __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueChangeNotifier, "f").notify(this);
                            })), "f");
                        }
                    }
                });
            },
            onRemoved: (pointer) => {
                __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlSource, "f").proxy.onControlSourceRemove(mapPointerToControlSource(pointer.pointerType));
                pointer.box.accept({
                    visitTrackBox: (box) => {
                        assert(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, "f").unwrapOrNull()?.address?.equals(box.address) === true, `Unknown ${box}`);
                        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, Option.None, "f");
                        if (__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_context, "f").isMainThread) {
                            __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_automationHandle, "f").ifSome(handle => handle.terminate());
                            __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_automationHandle, Option.None, "f");
                            __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_controlledValue, null, "f");
                            __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueChangeNotifier, "f").notify(this);
                        }
                    }
                });
            }
        }, ...ExternalControlTypes));
        /*
        For debugging: It's not live because floating errors expose false positives,
            and I am too lazy to implement this in the mappings itself.
        */
        if (field.getValue() !== valueMapping.clamp(field.getValue())) {
            console.warn(`${name} (${field.getValue()}) is out of bounds`, "constraints" in field ? field["constraints"] : "no constraints", valueMapping, field.address.fieldKeys.join(", "), field.box.name);
        }
    }
    registerMidiControl() {
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlSource, "f").proxy.onControlSourceAdd("midi");
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_midiControlled, true, "f");
        return {
            terminate: () => {
                __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_midiControlled, false, "f");
                __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlSource, "f").proxy.onControlSourceRemove("midi");
            }
        };
    }
    get field() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f"); }
    get valueMapping() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueMapping, "f"); }
    get stringMapping() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_stringMapping, "f"); }
    get name() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_name, "f"); }
    get anchor() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_anchor, "f"); }
    get type() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").type; }
    get address() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").address; }
    get track() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, "f"); }
    valueAt(position) {
        const optTrack = __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_trackBoxAdapter, "f");
        if (optTrack.nonEmpty()) {
            const track = optTrack.unwrap();
            if (track.enabled) {
                return this.valueMapping.y(track.valueAt(position, this.getUnitValue()));
            }
        }
        return this.getValue();
    }
    subscribe(observer) { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueChangeNotifier, "f").subscribe(observer); }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    catchupAndSubscribeControlSources(observer) {
        if (__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_midiControlled, "f")) {
            observer.onControlSourceAdd("midi");
        }
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").pointerHub.filter(...ExternalControlTypes)
            .forEach(pointer => observer.onControlSourceAdd(mapPointerToControlSource(pointer.pointerType)));
        return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlSource, "f").subscribe(observer);
    }
    getValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").getValue(); }
    setValue(value) { __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").setValue(value); }
    setUnitValue(value) { this.setValue(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueMapping, "f").y(value)); }
    getUnitValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueMapping, "f").x(this.getValue()); }
    getControlledValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueMapping, "f").y(this.getControlledUnitValue()); }
    getControlledUnitValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_controlledValue, "f") ?? this.getUnitValue(); }
    getControlledPrintValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_stringMapping, "f").x(this.getControlledValue()); }
    getPrintValue() { return __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_stringMapping, "f").x(this.getValue()); }
    setPrintValue(text) {
        const result = __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_stringMapping, "f").y(text);
        if (result.type === "unitValue") {
            this.setUnitValue(clamp(result.value, 0.0, 1.0));
        }
        else if (result.type === "explicit") {
            this.setValue(this.valueMapping.clamp(result.value));
        }
        else {
            console.debug(`Unknown text input: '${result.value}'`);
        }
    }
    reset() { this.setValue(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_valueMapping, "f").clamp(__classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_field, "f").initValue)); }
    terminate() {
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_automationHandle, "f").ifSome(handle => handle.terminate());
        __classPrivateFieldSet(this, _AutomatableParameterFieldAdapter_automationHandle, Option.None, "f");
        __classPrivateFieldGet(this, _AutomatableParameterFieldAdapter_terminator, "f").terminate();
    }
}
_AutomatableParameterFieldAdapter_context = new WeakMap(), _AutomatableParameterFieldAdapter_field = new WeakMap(), _AutomatableParameterFieldAdapter_valueMapping = new WeakMap(), _AutomatableParameterFieldAdapter_stringMapping = new WeakMap(), _AutomatableParameterFieldAdapter_name = new WeakMap(), _AutomatableParameterFieldAdapter_anchor = new WeakMap(), _AutomatableParameterFieldAdapter_terminator = new WeakMap(), _AutomatableParameterFieldAdapter_valueChangeNotifier = new WeakMap(), _AutomatableParameterFieldAdapter_controlSource = new WeakMap(), _AutomatableParameterFieldAdapter_trackBoxAdapter = new WeakMap(), _AutomatableParameterFieldAdapter_automationHandle = new WeakMap(), _AutomatableParameterFieldAdapter_controlledValue = new WeakMap(), _AutomatableParameterFieldAdapter_midiControlled = new WeakMap();
const mapPointerToControlSource = (pointer) => {
    switch (pointer) {
        case Pointers.Automation:
            return "automated";
        case Pointers.Modulation:
            return "modulated";
        case Pointers.MidiControl:
            return "midi";
        case Pointers.ParameterController:
            return "external";
        default:
            return panic(`${pointer.toString()} is an unknown pointer type`);
    }
};
