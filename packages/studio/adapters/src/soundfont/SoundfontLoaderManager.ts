import {UUID} from "@naomiarotest/lib-std"
import {SoundfontLoader} from "./SoundfontLoader"

export interface SoundfontLoaderManager {
    getOrCreate(uuid: UUID.Bytes): SoundfontLoader
    remove(uuid: UUID.Bytes): void
    invalidate(uuid: UUID.Bytes): void
}