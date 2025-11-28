import { MutableObservableOption, Option, Terminable } from "@opendaw/lib-std";
import { AudioUnitBox, CaptureAudioBox } from "@opendaw/studio-boxes";
import { Capture } from "./Capture";
import { CaptureDevices } from "./CaptureDevices";
export declare class CaptureAudio extends Capture<CaptureAudioBox> {
    #private;
    constructor(manager: CaptureDevices, audioUnitBox: AudioUnitBox, captureAudioBox: CaptureAudioBox);
    get gainDb(): number;
    get stream(): MutableObservableOption<MediaStream>;
    get streamDeviceId(): Option<string>;
    get label(): string;
    get deviceLabel(): Option<string>;
    get streamMediaTrack(): Option<MediaStreamTrack>;
    prepareRecording(): Promise<void>;
    startRecording(): Terminable;
}
//# sourceMappingURL=CaptureAudio.d.ts.map