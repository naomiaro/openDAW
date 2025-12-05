import {Progress, UUID} from "@naomiarotest/lib-std"
import {AudioData, SampleMetaData} from "@naomiarotest/studio-adapters"

export interface SampleProvider {
    fetch(uuid: UUID.Bytes, progress: Progress.Handler): Promise<[AudioData, SampleMetaData]>
}