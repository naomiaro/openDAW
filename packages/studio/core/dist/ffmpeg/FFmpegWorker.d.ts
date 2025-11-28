import { Notifier, Progress, unitValue } from "@opendaw/lib-std";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { Mp3Converter } from "./mp3";
import { FlacConverter } from "./flac";
export type AcceptedSource = File | Blob;
export declare class FFmpegWorker {
    #private;
    static load(progress?: Progress.Handler): Promise<FFmpegWorker>;
    constructor(ffmpeg: FFmpeg);
    get ffmpeg(): FFmpeg;
    get loaded(): boolean;
    get progressNotifier(): Notifier<unitValue>;
    mp3Converter(): Mp3Converter;
    flacConverter(): FlacConverter;
    fetchFileData(source: string): Promise<Uint8Array>;
    cleanupFiles(files: string[]): Promise<void>;
}
//# sourceMappingURL=FFmpegWorker.d.ts.map