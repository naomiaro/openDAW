import { Terminable } from "./terminable";
export class Notifier {
    static subscribeMany(observer, ...observables) {
        return Terminable.many(...observables
            .map(observable => observable.subscribe(() => observer(observable))));
    }
    #observers = new Set(); // A set allows us to remove while iterating
    subscribe(observer) {
        this.#observers.add(observer);
        return { terminate: () => this.#observers.delete(observer) };
    }
    isEmpty() { return this.#observers.size === 0; }
    notify(value) { this.#observers.forEach((observer) => observer(value)); }
    observers() { return this.#observers; }
    terminate() { this.#observers.clear(); }
}
