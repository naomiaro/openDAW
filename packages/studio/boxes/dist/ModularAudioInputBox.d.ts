import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModularAudioInputBoxFields = {
    1: ModuleAttributes;
    10: Field<Pointers.VoltageConnection>;
};
export declare class ModularAudioInputBox extends Box<Pointers.Selection, ModularAudioInputBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModularAudioInputBox>): ModularAudioInputBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get attributes(): ModuleAttributes;
    get output(): Field<Pointers.VoltageConnection>;
    initializeFields(): ModularAudioInputBoxFields;
}
//# sourceMappingURL=ModularAudioInputBox.d.ts.map