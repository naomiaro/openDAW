import { int, Terminable } from "@opendaw/lib-std";
type MIDIMessageCallback = (deviceId: string, data: Uint8Array, timeMs: int) => void;
export declare class MIDIReceiver implements Terminable {
    #private;
    static create(context: BaseAudioContext, callback: MIDIMessageCallback): MIDIReceiver;
    private constructor();
    get sab(): SharedArrayBuffer;
    get port(): MessagePort;
    terminate(): void;
}
export {};
//# sourceMappingURL=MIDIReceiver.d.ts.map