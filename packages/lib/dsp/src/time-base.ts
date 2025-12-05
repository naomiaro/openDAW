import {asEnumValue, MutableValueOwner, ValueOwner} from "@naomiarotest/lib-std"
import {ppqn, samples, seconds} from "./ppqn"
import {TempoMap} from "./tempo"

export enum TimeBase {
    Musical = "musical", // PPQN
    Seconds = "seconds",
}

/**
 * Converts between musical time (PPQN) and absolute time (seconds/samples) for a specific value.
 * The converter knows the value's native time-base and uses a TempoMap for conversions.
 */
export interface TimeBaseConverter {
    toPPQN(): ppqn
    fromPPQN(ppqn: ppqn): void
    toSeconds(): seconds
    toSamples(sampleRate: number): samples
    rawValue(): number
    getTimeBase(): TimeBase
}

export namespace TimeBaseConverter {
    export function musical(tempoMap: TempoMap,
                            position: ValueOwner<ppqn>,
                            property: MutableValueOwner<number>): TimeBaseConverter {
        return new TimeBaseMusicalConverter(tempoMap, position, property)
    }

    export function aware(tempoMap: TempoMap,
                          timeBase: ValueOwner<string>,
                          position: ValueOwner<ppqn>,
                          property: MutableValueOwner<number>): TimeBaseConverter {
        return new TimeBaseAwareConverter(tempoMap, timeBase, position, property)
    }
}

class TimeBaseAwareConverter implements TimeBaseConverter {
    readonly #tempoMap: TempoMap
    readonly #timeBase: ValueOwner<string>
    readonly #position: ValueOwner<ppqn>
    readonly #property: MutableValueOwner<number>

    constructor(tempoMap: TempoMap,
                timeBase: ValueOwner<string>,
                position: ValueOwner<ppqn>,
                property: MutableValueOwner<number>) {
        this.#property = property
        this.#timeBase = timeBase
        this.#position = position
        this.#tempoMap = tempoMap
    }

    toPPQN(): ppqn {
        const value = this.#property.getValue()
        if (this.getTimeBase() === TimeBase.Musical) {return value}
        const position = this.#position.getValue()
        const startSeconds = this.#tempoMap.positionToSeconds(position)
        const endSeconds = startSeconds + value
        return this.#tempoMap.intervalToPPQN(startSeconds, endSeconds)
    }

    fromPPQN(ppqn: ppqn): void {
        if (this.getTimeBase() === TimeBase.Musical) {
            this.#property.setValue(ppqn)
        } else {
            const position = this.#position.getValue()
            const seconds = this.#tempoMap.intervalToSeconds(position, position + ppqn)
            this.#property.setValue(seconds)
        }
    }

    toSeconds(): seconds {
        const value = this.#property.getValue()
        if (this.getTimeBase() === TimeBase.Seconds) {return value}
        const position = this.#position.getValue()
        return this.#tempoMap.intervalToSeconds(position, position + value)
    }

    toSamples(sampleRate: number): samples {return this.toSeconds() * sampleRate}

    rawValue(): number {return this.#property.getValue()}
    getTimeBase(): TimeBase {return asEnumValue(this.#timeBase.getValue(), TimeBase)}
}

class TimeBaseMusicalConverter implements TimeBaseConverter {
    readonly #tempoMap: TempoMap
    readonly #position: ValueOwner<ppqn>
    readonly #property: MutableValueOwner<number>

    constructor(tempoMap: TempoMap,
                position: ValueOwner<ppqn>,
                property: MutableValueOwner<number>) {
        this.#property = property
        this.#position = position
        this.#tempoMap = tempoMap
    }

    toPPQN(): ppqn {return this.#property.getValue()}
    fromPPQN(ppqn: ppqn): void {this.#property.setValue(ppqn)}

    toSeconds(): seconds {
        const value = this.#property.getValue()
        const position = this.#position.getValue()
        return this.#tempoMap.intervalToSeconds(position, position + value)
    }

    toSamples(sampleRate: number): samples {return this.toSeconds() * sampleRate}

    rawValue(): number {return this.#property.getValue()}
    getTimeBase(): TimeBase {return TimeBase.Musical}
}