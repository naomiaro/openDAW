import { Class, Option, Procedure } from "@opendaw/lib-std";
import { Box } from "@opendaw/lib-box";
import { Soundfont } from "@opendaw/studio-adapters";
import { AssetService } from "../AssetService";
export declare class SoundfontService extends AssetService<Soundfont> {
    #private;
    protected readonly namePlural: string;
    protected readonly nameSingular: string;
    protected readonly boxType: Class<Box>;
    protected readonly filePickerOptions: FilePickerOptions;
    constructor(onUpdate: Procedure<Soundfont>);
    get local(): Option<ReadonlyArray<Soundfont>>;
    get remote(): Option<ReadonlyArray<Soundfont>>;
    importFile({ uuid, arrayBuffer }: AssetService.ImportArgs): Promise<Soundfont>;
    protected collectAllFiles(): Promise<ReadonlyArray<Soundfont>>;
}
//# sourceMappingURL=SoundfontService.d.ts.map