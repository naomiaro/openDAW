import {BoxForge} from "@naomiarotest/lib-box-forge"
import {Pointers} from "@naomiarotest/studio-enums"
import {DeviceDefinitions} from "./schema/devices"
import {ModuleDefinitions} from "./schema/std/modular"
import {Definitions} from "./schema/std"

BoxForge.gen<Pointers>({
    path: "../boxes/src/",
    pointers: {
        from: "@naomiarotest/studio-enums",
        enum: "Pointers",
        print: pointer => `Pointers.${Pointers[pointer]}`
    },
    boxes: [
        ...Definitions,
        ...DeviceDefinitions,
        ...ModuleDefinitions
    ]
}).then(() => console.debug("forged."))