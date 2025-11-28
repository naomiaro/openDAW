import { ByteArrayOutput } from "@opendaw/lib-std";
import { MidiTrack } from "./MidiTrack";
import { MidiFileDecoder } from "./MidiFileDecoder";
export declare namespace MidiFile {
    export const decoder: (buffer: ArrayBuffer) => MidiFileDecoder;
    export const encoder: () => MidiFileEncoder;
    class MidiFileEncoder {
        #private;
        static writeVarLen(output: ByteArrayOutput, value: number): void;
        addTrack(track: MidiTrack): this;
        encode(): ByteArrayOutput;
    }
    export {};
}
//# sourceMappingURL=MidiFile.d.ts.map