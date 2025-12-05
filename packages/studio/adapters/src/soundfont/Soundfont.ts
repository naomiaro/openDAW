import {UUID} from "@naomiarotest/lib-std"
import {SoundfontMetaData} from "./SoundfontMetaData"
import {z} from "zod"

export const Soundfont = SoundfontMetaData.extend({
    uuid: UUID.zType(z)
})

export type Soundfont = z.infer<typeof Soundfont>