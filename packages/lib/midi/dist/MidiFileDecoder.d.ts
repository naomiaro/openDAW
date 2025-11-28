import { byte, ByteArrayInput, int } from "@opendaw/lib-std";
import { MidiFileFormat } from "./MidiFileFormat";
export declare class MidiFileDecoder {
    #private;
    readonly input: ByteArrayInput;
    constructor(input: ByteArrayInput);
    decode(): MidiFileFormat;
    readVarLen(): int;
    readSignature(): [int, int];
    readTempo(): number;
    skipSysEx(value: int): void;
    skip(count: int): void;
    readByte(): byte;
}
//# sourceMappingURL=MidiFileDecoder.d.ts.map