import { Comparator, int, unitValue } from "@opendaw/lib-std";
import { Event, EventSpan } from "./events";
export interface NoteEvent extends EventSpan {
    readonly type: "note-event";
    get pitch(): int;
    get cent(): number;
    get velocity(): unitValue;
}
export declare namespace NoteEvent {
    const isOfType: (event: Event) => event is NoteEvent;
    const Comparator: Comparator<NoteEvent>;
    const curveFunc: (ratio: unitValue, curve: number) => unitValue;
    const inverseCurveFunc: (ratio: unitValue, curve: number) => unitValue;
    const CompleteComparator: Comparator<NoteEvent>;
}
//# sourceMappingURL=notes.d.ts.map