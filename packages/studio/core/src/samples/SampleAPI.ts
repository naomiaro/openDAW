import {AudioData, Sample, SampleMetaData} from "@naomiarotest/studio-adapters"
import {Procedure, unitValue, UUID} from "@naomiarotest/lib-std"

export interface SampleAPI {
    all(): Promise<ReadonlyArray<Sample>>
    get(uuid: UUID.Bytes): Promise<Sample>
    load(context: AudioContext, uuid: UUID.Bytes, progress: Procedure<unitValue>): Promise<[AudioData, Sample]>
    upload(arrayBuffer: ArrayBuffer, metaData: SampleMetaData): Promise<void>
    allowsUpload(): boolean
}