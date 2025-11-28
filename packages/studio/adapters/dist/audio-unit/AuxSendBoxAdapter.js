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
var _AuxSendBoxAdapter_context, _AuxSendBoxAdapter_box, _AuxSendBoxAdapter_terminator, _AuxSendBoxAdapter_busChangeNotifier, _AuxSendBoxAdapter_sendPan, _AuxSendBoxAdapter_sendGain, _AuxSendBoxAdapter_subscription;
import { Notifier, Option, StringMapping, Terminable, Terminator, ValueMapping } from "@opendaw/lib-std";
import { AudioBusBoxAdapter } from "./AudioBusBoxAdapter";
import { AutomatableParameterFieldAdapter } from "../AutomatableParameterFieldAdapter";
export class AuxSendBoxAdapter {
    constructor(context, box) {
        _AuxSendBoxAdapter_context.set(this, void 0);
        _AuxSendBoxAdapter_box.set(this, void 0);
        _AuxSendBoxAdapter_terminator.set(this, void 0);
        _AuxSendBoxAdapter_busChangeNotifier.set(this, void 0);
        _AuxSendBoxAdapter_sendPan.set(this, void 0);
        _AuxSendBoxAdapter_sendGain.set(this, void 0);
        _AuxSendBoxAdapter_subscription.set(this, Terminable.Empty);
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_context, context, "f");
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_box, box, "f");
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_terminator, new Terminator(), "f");
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_busChangeNotifier, __classPrivateFieldGet(this, _AuxSendBoxAdapter_terminator, "f").own(new Notifier()), "f");
        __classPrivateFieldGet(this, _AuxSendBoxAdapter_terminator, "f").own(box.targetBus.catchupAndSubscribe(() => {
            __classPrivateFieldGet(this, _AuxSendBoxAdapter_subscription, "f").terminate();
            __classPrivateFieldSet(this, _AuxSendBoxAdapter_subscription, this.optTargetBus.match({
                none: () => {
                    __classPrivateFieldGet(this, _AuxSendBoxAdapter_busChangeNotifier, "f").notify(Option.None);
                    return Terminable.Empty;
                },
                some: adapter => adapter.catchupAndSubscribe(adapter => __classPrivateFieldGet(this, _AuxSendBoxAdapter_busChangeNotifier, "f").notify(Option.wrap(adapter)))
            }), "f");
        }));
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_sendPan, __classPrivateFieldGet(this, _AuxSendBoxAdapter_terminator, "f").own(new AutomatableParameterFieldAdapter(__classPrivateFieldGet(this, _AuxSendBoxAdapter_context, "f"), __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").sendPan, ValueMapping.bipolar(), StringMapping.percent({ unit: "%", fractionDigits: 0 }), "panning")), "f");
        __classPrivateFieldSet(this, _AuxSendBoxAdapter_sendGain, __classPrivateFieldGet(this, _AuxSendBoxAdapter_terminator, "f").own(new AutomatableParameterFieldAdapter(__classPrivateFieldGet(this, _AuxSendBoxAdapter_context, "f"), __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").sendGain, ValueMapping.DefaultDecibel, StringMapping.numeric({
            unit: "dB",
            fractionDigits: 1
        }), "gain")), "f");
    }
    catchupAndSubscribeBusChanges(observer) {
        observer(this.optTargetBus);
        return __classPrivateFieldGet(this, _AuxSendBoxAdapter_busChangeNotifier, "f").subscribe(observer);
    }
    get uuid() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").address.uuid; }
    get address() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").address; }
    get box() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f"); }
    get indexField() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").index; }
    get sendPan() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_sendPan, "f"); }
    get sendGain() { return __classPrivateFieldGet(this, _AuxSendBoxAdapter_sendGain, "f"); }
    get targetBus() {
        return __classPrivateFieldGet(this, _AuxSendBoxAdapter_context, "f").boxAdapters
            .adapterFor(__classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").targetBus.targetVertex.unwrap("no audioUnit").box, AudioBusBoxAdapter);
    }
    get optTargetBus() {
        return __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").targetBus.targetVertex
            .flatMap(target => Option.wrap(target.box.accept({
            visitAudioBusBox: (box) => __classPrivateFieldGet(this, _AuxSendBoxAdapter_context, "f").boxAdapters.adapterFor(box, AudioBusBoxAdapter)
        })));
    }
    delete() { __classPrivateFieldGet(this, _AuxSendBoxAdapter_box, "f").delete(); }
    terminate() {
        __classPrivateFieldGet(this, _AuxSendBoxAdapter_terminator, "f").terminate();
        __classPrivateFieldGet(this, _AuxSendBoxAdapter_subscription, "f").terminate();
    }
}
_AuxSendBoxAdapter_context = new WeakMap(), _AuxSendBoxAdapter_box = new WeakMap(), _AuxSendBoxAdapter_terminator = new WeakMap(), _AuxSendBoxAdapter_busChangeNotifier = new WeakMap(), _AuxSendBoxAdapter_sendPan = new WeakMap(), _AuxSendBoxAdapter_sendGain = new WeakMap(), _AuxSendBoxAdapter_subscription = new WeakMap();
