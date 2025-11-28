import { int, Option, Progress } from "@opendaw/lib-std";
import { ExportStemsConfiguration } from "@opendaw/studio-adapters";
import { Project } from "./project";
export declare namespace AudioOfflineRenderer {
    const start: (source: Project, optExportConfiguration: Option<ExportStemsConfiguration>, progress: Progress.Handler, abortSignal?: AbortSignal, sampleRate?: int) => Promise<AudioBuffer>;
}
//# sourceMappingURL=AudioOfflineRenderer.d.ts.map