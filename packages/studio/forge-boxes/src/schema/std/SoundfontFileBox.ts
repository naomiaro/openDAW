import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"

export const SoundfontFileBox: BoxSchema<Pointers> = {
    type: "box",
    class: {
        name: "SoundfontFileBox",
        fields: {
            1: {type: "string", name: "file-name"}
        }
    }, pointerRules: {accepts: [Pointers.SoundfontFile], mandatory: true}
}