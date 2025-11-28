import { ProjectSkeleton } from "@opendaw/studio-adapters";
import { ProjectImpl } from "./impl";
export var ProjectUnpacker;
(function (ProjectUnpacker) {
    ProjectUnpacker.unpack = (api, buffer, name) => {
        const { boxGraph, mandatoryBoxes: { timelineBox } } = ProjectSkeleton.decode(buffer);
        const project = new ProjectImpl(api, name);
        project.bpm = timelineBox.bpm.getValue();
        project.timeSignature.numerator = timelineBox.signature.nominator.getValue();
        project.timeSignature.denominator = timelineBox.signature.denominator.getValue();
        // TODO
        return project;
    };
})(ProjectUnpacker || (ProjectUnpacker = {}));
