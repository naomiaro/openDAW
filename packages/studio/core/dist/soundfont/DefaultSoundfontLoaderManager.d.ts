import { Progress, UUID } from "@opendaw/lib-std";
import { SoundfontLoader, SoundfontLoaderManager, SoundfontMetaData } from "@opendaw/studio-adapters";
import { SoundfontProvider } from "./SoundfontProvider";
export declare class DefaultSoundfontLoaderManager implements SoundfontLoaderManager, SoundfontProvider {
    #private;
    constructor(provider: SoundfontProvider);
    fetch(uuid: UUID.Bytes, progress: Progress.Handler): Promise<[ArrayBuffer, SoundfontMetaData]>;
    remove(uuid: UUID.Bytes): void;
    getOrCreate(uuid: UUID.Bytes): SoundfontLoader;
    invalidate(uuid: UUID.Bytes): void;
}
//# sourceMappingURL=DefaultSoundfontLoaderManager.d.ts.map