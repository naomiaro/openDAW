import { clampUnit } from "@opendaw/lib-std";
export var MidiKeys;
(function (MidiKeys) {
    MidiKeys.BlackKeyIndices = [1, 3, 6, 8, 10];
    MidiKeys.BlackKeyBits = MidiKeys.BlackKeyIndices.reduce((bits, keyIndex) => (bits |= 1 << keyIndex), 0);
    MidiKeys.Names = {
        English: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        German: ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "Ais", "H"],
        Solfege: ["Do", "Do#", "Ré", "Ré#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"],
        French: ["Do", "Do#", "Ré", "Ré#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"],
        Spanish: ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"],
        Japanese: ["ド", "ド♯", "レ", "レ♯", "ミ", "ファ", "ファ♯", "ソ", "ソ♯", "ラ", "ラ♯", "シ"]
    };
    MidiKeys.isBlackKey = (note) => (MidiKeys.BlackKeyBits & (1 << (note % 12))) !== 0;
    MidiKeys.toFullString = (note) => `${MidiKeys.Names.English[note % 12]}${(Math.floor(note / 12) - 2)}`;
    MidiKeys.keyboardTracking = (note, amount) => clampUnit((note - 60) * amount);
    class PredefinedScaleImpl {
        #name;
        #bits;
        constructor(name, ...keys) {
            this.#name = name;
            this.#bits = keys.reduce((bits, keyIndex) => (bits |= 1 << keyIndex), 0);
        }
        get name() { return this.#name; }
        get bits() { return this.#bits; }
        has(note) { return (this.#bits & (1 << (note % 12))) !== 0; }
        equals(other) { return this.#bits === other.bits; }
    }
    MidiKeys.StockScales = [
        new PredefinedScaleImpl("Major", 0, 2, 4, 5, 7, 9, 11),
        new PredefinedScaleImpl("Natural Minor", 0, 2, 3, 5, 7, 8, 10),
        new PredefinedScaleImpl("Harmonic Minor", 0, 2, 3, 5, 7, 8, 11),
        new PredefinedScaleImpl("Melodic Minor", 0, 2, 3, 5, 7, 9, 11),
        new PredefinedScaleImpl("Dorian", 0, 2, 3, 5, 7, 9, 10),
        new PredefinedScaleImpl("Phrygian", 0, 1, 3, 5, 7, 8, 10),
        new PredefinedScaleImpl("Lydian", 0, 2, 4, 6, 7, 9, 11),
        new PredefinedScaleImpl("Mixolydian", 0, 2, 4, 5, 7, 9, 10),
        new PredefinedScaleImpl("Locrian", 0, 1, 3, 5, 6, 8, 10),
        new PredefinedScaleImpl("Pentatonic Major", 0, 2, 4, 7, 9),
        new PredefinedScaleImpl("Pentatonic Minor", 0, 3, 5, 7, 10),
        new PredefinedScaleImpl("Blues", 0, 3, 5, 6, 7, 10),
        new PredefinedScaleImpl("Whole Tone", 0, 2, 4, 6, 8, 10),
        new PredefinedScaleImpl("Diminished", 0, 2, 3, 5, 6, 8, 9, 11),
        new PredefinedScaleImpl("Augmented", 0, 3, 4, 7, 8, 11)
    ];
})(MidiKeys || (MidiKeys = {}));
