import { ByteArrayInput, ByteArrayOutput } from "@opendaw/lib-std";
import { Chunk } from "./Chunk";
import { MidiFileDecoder } from "./MidiFileDecoder";
export var MidiFile;
(function (MidiFile) {
    MidiFile.decoder = (buffer) => new MidiFileDecoder(new ByteArrayInput(buffer));
    MidiFile.encoder = () => new MidiFileEncoder();
    class MidiFileEncoder {
        static writeVarLen(output, value) {
            let bytes = [];
            while (value > 0x7F) {
                bytes.push((value & 0x7F) | 0x80);
                value >>= 7;
            }
            bytes.push(value & 0x7F);
            for (let i = bytes.length - 1; i >= 0; i--) {
                output.writeByte(bytes[i]);
            }
        }
        #tracks = [];
        addTrack(track) {
            this.#tracks.push(track);
            return this;
        }
        encode() {
            const output = ByteArrayOutput.create();
            output.littleEndian = false;
            output.writeInt(Chunk.MTHD);
            output.writeInt(6);
            output.writeShort(0); // formatType
            output.writeShort(this.#tracks.length);
            output.writeShort(96); // timeDivision
            this.#tracks.forEach(track => {
                output.writeInt(Chunk.MTRK);
                const buffer = track.encode();
                output.writeInt(buffer.byteLength);
                output.writeBytes(new Int8Array(buffer));
            });
            return output;
        }
    }
})(MidiFile || (MidiFile = {}));
