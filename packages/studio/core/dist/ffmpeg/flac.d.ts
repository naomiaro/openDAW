import { int, Progress } from "@opendaw/lib-std";
import type { FFmpegConverter } from "./FFmpegConverter";
import type { AcceptedSource, FFmpegWorker } from "./FFmpegWorker";
export type FlacOptions = {
    compression: int;
};
export declare class FlacConverter implements FFmpegConverter<FlacOptions> {
    #private;
    constructor(worker: FFmpegWorker);
    convert(source: AcceptedSource, progress: Progress.Handler, options?: FlacOptions): Promise<ArrayBuffer>;
}
//# sourceMappingURL=flac.d.ts.map