import { Arrays } from "@opendaw/lib-std";
export var Chord;
(function (Chord) {
    Chord.Major = [0, 2, 4, 5, 7, 9, 11];
    Chord.Minor = [0, 2, 3, 5, 7, 8, 10];
    Chord.Minor7 = [0, 3, 7, 10];
    Chord.Minor9 = [0, 3, 7, 10, 14];
    Chord.Dominant7 = [0, 2, 4, 5, 7, 9, 10];
    Chord.NoteLabels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    Chord.compile = (scale, root, variation, n) => Arrays.create(index => {
        const step = variation + index * 2;
        const interval = scale[step % 7] + Math.floor(step / 7) * 12;
        return root + interval;
    }, n);
    Chord.toString = (midiNote) => Chord.NoteLabels[midiNote % 12] + (Math.floor(midiNote / 12) - 2);
})(Chord || (Chord = {}));
