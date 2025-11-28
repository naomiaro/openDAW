import { UUID } from "@opendaw/lib-std";
import { Peaks } from "@opendaw/lib-fusion";
import { AudioData, Sample, SampleMetaData } from "@opendaw/studio-adapters";
import { Storage } from "../Storage";
export declare namespace SampleStorage {
    type NewSample = {
        uuid: UUID.Bytes;
        audio: AudioData;
        peaks: ArrayBuffer;
        meta: SampleMetaData;
    };
}
export declare class SampleStorage extends Storage<Sample, SampleMetaData, SampleStorage.NewSample, [AudioData, Peaks, SampleMetaData]> {
    static readonly Folder = "samples/v2";
    static get(): SampleStorage;
    static cleanDeprecated(): Promise<void>;
    private constructor();
    save({ uuid, audio, peaks, meta }: SampleStorage.NewSample): Promise<void>;
    updateSampleMeta(uuid: UUID.Bytes, meta: SampleMetaData): Promise<void>;
    load(uuid: UUID.Bytes): Promise<[AudioData, Peaks, SampleMetaData]>;
}
//# sourceMappingURL=SampleStorage.d.ts.map