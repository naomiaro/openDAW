import { EffectPointerType } from "@opendaw/studio-adapters";
import { IconSymbol } from "@opendaw/studio-enums";
import { Field } from "@opendaw/lib-box";
import { int } from "@opendaw/lib-std";
import { Project } from "./project";
import { EffectBox } from "./EffectBox";
export interface EffectFactory {
    readonly defaultName: string;
    readonly defaultIcon: IconSymbol;
    readonly description: string;
    readonly manualPage?: string;
    readonly separatorBefore: boolean;
    readonly type: "audio" | "midi";
    create(project: Project, host: Field<EffectPointerType>, index: int): EffectBox;
}
//# sourceMappingURL=EffectFactory.d.ts.map