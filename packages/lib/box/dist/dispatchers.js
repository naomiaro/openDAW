import { Terminator, Unhandled } from "@opendaw/lib-std";
import { Addressable } from "./address";
export var Propagation;
(function (Propagation) {
    Propagation[Propagation["This"] = 0] = "This";
    Propagation[Propagation["Parent"] = 1] = "Parent";
    Propagation[Propagation["Children"] = 2] = "Children";
})(Propagation || (Propagation = {}));
export var Dispatchers;
(function (Dispatchers) {
    Dispatchers.create = () => new DispatchersImpl();
})(Dispatchers || (Dispatchers = {}));
class DispatchersImpl {
    #thisDispatcher = new Dispatcher(Addressable.equals);
    #parentDispatcher = new Dispatcher(Addressable.startsWith);
    #childrenDispatcher = new Dispatcher(Addressable.endsWith);
    #deferredStations = [];
    #order = 0 | 0;
    #dispatching = false;
    subscribe(propagation, address, procedure) {
        const monitor = new Monitor(address, propagation, this.#order++, procedure);
        if (this.#dispatching) {
            const deferred = new DeferredMonitor(monitor, propagation);
            this.#deferredStations.push(deferred);
            return deferred;
        }
        else {
            return this.subscribeMonitor(monitor, propagation);
        }
    }
    dispatch(target) {
        this.#dispatching = true;
        const invoked = [
            ...this.#thisDispatcher.filter(target),
            ...this.#parentDispatcher.filter(target),
            ...this.#childrenDispatcher.filter(target)
        ];
        invoked
            .sort(({ order: a }, { order: b }) => a - b)
            .forEach((station) => station.procedure(target));
        this.#dispatching = false;
        this.#deferredStations.forEach((station) => station.subscribe(this));
        this.#deferredStations.length = 0;
    }
    subscribeMonitor(monitor, propagation) {
        switch (propagation) {
            case Propagation.This:
                return this.#thisDispatcher.subscribe(monitor);
            case Propagation.Parent:
                return this.#parentDispatcher.subscribe(monitor);
            case Propagation.Children:
                return this.#childrenDispatcher.subscribe(monitor);
            default:
                return Unhandled(propagation);
        }
    }
    countStations() {
        return this.#thisDispatcher.count() + this.#parentDispatcher.count() + this.#childrenDispatcher.count();
    }
}
class Monitor {
    address;
    propagation;
    order;
    procedure;
    constructor(address, propagation, order, procedure) {
        this.address = address;
        this.propagation = propagation;
        this.order = order;
        this.procedure = procedure;
    }
    toString() {
        return `{ Monitor address: ${this.address}, propagation: ${Propagation[this.propagation]}, order: ${this.order} }`;
    }
}
class Dispatcher {
    filterStrategy;
    #monitors = [];
    #sorted = true;
    constructor(filterStrategy) {
        this.filterStrategy = filterStrategy;
    }
    subscribe(monitor) {
        this.#monitors.push(monitor);
        this.#sorted = this.#monitors.length < 2;
        return {
            terminate: () => {
                let index = this.#monitors.length;
                while (--index >= 0) {
                    if (this.#monitors[index] === monitor) {
                        this.#monitors.splice(index, 1);
                    }
                }
            }
        };
    }
    stations() {
        if (!this.#sorted) {
            this.#monitors.sort(Addressable.Comparator);
            this.#sorted = true;
        }
        return this.#monitors;
    }
    filter(target) { return this.filterStrategy(target.address, this.stations()); }
    count() { return this.#monitors.length; }
}
class DeferredMonitor {
    monitor;
    propagation;
    #terminator = new Terminator();
    #terminated = false;
    constructor(monitor, propagation) {
        this.monitor = monitor;
        this.propagation = propagation;
    }
    subscribe(dispatchers) {
        if (this.#terminated) {
            return;
        }
        this.#terminator.terminate();
        this.#terminator.own(dispatchers.subscribeMonitor(this.monitor, this.propagation));
    }
    terminate() {
        this.#terminated = true;
        this.#terminator.terminate();
    }
}
