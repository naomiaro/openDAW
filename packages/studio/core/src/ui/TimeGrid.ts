import {PPQN} from "@naomiarotest/lib-dsp"
import {int, quantizeFloor} from "@naomiarotest/lib-std"
import {TimelineRange} from "./TimelineRange"

export namespace TimeGrid {
    export type Signature = [int, int]
    export type Options = { minLength?: number }
    export type Fragment = { bars: int, beats: int, ticks: int, isBar: boolean, isBeat: boolean, pulse: number }
    export type Designer = (fragment: Fragment) => void

    export const fragment = ([nominator, denominator]: Signature,
                             range: TimelineRange, designer: Designer, options?: Options): void => {
        const unitsPerPixel = range.unitsPerPixel
        if (unitsPerPixel <= 0) {return}
        const barPulses = PPQN.fromSignature(nominator, denominator)
        const beatPulses = PPQN.fromSignature(1, denominator)
        const minLength = options?.minLength ?? 48
        let interval = barPulses
        let pixel = interval / unitsPerPixel
        if (pixel > minLength) {
            // scaling down the interval until we hit the minimum length
            while (pixel > minLength) {
                if (interval > barPulses) {
                    // Above bar level: divide by 2
                    interval /= 2
                } else if (interval > beatPulses) {
                    // Between beat and bar level: divide by nominator
                    interval /= nominator
                } else {
                    // Below beat level: divide by 2
                    interval /= 2
                }
                pixel = interval / unitsPerPixel
            }
        }
        if (pixel < minLength) {
            // scaling up the interval until we hit the minimum length
            while (pixel < minLength) {
                if (interval < beatPulses) {
                    // Below beat level: multiply by 2
                    const nextInterval = interval * 2
                    // If doubling exceeds beat level, jump to beat level instead
                    if (nextInterval > beatPulses) {
                        interval = beatPulses
                    } else {
                        interval = nextInterval
                    }
                } else if (interval < barPulses) {
                    // Between beat and bar level: multiply by nominator
                    const nextInterval = interval * nominator
                    // If multiplying exceeds bar level, jump to bar level instead
                    if (nextInterval > barPulses) {
                        interval = barPulses
                    } else {
                        interval = nextInterval
                    }
                } else {
                    // At or above bar level: multiply by 2
                    interval *= 2
                }
                pixel = interval / unitsPerPixel
            }
        }
        const p0 = quantizeFloor(range.unitMin, interval)
        const p1 = range.unitMax
        for (let pulse = p0; pulse < p1; pulse += interval) {
            const {bars, beats, semiquavers, ticks} = PPQN.toParts(pulse, nominator, denominator)
            const isBeat = ticks === 0 && semiquavers === 0
            const isBar = isBeat && beats === 0
            designer({bars, beats, ticks, isBar, isBeat, pulse})
        }
    }
}