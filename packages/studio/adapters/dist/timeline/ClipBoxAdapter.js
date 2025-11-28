import { asDefined } from "@opendaw/lib-std";
import { ValueClipBoxAdapter } from "./clip/ValueClipBoxAdapter";
import { AudioClipBoxAdapter } from "./clip/AudioClipBoxAdapter";
import { NoteClipBoxAdapter } from "./clip/NoteClipBoxAdapter";
export const ClipAdapters = {
    for: (boxAdapters, box) => asDefined(box.accept({
        visitNoteClipBox: (box) => boxAdapters.adapterFor(box, NoteClipBoxAdapter),
        visitValueClipBox: (box) => boxAdapters.adapterFor(box, ValueClipBoxAdapter),
        visitAudioClipBox: (box) => boxAdapters.adapterFor(box, AudioClipBoxAdapter)
    }), "")
};
