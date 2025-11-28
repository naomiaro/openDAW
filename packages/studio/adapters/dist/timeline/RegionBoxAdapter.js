import { asDefined } from "@opendaw/lib-std";
import { AudioRegionBoxAdapter } from "./region/AudioRegionBoxAdapter";
import { NoteRegionBoxAdapter } from "./region/NoteRegionBoxAdapter";
import { ValueRegionBoxAdapter } from "./region/ValueRegionBoxAdapter";
export const RegionComparator = (a, b) => a.position - b.position;
export const RegionAdapters = {
    for: (boxAdapters, box) => asDefined(box.accept({
        visitNoteRegionBox: (box) => boxAdapters.adapterFor(box, NoteRegionBoxAdapter),
        visitAudioRegionBox: (box) => boxAdapters.adapterFor(box, AudioRegionBoxAdapter),
        visitValueRegionBox: (box) => boxAdapters.adapterFor(box, ValueRegionBoxAdapter)
    }), "")
};
