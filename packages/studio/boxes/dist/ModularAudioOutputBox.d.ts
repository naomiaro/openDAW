import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModularAudioOutputBoxFields = {
    1: ModuleAttributes;
    10: Field<Pointers.VoltageConnection>;
};
export declare class ModularAudioOutputBox extends Box<Pointers.Selection, ModularAudioOutputBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModularAudioOutputBox>): ModularAudioOutputBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get attributes(): ModuleAttributes;
    get input(): Field<Pointers.VoltageConnection>;
    initializeFields(): ModularAudioOutputBoxFields;
}
//# sourceMappingURL=ModularAudioOutputBox.d.ts.map