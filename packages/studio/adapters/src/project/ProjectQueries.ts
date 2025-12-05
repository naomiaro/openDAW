import {asDefined, asInstanceOf} from "@naomiarotest/lib-std"
import {AudioUnitBox, RootBox} from "@naomiarotest/studio-boxes"
import {StringField} from "@naomiarotest/lib-box"

export namespace ProjectQueries {
    export const existingInstrumentNames = (rootBox: RootBox) => rootBox.audioUnits.pointerHub.incoming().map(({box}) => {
        const inputBox = asDefined(asInstanceOf(box, AudioUnitBox).input.pointerHub.incoming().at(0)).box
        return "label" in inputBox && inputBox.label instanceof StringField ? inputBox.label.getValue() : "N/A"
    })
}