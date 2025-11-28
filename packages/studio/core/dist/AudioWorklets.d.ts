import { int, UUID } from "@opendaw/lib-std";
import { ExportStemsConfiguration, ProcessorOptions } from "@opendaw/studio-adapters";
import { Project } from "./project/Project";
import { EngineWorklet } from "./EngineWorklet";
import { MeterWorklet } from "./MeterWorklet";
import { RecordingWorklet } from "./RecordingWorklet";
export declare class AudioWorklets {
    #private;
    static install(url: string): void;
    static createFor(context: BaseAudioContext): Promise<AudioWorklets>;
    static get(context: BaseAudioContext): AudioWorklets;
    constructor(context: BaseAudioContext);
    get context(): BaseAudioContext;
    createMeter(numberOfChannels: int): MeterWorklet;
    createEngine({ project, exportConfiguration, options }: {
        project: Project;
        exportConfiguration?: ExportStemsConfiguration;
        options?: ProcessorOptions;
    }): EngineWorklet;
    createRecording(numberOfChannels: int, numChunks: int, outputLatency: number, captureId: UUID.Bytes): RecordingWorklet;
}
//# sourceMappingURL=AudioWorklets.d.ts.map