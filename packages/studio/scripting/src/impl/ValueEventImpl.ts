import {ValueEvent} from "../Api"
import {Interpolation, ppqn} from "@naomiarotest/lib-dsp"
import {unitValue} from "@naomiarotest/lib-std"

export class ValueEventImpl implements ValueEvent {
    position: ppqn
    value: unitValue
    interpolation: Interpolation

    index: int = 0

    constructor(props?: Partial<ValueEvent>) {
        this.position = props?.position ?? 0.0 as ppqn
        this.value = props?.value ?? 0.0 as unitValue
        this.interpolation = props?.interpolation ?? Interpolation.Linear
    }
}
