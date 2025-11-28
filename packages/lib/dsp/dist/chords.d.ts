import { int } from "@opendaw/lib-std";
export declare namespace Chord {
    const Major: ReadonlyArray<int>;
    const Minor: ReadonlyArray<int>;
    const Minor7: ReadonlyArray<int>;
    const Minor9: ReadonlyArray<int>;
    const Dominant7: ReadonlyArray<int>;
    const NoteLabels: string[];
    const compile: (scale: ReadonlyArray<int>, root: int, variation: int, n: int) => ReadonlyArray<int>;
    const toString: (midiNote: int) => string;
}
//# sourceMappingURL=chords.d.ts.map