import { Arrays, isDefined } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
export class Subscribers {
    #subscribers;
    constructor() { this.#subscribers = Address.newSet(entry => entry.address); }
    getOrNull(address) { return this.#subscribers.getOrNull(address)?.listeners; }
    isEmpty(address) { return !this.#subscribers.hasKey(address); }
    subscribe(address, listener) {
        const entry = this.#subscribers.getOrNull(address);
        if (isDefined(entry)) {
            entry.listeners.push(listener);
        }
        else {
            this.#subscribers.add({ address, listeners: [listener] });
        }
        return {
            terminate: () => {
                this.#subscribers.opt(address).ifSome(entry => {
                    Arrays.remove(entry.listeners, listener);
                    if (entry.listeners.length === 0) {
                        this.#subscribers.removeByKey(address);
                    }
                });
            }
        };
    }
    terminate() { this.#subscribers.clear(); }
}
