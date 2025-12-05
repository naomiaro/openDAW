import {Terminable, UUID} from "@naomiarotest/lib-std"
import {Processor} from "./processing"

export interface DeviceProcessor extends Terminable {
    get uuid(): UUID.Bytes
    get incoming(): Processor
    get outgoing(): Processor
}