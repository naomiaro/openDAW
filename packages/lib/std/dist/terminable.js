import { Arrays } from "./arrays";
import { EmptyExec } from "./lang";
export const Terminable = Object.freeze({
    Empty: { terminate: EmptyExec },
    create: (exec) => ({ terminate: exec }),
    many: (...terminables) => ({ terminate: () => { while (terminables.length > 0) {
            terminables.pop().terminate();
        } } })
});
export class Terminator {
    #terminables = [];
    isEmpty() { return this.#terminables.length === 0; }
    nonEmpty() { return this.#terminables.length > 0; }
    own(terminable) {
        this.#terminables.push(terminable);
        return terminable;
    }
    ownAll(...terminables) {
        for (const terminable of terminables) {
            this.#terminables.push(terminable);
        }
    }
    spawn() {
        const terminator = new Terminator();
        terminator.own({ terminate: () => Arrays.removeOpt(this.#terminables, terminator) });
        return this.own(terminator);
    }
    terminate() { while (this.#terminables.length > 0) {
        this.#terminables.pop().terminate();
    } }
}
export class VitalSigns {
    #terminated = false;
    get isTerminated() { return this.#terminated; }
    terminate() { this.#terminated = true; }
}
export class CascadingSubscriptions {
    #current;
    constructor() { this.#current = new Terminator(); }
    next() {
        const current = this.#current;
        const nested = current.own(new Terminator());
        this.#current = nested;
        return {
            own: (subscription) => {
                current.own(subscription);
                return current;
            },
            toObserver: (fn) => (value) => {
                nested.terminate();
                nested.own(fn(value));
            }
        };
    }
    append(subscribe, observer) {
        const current = this.#current;
        const nested = current.own(new Terminator());
        current.own(subscribe((value) => {
            nested.terminate();
            nested.own(observer(value));
        }));
        this.#current = nested;
        return current;
    }
}
