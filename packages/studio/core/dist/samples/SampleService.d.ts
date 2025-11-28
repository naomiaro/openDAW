import { Class, Procedure } from "@opendaw/lib-std";
import { Box } from "@opendaw/lib-box";
import { Sample } from "@opendaw/studio-adapters";
import { AssetService } from "../AssetService";
export declare class SampleService extends AssetService<Sample> {
    readonly audioContext: AudioContext;
    protected readonly namePlural: string;
    protected readonly nameSingular: string;
    protected readonly boxType: Class<Box>;
    protected readonly filePickerOptions: FilePickerOptions;
    constructor(audioContext: AudioContext, onUpdate: Procedure<Sample>);
    importFile({ uuid, name, arrayBuffer, progressHandler }: AssetService.ImportArgs): Promise<Sample>;
    protected collectAllFiles(): Promise<ReadonlyArray<Sample>>;
}
//# sourceMappingURL=SampleService.d.ts.map