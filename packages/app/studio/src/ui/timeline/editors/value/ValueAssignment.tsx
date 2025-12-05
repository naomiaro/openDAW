import {AutomatableParameterFieldAdapter, DeviceBoxAdapter} from "@naomiarotest/studio-adapters"

export type ValueAssignment = {
    device?: DeviceBoxAdapter
    adapter: AutomatableParameterFieldAdapter
}