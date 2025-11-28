import { MutableObservableValue, Option, Terminable, UUID } from "@opendaw/lib-std";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { CaptureBox } from "@opendaw/studio-adapters";
import { CaptureDevices } from "./CaptureDevices";
export declare abstract class Capture<BOX extends CaptureBox = CaptureBox> implements Terminable {
    #private;
    protected constructor(manager: CaptureDevices, audioUnitBox: AudioUnitBox, captureBox: BOX);
    abstract get label(): string;
    abstract get deviceLabel(): Option<string>;
    abstract prepareRecording(): Promise<void>;
    abstract startRecording(): Terminable;
    get uuid(): UUID.Bytes;
    get manager(): CaptureDevices;
    get audioUnitBox(): AudioUnitBox;
    get captureBox(): BOX;
    get armed(): MutableObservableValue<boolean>;
    get deviceId(): MutableObservableValue<Option<string>>;
    own<T extends Terminable>(terminable: T): T;
    ownAll<T extends Terminable>(...terminables: ReadonlyArray<T>): void;
    terminate(): void;
}
//# sourceMappingURL=Capture.d.ts.map