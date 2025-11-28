import { Notifier, Terminable } from "@opendaw/lib-std";
import { NoteSignal } from "@opendaw/studio-adapters";
import { Project } from "../project";
import { Capture } from "./Capture";
export declare namespace RecordMidi {
    type RecordMidiContext = {
        notifier: Notifier<NoteSignal>;
        project: Project;
        capture: Capture;
    };
    export const start: ({ notifier, project, capture }: RecordMidiContext) => Terminable;
    export {};
}
//# sourceMappingURL=RecordMidi.d.ts.map