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
var _AudioUnitOutput_pointerField, _AudioUnitOutput_boxAdapters, _AudioUnitOutput_terminator, _AudioUnitOutput_busChangeNotifier, _AudioUnitOutput_subscription;
import { Notifier, Option, Terminable, Terminator } from "@opendaw/lib-std";
import { AudioBusBoxAdapter } from "./AudioBusBoxAdapter";
export class AudioUnitOutput {
    constructor(pointerField, boxAdapters) {
        _AudioUnitOutput_pointerField.set(this, void 0);
        _AudioUnitOutput_boxAdapters.set(this, void 0);
        _AudioUnitOutput_terminator.set(this, void 0);
        _AudioUnitOutput_busChangeNotifier.set(this, void 0);
        _AudioUnitOutput_subscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _AudioUnitOutput_pointerField, pointerField, "f");
        __classPrivateFieldSet(this, _AudioUnitOutput_boxAdapters, boxAdapters, "f");
        __classPrivateFieldSet(this, _AudioUnitOutput_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _AudioUnitOutput_busChangeNotifier, __classPrivateFieldGet(this, _AudioUnitOutput_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _AudioUnitOutput_terminator, "f").own(pointerField.catchupAndSubscribe(() => {
            __classPrivateFieldGet(this, _AudioUnitOutput_subscription, "f").terminate();
            __classPrivateFieldSet(this, _AudioUnitOutput_subscription, this.adapter.match({
                none: () => {
                    __classPrivateFieldGet(this, _AudioUnitOutput_busChangeNotifier, "f").notify(Option.None);
                    return Terminable.Empty;
                },
                some: adapter => adapter.catchupAndSubscribe(adapter => __classPrivateFieldGet(this, _AudioUnitOutput_busChangeNotifier, "f").notify(Option.wrap(adapter)))
            }), "f");
        }));
    }
    subscribe(observer) {
        return __classPrivateFieldGet(this, _AudioUnitOutput_busChangeNotifier, "f").subscribe(observer);
    }
    catchupAndSubscribe(observer) {
        observer(this.adapter);
        return this.subscribe(observer);
    }
    get adapter() {
        return __classPrivateFieldGet(this, _AudioUnitOutput_pointerField, "f").targetVertex
            .flatMap(target => Option.wrap(target.box.accept({
            visitAudioBusBox: (box) => __classPrivateFieldGet(this, _AudioUnitOutput_boxAdapters, "f").adapterFor(box, AudioBusBoxAdapter)
        })));
    }
    terminate() {
        __classPrivateFieldGet(this, _AudioUnitOutput_terminator, "f").terminate();
        __classPrivateFieldGet(this, _AudioUnitOutput_subscription, "f").terminate();
    }
}
_AudioUnitOutput_pointerField = new WeakMap(), _AudioUnitOutput_boxAdapters = new WeakMap(), _AudioUnitOutput_terminator = new WeakMap(), _AudioUnitOutput_busChangeNotifier = new WeakMap(), _AudioUnitOutput_subscription = new WeakMap();
