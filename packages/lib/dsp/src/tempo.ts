import {bpm, ppqn, PPQN, seconds} from "./ppqn"
import {Notifier, Observable, ObservableValue, Observer, Subscription, Terminable, Terminator} from "@naomiarotest/lib-std"

/**
 * Interface for tempo map conversions between musical time (PPQN) and absolute time (seconds/samples).
 * Handles both point conversions and interval conversions (which require integration over a tempo curve).
 */
export interface TempoMap extends Observable<TempoMap> {
    /**
     * Get the tempo at a specific musical position.
     * @param position Position in PPQN
     * @returns Tempo in BPM at that position
     */
    getTempoAt(position: ppqn): bpm

    /**
     * Convert a musical position to absolute time.
     * @param position Position in PPQN
     * @returns Absolute time in seconds
     */
    positionToSeconds(position: ppqn): seconds

    /**
     * Convert an absolute time position to musical time.
     * @param time Absolute time in seconds
     * @returns Position in PPQN
     */
    positionToPPQN(time: seconds): ppqn

    /**
     * Convert a musical time interval to absolute time duration.
     * Integrates over the tempo curve between the two positions.
     * @param fromPPQN Start position in PPQN
     * @param toPPQN End position in PPQN
     * @returns Duration in seconds
     */
    intervalToSeconds(fromPPQN: ppqn, toPPQN: ppqn): seconds

    /**
     * Convert an absolute time interval to musical time duration.
     * Inverse integration over the tempo curve.
     * @param fromSeconds Start time in seconds
     * @param toSeconds End time in seconds
     * @returns Duration in PPQN
     */
    intervalToPPQN(fromSeconds: seconds, toSeconds: seconds): ppqn
}

/**
 * Simple constant tempo map implementation.
 * All conversions are linear since the tempo never changes.
 */
export class ConstantTempoMap implements TempoMap, Terminable {
    readonly #terminator = new Terminator()
    readonly #notifier: Notifier<this>

    #tempo: bpm

    constructor(observableTempo: ObservableValue<bpm>) {
        this.#notifier = this.#terminator.own(new Notifier())
        this.#terminator.own(observableTempo.subscribe(owner => {
            this.#tempo = owner.getValue()
            this.#notifier.notify(this)
        }))
        this.#tempo = observableTempo.getValue()
    }

    subscribe(observer: Observer<TempoMap>): Subscription {
        return this.#notifier.subscribe(observer)
    }

    getTempoAt(_position: ppqn): bpm {return this.#tempo}

    positionToSeconds(position: ppqn): seconds {
        return PPQN.pulsesToSeconds(position, this.#tempo)
    }

    positionToPPQN(time: seconds): ppqn {
        return PPQN.secondsToPulses(time, this.#tempo)
    }

    intervalToSeconds(fromPPQN: ppqn, toPPQN: ppqn): seconds {
        return PPQN.pulsesToSeconds(toPPQN - fromPPQN, this.#tempo)
    }

    intervalToPPQN(fromSeconds: seconds, toSeconds: seconds): ppqn {
        return PPQN.secondsToPulses(toSeconds - fromSeconds, this.#tempo)
    }

    terminate(): void {this.#notifier.terminate()}
}