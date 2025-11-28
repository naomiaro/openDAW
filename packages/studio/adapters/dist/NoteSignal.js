import { panic } from "@opendaw/lib-std";
import { MidiData } from "@opendaw/lib-midi";
export var NoteSignal;
(function (NoteSignal) {
    NoteSignal.on = (uuid, pitch, velocity) => ({ type: "note-on", uuid, pitch, velocity });
    NoteSignal.off = (uuid, pitch) => ({ type: "note-off", uuid, pitch });
    NoteSignal.isOn = (signal) => signal.type === "note-on";
    NoteSignal.isOff = (signal) => signal.type === "note-off";
    NoteSignal.fromEvent = (event, uuid) => {
        const data = event.data;
        if (MidiData.isNoteOn(data)) {
            const pitch = MidiData.readPitch(data);
            const velocity = MidiData.readVelocity(data);
            return ({ type: "note-on", uuid, pitch, velocity });
        }
        else if (MidiData.isNoteOff(data)) {
            const pitch = MidiData.readPitch(data);
            return ({ type: "note-off", uuid, pitch });
        }
        return panic("Unknown MIDI event");
    };
})(NoteSignal || (NoteSignal = {}));
