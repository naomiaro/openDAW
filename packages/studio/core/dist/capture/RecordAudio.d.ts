import { Terminable } from "@opendaw/lib-std";
import { SampleLoaderManager } from "@opendaw/studio-adapters";
import { Project } from "../project";
import { RecordingWorklet } from "../RecordingWorklet";
import { Capture } from "./Capture";
export declare namespace RecordAudio {
    /** Get all currently active recording worklets */
    export const getActiveWorklets: () => ReadonlyArray<RecordingWorklet>;
    type RecordAudioContext = {
        recordingWorklet: RecordingWorklet;
        mediaStream: MediaStream;
        sampleManager: SampleLoaderManager;
        audioContext: AudioContext;
        project: Project;
        capture: Capture;
        gainDb: number;
    };
    export const start: ({ recordingWorklet, mediaStream, sampleManager, audioContext, project, capture, gainDb }: RecordAudioContext) => Terminable;
    export {};
}
//# sourceMappingURL=RecordAudio.d.ts.map