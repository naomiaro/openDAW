import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"

export const AudioFileBox: BoxSchema<Pointers> = {
    type: "box",
    class: {
        name: "AudioFileBox",
        fields: {
            1: {type: "float32", name: "start-in-seconds", constraints: "non-negative", unit: "s"},
            2: {type: "float32", name: "end-in-seconds", constraints: "non-negative", unit: "s"},
            3: {type: "string", name: "file-name"}
        }
    }, pointerRules: {accepts: [Pointers.AudioFile, Pointers.FileUploadState], mandatory: true}
}