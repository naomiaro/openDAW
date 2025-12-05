import {IconSymbol} from "@naomiarotest/studio-enums"
import {int} from "@naomiarotest/lib-std"

export type InstrumentOptions<T = never> = { name?: string, icon?: IconSymbol, index?: int, attachment?: T }