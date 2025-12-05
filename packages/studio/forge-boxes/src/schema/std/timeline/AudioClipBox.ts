import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {ClipPlaybackFields} from "./ClipPlaybackFields"
import {HueConstraints} from "../Defaults"

export const AudioClipBox: BoxSchema<Pointers> = {
    type: "box",
    class: {
        name: "AudioClipBox",
        fields: {
            1: {type: "pointer", name: "clips", pointerType: Pointers.ClipCollection, mandatory: true},
            2: {type: "pointer", name: "file", pointerType: Pointers.AudioFile, mandatory: true},
            3: {type: "int32", name: "index", constraints: "index", unit: ""},
            4: {type: "object", name: "playback", class: ClipPlaybackFields},
            5: {type: "pointer", name: "events", pointerType: Pointers.ValueEventCollection, mandatory: true},
            10: {type: "int32", name: "duration", constraints: "any", unit: "ppqn"},
            11: {type: "boolean", name: "mute"},
            12: {type: "string", name: "label"},
            13: {type: "int32", name: "hue", ...HueConstraints},
            14: {type: "float32", name: "gain", constraints: "decibel", unit: "db"}
        }
    }, pointerRules: {accepts: [Pointers.Selection, Pointers.Editing], mandatory: false}
}