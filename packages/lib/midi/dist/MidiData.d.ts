import { byte, Nullable } from "@opendaw/lib-std";
import { MidiEventVisitor } from "./MidiEventVisitor";
import { ppqn } from "@opendaw/lib-dsp";
export declare namespace MidiData {
    enum Command {
        NoteOn = 144,
        NoteOff = 128,
        PitchBend = 224,
        Controller = 176,
        Start = 250,
        Continue = 251,
        Stop = 252,
        Clock = 248,
        Position = 242
    }
    const readCommand: (data: Uint8Array) => number;
    const readChannel: (data: Uint8Array) => number;
    const readParam1: (d: Uint8Array) => number;
    const readParam2: (d: Uint8Array) => number;
    const readPitch: (d: Uint8Array) => number;
    const readVelocity: (d: Uint8Array) => number;
    const isNoteOn: (d: Uint8Array) => boolean;
    const isNoteOff: (d: Uint8Array) => boolean;
    const isPitchWheel: (d: Uint8Array) => boolean;
    const isController: (d: Uint8Array) => boolean;
    const isClock: (d: Uint8Array) => boolean;
    const isStart: (d: Uint8Array) => boolean;
    const isContinue: (d: Uint8Array) => boolean;
    const isStop: (d: Uint8Array) => boolean;
    const isPosition: (d: Uint8Array) => boolean;
    const asPitchBend: (d: Uint8Array) => number;
    const asValue: (d: Uint8Array) => number;
    const Clock: Uint8Array<ArrayBuffer>;
    const Start: Uint8Array<ArrayBuffer>;
    const Continue: Uint8Array<ArrayBuffer>;
    const Stop: Uint8Array<ArrayBuffer>;
    const noteOn: (ch: byte, note: byte, vel: byte) => Uint8Array<ArrayBuffer>;
    const noteOff: (ch: byte, note: byte) => Uint8Array<ArrayBuffer>;
    const control: (ch: byte, ctrl: byte, val: byte) => Uint8Array<ArrayBuffer>;
    const position: (lsb: byte, msb: byte) => Uint8Array<ArrayBuffer>;
    const positionInPPQN: (pulses: ppqn) => Uint8Array<ArrayBuffer>;
    const accept: (data: Nullable<Uint8Array>, v: MidiEventVisitor) => void;
    const debug: (data: Nullable<Uint8Array>) => string;
}
//# sourceMappingURL=MidiData.d.ts.map