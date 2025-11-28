import { isNull, safeExecute } from "@opendaw/lib-std";
export var MidiData;
(function (MidiData) {
    let Command;
    (function (Command) {
        Command[Command["NoteOn"] = 144] = "NoteOn";
        Command[Command["NoteOff"] = 128] = "NoteOff";
        Command[Command["PitchBend"] = 224] = "PitchBend";
        Command[Command["Controller"] = 176] = "Controller";
        Command[Command["Start"] = 250] = "Start";
        Command[Command["Continue"] = 251] = "Continue";
        Command[Command["Stop"] = 252] = "Stop";
        Command[Command["Clock"] = 248] = "Clock";
        Command[Command["Position"] = 242] = "Position";
    })(Command = MidiData.Command || (MidiData.Command = {}));
    MidiData.readCommand = (data) => data[0] & 0xF0;
    MidiData.readChannel = (data) => data[0] & 0x0F;
    MidiData.readParam1 = (d) => d.length > 1 ? d[1] & 0xFF : 0;
    MidiData.readParam2 = (d) => d.length > 2 ? d[2] & 0xFF : 0;
    MidiData.readPitch = (d) => d[1];
    MidiData.readVelocity = (d) => d[2] / 127.0;
    MidiData.isNoteOn = (d) => MidiData.readCommand(d) === Command.NoteOn && MidiData.readVelocity(d) > 0;
    MidiData.isNoteOff = (d) => MidiData.readCommand(d) === Command.NoteOff || (MidiData.readCommand(d) === Command.NoteOn && MidiData.readVelocity(d) === 0);
    MidiData.isPitchWheel = (d) => MidiData.readCommand(d) === Command.PitchBend;
    MidiData.isController = (d) => MidiData.readCommand(d) === Command.Controller;
    MidiData.isClock = (d) => d[0] === Command.Clock;
    MidiData.isStart = (d) => d[0] === Command.Start;
    MidiData.isContinue = (d) => d[0] === Command.Continue;
    MidiData.isStop = (d) => d[0] === Command.Stop;
    MidiData.isPosition = (d) => d[0] === Command.Position;
    MidiData.asPitchBend = (d) => {
        const p1 = MidiData.readParam1(d) & 0x7F, p2 = MidiData.readParam2(d) & 0x7F, v = p1 | (p2 << 7);
        return 8192 >= v ? v / 8192 - 1 : (v - 8191) / 8192;
    };
    MidiData.asValue = (d) => {
        const v = MidiData.readParam2(d);
        return v > 64 ? 0.5 + (v - 63) / 128 : v < 64 ? v / 128 : 0.5;
    };
    MidiData.Clock = new Uint8Array([Command.Clock]);
    MidiData.Start = new Uint8Array([Command.Start]);
    MidiData.Continue = new Uint8Array([Command.Continue]);
    MidiData.Stop = new Uint8Array([Command.Stop]);
    MidiData.noteOn = (ch, note, vel) => new Uint8Array([Command.NoteOn | ch, note, vel]);
    MidiData.noteOff = (ch, note) => new Uint8Array([Command.NoteOff | ch, note, 0]);
    MidiData.control = (ch, ctrl, val) => new Uint8Array([Command.Controller | ch, ctrl & 0x7F, val & 0x7F]);
    MidiData.position = (lsb, msb) => new Uint8Array([Command.Position, lsb & 0x7F, msb & 0x7F]);
    MidiData.positionInPPQN = (pulses) => {
        // MIDI Song Position Pointer unit = 6 MIDI clocks = 1/16 note
        const midiBeats = Math.floor(pulses / 96); // 960 / 10
        const lsb = midiBeats & 0x7F;
        const msb = (midiBeats >> 7) & 0x7F;
        return new Uint8Array([Command.Position, lsb, msb]);
    };
    MidiData.accept = (data, v) => {
        if (isNull(data))
            return;
        if (MidiData.isNoteOn(data))
            safeExecute(v.noteOn, MidiData.readPitch(data), MidiData.readVelocity(data));
        else if (MidiData.isNoteOff(data))
            safeExecute(v.noteOff, MidiData.readPitch(data));
        else if (MidiData.isPitchWheel(data))
            safeExecute(v.pitchBend, MidiData.asPitchBend(data));
        else if (MidiData.isController(data))
            safeExecute(v.controller, MidiData.readParam1(data), MidiData.readParam2(data) / 127);
        else if (MidiData.isClock(data))
            safeExecute(v.clock);
        else if (MidiData.isStart(data))
            safeExecute(v.start);
        else if (MidiData.isContinue(data))
            safeExecute(v.continue);
        else if (MidiData.isStop(data))
            safeExecute(v.stop);
        else if (MidiData.isPosition(data))
            safeExecute(v.songPos, MidiData.readParam1(data) | (MidiData.readParam2(data) << 7));
    };
    MidiData.debug = (data) => {
        if (data === null)
            return "null";
        if (MidiData.isNoteOn(data))
            return `NoteOn #${MidiData.readChannel(data)} ${MidiData.readPitch(data)} : ${MidiData.readVelocity(data).toFixed(2)}`;
        if (MidiData.isNoteOff(data))
            return `NoteOff #${MidiData.readChannel(data)} ${MidiData.readPitch(data)}`;
        if (MidiData.isPitchWheel(data))
            return `PitchWheel #${MidiData.readChannel(data)} ${MidiData.asPitchBend(data)}`;
        if (MidiData.isController(data))
            return `Control #${MidiData.readChannel(data)} ${MidiData.asValue(data)}`;
        if (MidiData.isClock(data))
            return "Clock";
        if (MidiData.isStart(data))
            return "Start";
        if (MidiData.isContinue(data))
            return "Continue";
        if (MidiData.isStop(data))
            return "Stop";
        if (MidiData.isPosition(data))
            return `SongPosition ${MidiData.readParam1(data) | (MidiData.readParam2(data) << 7)}`;
        return "Unknown";
    };
})(MidiData || (MidiData = {}));
