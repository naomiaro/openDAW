import { byte, unitValue, UUID } from "@opendaw/lib-std";
export type NoteSignalOn = {
    type: "note-on";
    uuid: UUID.Bytes;
    pitch: byte;
    velocity: unitValue;
};
export type NoteSignalOff = {
    type: "note-off";
    uuid: UUID.Bytes;
    pitch: byte;
};
export type NoteSignal = NoteSignalOn | NoteSignalOff;
export declare namespace NoteSignal {
    const on: (uuid: UUID.Bytes, pitch: byte, velocity: unitValue) => NoteSignalOn;
    const off: (uuid: UUID.Bytes, pitch: byte) => NoteSignalOff;
    const isOn: (signal: NoteSignal) => signal is NoteSignalOn;
    const isOff: (signal: NoteSignal) => signal is NoteSignalOff;
    const fromEvent: (event: MIDIMessageEvent, uuid: UUID.Bytes) => NoteSignal;
}
//# sourceMappingURL=NoteSignal.d.ts.map