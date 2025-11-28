import { asDefined, asInstanceOf } from "@opendaw/lib-std";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { StringField } from "@opendaw/lib-box";
export var ProjectQueries;
(function (ProjectQueries) {
    ProjectQueries.existingInstrumentNames = (rootBox) => rootBox.audioUnits.pointerHub.incoming().map(({ box }) => {
        const inputBox = asDefined(asInstanceOf(box, AudioUnitBox).input.pointerHub.incoming().at(0)).box;
        return "label" in inputBox && inputBox.label instanceof StringField ? inputBox.label.getValue() : "N/A";
    });
})(ProjectQueries || (ProjectQueries = {}));
