import {BoxSchema, deprecated} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {IndexConstraints, PPQNPositionConstraints, UnipolarConstraints} from "../Defaults"

export const ValueEventBox: BoxSchema<Pointers> = {
    type: "box",
    class: {
        name: "ValueEventBox",
        fields: {
            1: {type: "pointer", name: "events", pointerType: Pointers.ValueEvents, mandatory: true},
            10: {type: "int32", name: "position", ...PPQNPositionConstraints},
            11: {type: "int32", name: "index", ...IndexConstraints},
            12: {
                type: "int32", name: "interpolation",
                value: 1 /* default is linear */, constraints: {values: [0, 1]}, unit: "",
                pointerRules: {accepts: [Pointers.ValueInterpolation], mandatory: false}
            },
            13: {type: "float32", name: "value", ...UnipolarConstraints},
            // TODO Remove slope. It is not used anymore but older project files
            14: {type: "float32", name: "slope", deprecated, constraints: "any", unit: "", value: NaN}
        }
    }, pointerRules: {accepts: [Pointers.Selection], mandatory: false}
}