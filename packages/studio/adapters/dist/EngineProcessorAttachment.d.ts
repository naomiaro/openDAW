import { int, Option } from "@opendaw/lib-std";
export type ProcessorOptions = {
    pauseOnLoopDisabled?: boolean;
};
export type EngineProcessorAttachment = {
    syncStreamBuffer: SharedArrayBuffer;
    controlFlagsBuffer: SharedArrayBuffer;
    project: ArrayBufferLike;
    exportConfiguration?: ExportStemsConfiguration;
    options?: ProcessorOptions;
};
export type ExportStemConfiguration = {
    includeAudioEffects: boolean;
    includeSends: boolean;
    fileName: string;
};
export type ExportStemsConfiguration = Record<string, ExportStemConfiguration>;
export declare namespace ExportStemsConfiguration {
    const countStems: (config: Option<ExportStemsConfiguration>) => int;
    const sanitizeFileName: (name: string) => string;
    const sanitizeExportNamesInPlace: (configuration: ExportStemsConfiguration) => void;
}
//# sourceMappingURL=EngineProcessorAttachment.d.ts.map