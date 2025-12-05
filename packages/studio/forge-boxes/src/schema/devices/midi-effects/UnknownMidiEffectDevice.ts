import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {DeviceFactory} from "../../std/DeviceFactory"

export const UnknownMidiEffectDevice: BoxSchema<Pointers> =
    DeviceFactory.createMidiEffect("UnknownMidiEffectDeviceBox", {
        10: {type: "string", name: "comment"}
    })