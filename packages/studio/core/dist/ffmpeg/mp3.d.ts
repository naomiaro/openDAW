import { Progress } from "@opendaw/lib-std";
import type { AcceptedSource, FFmpegWorker } from "./FFmpegWorker";
import type { FFmpegConverter } from "./FFmpegConverter";
export type Mp3Options = {
    bitrate?: string;
    quality?: number;
};
export declare class Mp3Converter implements FFmpegConverter<Mp3Options> {
    #private;
    constructor(worker: FFmpegWorker);
    convert(source: AcceptedSource, progress: Progress.Handler, options?: Mp3Options): Promise<ArrayBuffer>;
}
//# sourceMappingURL=mp3.d.ts.map