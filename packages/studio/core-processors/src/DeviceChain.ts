import {Terminable} from "@naomiarotest/lib-std"

export interface DeviceChain extends Terminable {
    invalidateWiring(): void
}