import { safeExecute } from "./lang";
export class Listeners {
    #set = new Set();
    #proxy;
    constructor() {
        this.#proxy = new Proxy({}, {
            get: (_, func) => (...args) => this.#set.forEach((listener) => {
                if (Object.getPrototypeOf(listener) === Object.getPrototypeOf({})) {
                    return safeExecute(listener[func], ...args);
                }
                return listener[func]?.apply(listener, args);
            })
        });
    }
    get proxy() { return this.#proxy; }
    get size() { return this.#set.size; }
    subscribe(listener) {
        this.#set.add(listener);
        return { terminate: () => this.#set.delete(listener) };
    }
    forEach(procedure) { this.#set.forEach(procedure); }
    terminate() { this.#set.clear(); }
}
