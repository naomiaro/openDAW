import {EffectPointerType} from "@naomiarotest/studio-adapters"
import {IconSymbol} from "@naomiarotest/studio-enums"
import {Field} from "@naomiarotest/lib-box"
import {int} from "@naomiarotest/lib-std"
import {Project} from "./project"
import {EffectBox} from "./EffectBox"

export interface EffectFactory {
    readonly defaultName: string
    readonly defaultIcon: IconSymbol
    readonly description: string
    readonly manualPage?: string
    readonly separatorBefore: boolean
    readonly type: "audio" | "midi"

    create(project: Project, host: Field<EffectPointerType>, index: int): EffectBox
}