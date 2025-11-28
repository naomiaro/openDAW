import { Procedure, unitValue, UUID } from "@opendaw/lib-std";
import { Soundfont, SoundfontMetaData } from "@opendaw/studio-adapters";
export declare class OpenSoundfontAPI {
    #private;
    static readonly ApiRoot = "https://api.opendaw.studio/soundfonts";
    static readonly FileRoot = "https://assets.opendaw.studio/soundfonts";
    static get(): OpenSoundfontAPI;
    private constructor();
    all(): Promise<ReadonlyArray<Soundfont>>;
    get(uuid: UUID.Bytes): Promise<Soundfont>;
    load(uuid: UUID.Bytes, progress: Procedure<unitValue>): Promise<[ArrayBuffer, SoundfontMetaData]>;
}
//# sourceMappingURL=OpenSoundfontAPI.d.ts.map