import { UUID } from "@opendaw/lib-std";
import { Soundfont, SoundfontMetaData } from "@opendaw/studio-adapters";
import { Storage } from "../Storage";
export declare namespace SoundfontStorage {
    type NewSoundfont = {
        uuid: UUID.Bytes;
        file: ArrayBuffer;
        meta: SoundfontMetaData;
    };
}
export declare class SoundfontStorage extends Storage<Soundfont, SoundfontMetaData, SoundfontStorage.NewSoundfont, [
    ArrayBuffer,
    SoundfontMetaData
]> {
    static readonly Folder = "soundfont";
    static get(): SoundfontStorage;
    private constructor();
    save({ uuid, file, meta }: SoundfontStorage.NewSoundfont): Promise<void>;
    load(uuid: UUID.Bytes): Promise<[ArrayBuffer, SoundfontMetaData]>;
}
//# sourceMappingURL=SoundfontStorage.d.ts.map