import {Progress, UUID} from "@naomiarotest/lib-std"
import {SoundfontMetaData} from "@naomiarotest/studio-adapters"

export interface SoundfontProvider {
    fetch(uuid: UUID.Bytes, progress: Progress.Handler): Promise<[ArrayBuffer, SoundfontMetaData]>
}