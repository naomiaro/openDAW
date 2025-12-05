import {BoxSchema} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {DeviceFactory} from "../../std/DeviceFactory"

export const ZeitgeistDeviceBox: BoxSchema<Pointers> = DeviceFactory.createMidiEffect("ZeitgeistDeviceBox", {
    10: {type: "pointer", name: "groove", pointerType: Pointers.Groove, mandatory: true}
})