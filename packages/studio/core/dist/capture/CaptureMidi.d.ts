import { Observer, Option, Subscription, Terminable } from "@opendaw/lib-std";
import { AudioUnitBox, CaptureMidiBox } from "@opendaw/studio-boxes";
import { NoteSignal } from "@opendaw/studio-adapters";
import { Capture } from "./Capture";
import { CaptureDevices } from "./CaptureDevices";
export declare class CaptureMidi extends Capture<CaptureMidiBox> {
    #private;
    constructor(manager: CaptureDevices, audioUnitBox: AudioUnitBox, captureMidiBox: CaptureMidiBox);
    notify(signal: NoteSignal): void;
    subscribeNotes(observer: Observer<NoteSignal>): Subscription;
    get label(): string;
    get deviceLabel(): Option<string>;
    prepareRecording(): Promise<void>;
    startRecording(): Terminable;
}
//# sourceMappingURL=CaptureMidi.d.ts.map