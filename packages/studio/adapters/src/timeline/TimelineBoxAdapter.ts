import {TimelineBox} from "@naomiarotest/studio-boxes"
import {int, Observer, Subscription, UUID} from "@naomiarotest/lib-std"
import {Address} from "@naomiarotest/lib-box"
import {BoxAdapter} from "../BoxAdapter"
import {MarkerTrackAdapter} from "./MarkerTrackAdapter"
import {BoxAdaptersContext} from "../BoxAdaptersContext"
import {PPQN, ppqn} from "@naomiarotest/lib-dsp"

export class TimelineBoxAdapter implements BoxAdapter {
    readonly #box: TimelineBox
    readonly #markerTrack: MarkerTrackAdapter

    constructor(context: BoxAdaptersContext, box: TimelineBox) {
        this.#box = box
        this.#markerTrack = new MarkerTrackAdapter(context, this.#box.markerTrack)
    }

    terminate(): void {}

    get box(): TimelineBox {return this.#box}
    get uuid(): UUID.Bytes {return this.#box.address.uuid}
    get address(): Address {return this.#box.address}
    get markerTrack(): MarkerTrackAdapter {return this.#markerTrack}
    get signature(): Readonly<[int, int]> {
        return [
            this.#box.signature.nominator.getValue(), this.#box.signature.denominator.getValue()
        ]
    }
    get signatureDuration(): ppqn {
        const {nominator, denominator} = this.#box.signature
        return PPQN.fromSignature(nominator.getValue(), denominator.getValue())
    }

    catchupAndSubscribeSignature(observer: Observer<Readonly<[int, int]>>): Subscription {
        observer(this.signature)
        return this.#box.signature.subscribe(() => observer(this.signature))
    }
}