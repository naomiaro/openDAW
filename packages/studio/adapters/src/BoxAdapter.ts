import {Terminable, UUID} from "@naomiarotest/lib-std"
import {Addressable, Box} from "@naomiarotest/lib-box"

export interface BoxAdapter extends Addressable, Terminable {
    get box(): Box
    get uuid(): UUID.Bytes
}