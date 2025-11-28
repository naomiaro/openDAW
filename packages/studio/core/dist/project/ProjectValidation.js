import { Arrays, asDefined, EmptyExec, RuntimeNotifier } from "@opendaw/lib-std";
export var ProjectValidation;
(function (ProjectValidation) {
    ProjectValidation.validate = (skeleton) => {
        const { boxGraph } = skeleton;
        const invalidBoxes = new Set();
        const validateRegion = (box) => {
            if (box.position.getValue() < 0) {
                console.warn(box, "must have a position greater equal 0");
                invalidBoxes.add(box);
            }
            if (box.duration.getValue() <= 0) {
                console.warn(box, "must have a duration greater than 0");
                invalidBoxes.add(box);
            }
        };
        boxGraph.boxes().forEach(box => box.accept({
            visitNoteRegionBox: (box) => validateRegion(box),
            visitValueRegionBox: (box) => validateRegion(box),
            visitAudioRegionBox: (box) => validateRegion(box),
            visitTrackBox: (box) => Arrays.iterateAdjacent(box.regions.pointerHub.incoming()
                .map(({ box }) => asDefined(box.accept({
                visitNoteRegionBox: (box) => box,
                visitValueRegionBox: (box) => box,
                visitAudioRegionBox: (box) => box
            }), "Box must be a NoteRegionBox, ValueRegionBox or AudioRegionBox"))
                .sort((a, b) => a.position.getValue() - b.position.getValue()))
                .forEach(([left, right]) => {
                if (right.position.getValue() < left.position.getValue() + left.duration.getValue()) {
                    console.warn(left, right, "Overlapping regions");
                    invalidBoxes.add(left);
                    invalidBoxes.add(right);
                }
            })
        }));
        if (invalidBoxes.size === 0) {
            return;
        }
        console.warn(`Deleting ${invalidBoxes.size} invalid boxes:`);
        boxGraph.beginTransaction();
        invalidBoxes.forEach(box => box.delete());
        boxGraph.endTransaction();
        RuntimeNotifier.info({
            headline: "Some data is corrupt",
            message: `The project contains ${invalidBoxes.size} invalid boxes. 
            We fixed them as good as possible. This probably happend because there was a bug that we hopefully fixed. 
            Please send this file to the developers.`
        }).then(EmptyExec, EmptyExec);
    };
})(ProjectValidation || (ProjectValidation = {}));
