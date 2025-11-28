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
var _AudioUnitInput_terminator, _AudioUnitInput_labelNotifier, _AudioUnitInput_iconValue, _AudioUnitInput_observable, _AudioUnitInput_subscription;
import { assert, DefaultObservableValue, Notifier, Option, Terminable, Terminator } from "@opendaw/lib-std";
import { AudioBusBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { IconSymbol } from "@opendaw/studio-enums";
import { AudioBusBoxAdapter } from "./AudioBusBoxAdapter";
import { Devices } from "../DeviceAdapter";
export class AudioUnitInput {
    constructor(pointerHub, boxAdapters) {
        _AudioUnitInput_terminator.set(this, void 0);
        _AudioUnitInput_labelNotifier.set(this, void 0);
        _AudioUnitInput_iconValue.set(this, void 0);
        _AudioUnitInput_observable.set(this, void 0);
        _AudioUnitInput_subscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _AudioUnitInput_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _AudioUnitInput_labelNotifier, __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldSet(this, _AudioUnitInput_iconValue, __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").own(new DefaultObservableValue(IconSymbol.Unknown)), "f");
        __classPrivateFieldSet(this, _AudioUnitInput_observable, __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").own(new DefaultObservableValue(Option.None)), "f");
        __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").own(__classPrivateFieldGet(this, _AudioUnitInput_observable, "f").subscribe(owner => {
            __classPrivateFieldGet(this, _AudioUnitInput_subscription, "f").terminate();
            __classPrivateFieldSet(this, _AudioUnitInput_subscription, owner.getValue().match({
                none: () => {
                    __classPrivateFieldGet(this, _AudioUnitInput_labelNotifier, "f").notify(Option.None);
                    return Terminable.Empty;
                },
                some: ({ labelField, iconField }) => Terminable.many(iconField.catchupAndSubscribe(field => __classPrivateFieldGet(this, _AudioUnitInput_iconValue, "f").setValue(IconSymbol.fromName(field.getValue()))), labelField.catchupAndSubscribe(field => __classPrivateFieldGet(this, _AudioUnitInput_labelNotifier, "f").notify(Option.wrap(field.getValue()))))
            }), "f");
        }));
        __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").own(pointerHub.catchupAndSubscribe({
            onAdded: ({ box }) => {
                assert(__classPrivateFieldGet(this, _AudioUnitInput_observable, "f").getValue().isEmpty(), "Already set");
                const input = box instanceof AudioBusBox
                    ? boxAdapters.adapterFor(box, AudioBusBoxAdapter)
                    : boxAdapters.adapterFor(box, Devices.isInstrument);
                if (__classPrivateFieldGet(this, _AudioUnitInput_observable, "f").getValue().unwrapOrNull() !== input) {
                    __classPrivateFieldGet(this, _AudioUnitInput_observable, "f").setValue(Option.wrap(input));
                }
            },
            onRemoved: ({ box }) => {
                assert(__classPrivateFieldGet(this, _AudioUnitInput_observable, "f").getValue().unwrap("Cannot remove").box.address
                    .equals(box.address), "Unexpected value to remove");
                __classPrivateFieldGet(this, _AudioUnitInput_observable, "f").setValue(Option.None);
            }
        }, Pointers.InstrumentHost, Pointers.AudioOutput));
    }
    getValue() { return __classPrivateFieldGet(this, _AudioUnitInput_observable, "f").getValue(); }
    subscribe(observer) {
        return __classPrivateFieldGet(this, _AudioUnitInput_observable, "f").subscribe(observer);
    }
    catchupAndSubscribe(observer) {
        observer(__classPrivateFieldGet(this, _AudioUnitInput_observable, "f"));
        return this.subscribe(observer);
    }
    catchupAndSubscribeLabelChange(observer) {
        observer(this.label);
        return __classPrivateFieldGet(this, _AudioUnitInput_labelNotifier, "f").subscribe(observer);
    }
    catchupAndSubscribeIconChange(observer) {
        return __classPrivateFieldGet(this, _AudioUnitInput_iconValue, "f").catchupAndSubscribe(observer);
    }
    set label(value) { this.getValue().ifSome(input => input.labelField.setValue(value)); }
    get label() { return this.getValue().map(input => input.labelField.getValue()); }
    set icon(value) { this.getValue().ifSome(input => input.iconField.setValue(IconSymbol.toName(value))); }
    get icon() {
        return this.getValue().match({
            none: () => IconSymbol.Unknown,
            some: input => IconSymbol.fromName(input.iconField.getValue())
        });
    }
    get iconValue() { return __classPrivateFieldGet(this, _AudioUnitInput_iconValue, "f"); }
    terminate() {
        __classPrivateFieldGet(this, _AudioUnitInput_terminator, "f").terminate();
        __classPrivateFieldGet(this, _AudioUnitInput_subscription, "f").terminate();
    }
}
_AudioUnitInput_terminator = new WeakMap(), _AudioUnitInput_labelNotifier = new WeakMap(), _AudioUnitInput_iconValue = new WeakMap(), _AudioUnitInput_observable = new WeakMap(), _AudioUnitInput_subscription = new WeakMap();
