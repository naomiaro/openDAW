import { Class, Procedure, Progress, UUID } from "@opendaw/lib-std";
import { BoxGraph } from "@opendaw/lib-box";
import { Sample, Soundfont } from "@opendaw/studio-adapters";
import { AudioFileBox, SoundfontFileBox } from "@opendaw/studio-boxes";
export declare namespace AssetService {
    type ImportArgs = {
        uuid?: UUID.Bytes;
        name?: string;
        arrayBuffer: ArrayBuffer;
        progressHandler?: Progress.Handler;
    };
}
export declare abstract class AssetService<T extends Sample | Soundfont> {
    protected readonly onUpdate: Procedure<T>;
    protected abstract readonly nameSingular: string;
    protected abstract readonly namePlural: string;
    protected abstract readonly boxType: Class<AudioFileBox | SoundfontFileBox>;
    protected abstract readonly filePickerOptions: FilePickerOptions;
    protected constructor(onUpdate: Procedure<T>);
    browse(multiple: boolean): Promise<ReadonlyArray<T>>;
    abstract importFile(args: AssetService.ImportArgs): Promise<T>;
    replaceMissingFiles(boxGraph: BoxGraph, manager: {
        invalidate: (uuid: UUID.Bytes) => void;
    }): Promise<void>;
    protected browseFiles(multiple: boolean, filePickerSettings: FilePickerOptions): Promise<ReadonlyArray<T>>;
    protected abstract collectAllFiles(): Promise<ReadonlyArray<T>>;
}
//# sourceMappingURL=AssetService.d.ts.map