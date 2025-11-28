import { EventSpan } from "./events";
export var NoteEvent;
(function (NoteEvent) {
    NoteEvent.isOfType = (event) => event.type === "note-event";
    NoteEvent.Comparator = (a, b) => {
        const positionDiff = a.position - b.position;
        if (positionDiff !== 0) {
            return positionDiff;
        }
        const pitchDiff = a.pitch - b.pitch;
        if (pitchDiff !== 0) {
            return pitchDiff;
        }
        // We should allow this and leave it to the user to resolve issues like that
        return 0;
    };
    // TODO Replace with https://www.desmos.com/calculator/ekbzuu5j2x
    NoteEvent.curveFunc = (ratio, curve) => curve < 0.0 ? ratio ** (2.0 ** -curve) : 1.0 - (1.0 - ratio) ** (2.0 ** curve);
    NoteEvent.inverseCurveFunc = (ratio, curve) => curve < 0.0 ? ratio ** (2.0 ** curve) : 1.0 - Math.max(0.0, 1.0 - ratio) ** (2.0 ** -curve);
    NoteEvent.CompleteComparator = (a, b) => {
        const diffComplete = EventSpan.complete(a) - EventSpan.complete(b);
        if (diffComplete !== 0) {
            return diffComplete;
        }
        return a.pitch - b.pitch;
    };
})(NoteEvent || (NoteEvent = {}));
