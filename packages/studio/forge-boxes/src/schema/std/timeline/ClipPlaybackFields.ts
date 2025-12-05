import {Pointers} from "@naomiarotest/studio-enums"
import {ClassSchema} from "@naomiarotest/lib-box-forge"

export const ClipPlaybackFields = {
    name: "ClipPlaybackFields",
    fields: {
        1: {type: "boolean", name: "loop", value: true},
        2: {type: "boolean", name: "reverse"},
        3: {type: "boolean", name: "mute"}, // TODO Remove
        4: {type: "int32", name: "speed", constraints: "non-negative", unit: ""},
        5: {type: "int32", name: "quantise", constraints: "non-negative", unit: ""},
        6: {type: "int32", name: "trigger", constraints: "non-negative", unit: ""}
    }
} satisfies ClassSchema<Pointers>