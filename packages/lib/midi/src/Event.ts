import {int} from "@naomiarotest/lib-std"

export interface Event<TYPE> {
    readonly ticks: int
    readonly type: TYPE
}