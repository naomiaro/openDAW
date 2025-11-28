import { Notifier } from "./notifier";
export var RuntimeSignal;
(function (RuntimeSignal) {
    const notifier = new Notifier();
    RuntimeSignal.subscribe = (observer) => notifier.subscribe(observer);
    RuntimeSignal.dispatch = (signal) => notifier.notify(signal);
})(RuntimeSignal || (RuntimeSignal = {}));
