import { PPQN } from "./ppqn";
import { Notifier, Terminator } from "@opendaw/lib-std";
/**
 * Simple constant tempo map implementation.
 * All conversions are linear since the tempo never changes.
 */
export class ConstantTempoMap {
    #terminator = new Terminator();
    #notifier;
    #tempo;
    constructor(observableTempo) {
        this.#notifier = this.#terminator.own(new Notifier());
        this.#terminator.own(observableTempo.subscribe(owner => {
            this.#tempo = owner.getValue();
            this.#notifier.notify(this);
        }));
        this.#tempo = observableTempo.getValue();
    }
    subscribe(observer) {
        return this.#notifier.subscribe(observer);
    }
    getTempoAt(_position) { return this.#tempo; }
    positionToSeconds(position) {
        return PPQN.pulsesToSeconds(position, this.#tempo);
    }
    positionToPPQN(time) {
        return PPQN.secondsToPulses(time, this.#tempo);
    }
    intervalToSeconds(fromPPQN, toPPQN) {
        return PPQN.pulsesToSeconds(toPPQN - fromPPQN, this.#tempo);
    }
    intervalToPPQN(fromSeconds, toSeconds) {
        return PPQN.secondsToPulses(toSeconds - fromSeconds, this.#tempo);
    }
    terminate() { this.#notifier.terminate(); }
}
