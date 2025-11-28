import { panic } from "@opendaw/lib-std";
export const UnionBoxTypes = {
    isClipBox: (box) => box.accept({
        visitNoteClipBox: (_box) => true,
        visitAudioClipBox: (_box) => true,
        visitValueClipBox: (_box) => true
    }) ?? false,
    isRegionBox: (box) => box.accept({
        visitNoteRegionBox: (_box) => true,
        visitAudioRegionBox: (_box) => true,
        visitValueRegionBox: (_box) => true
    }) ?? false,
    asRegionBox: (box) => box.accept({
        visitNoteRegionBox: (box) => box,
        visitAudioRegionBox: (box) => box,
        visitValueRegionBox: (box) => box
    }) ?? panic("Could not cast to AnyRegionBox"),
    isLoopableRegionBox: (box) => box.accept({
        visitNoteRegionBox: (_box) => true,
        visitAudioRegionBox: (_box) => true,
        visitValueRegionBox: (_box) => true
    }) ?? false
};
