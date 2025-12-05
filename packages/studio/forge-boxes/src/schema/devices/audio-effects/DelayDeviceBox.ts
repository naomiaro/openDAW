import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {ParameterPointerRules} from "../../std/Defaults"
import {DeviceFactory} from "../../std/DeviceFactory"

export const DelayDeviceBox: BoxSchema<Pointers> = DeviceFactory.createAudioEffect("DelayDeviceBox", {
    10: {
        type: "float32", name: "delay", pointerRules: ParameterPointerRules,
        value: 4, constraints: "any", unit: ""
    },
    11: {
        type: "float32", name: "feedback", pointerRules: ParameterPointerRules,
        value: 0.5, constraints: "unipolar", unit: "%"
    },
    12: {
        type: "float32", name: "cross", pointerRules: ParameterPointerRules,
        value: 0.0, constraints: "bipolar", unit: "%"
    },
    13: {
        type: "float32", name: "filter", pointerRules: ParameterPointerRules,
        value: 0.0, constraints: "bipolar", unit: "%"
    },
    14: {
        type: "float32", name: "wet", pointerRules: ParameterPointerRules,
        value: -6.0, constraints: "decibel", unit: "dB"
    },
    15: {
        type: "float32", name: "dry", pointerRules: ParameterPointerRules,
        value: 0.0, constraints: "decibel", unit: "dB"
    }
})