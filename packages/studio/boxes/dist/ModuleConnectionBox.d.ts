import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModuleConnectionBoxFields = {
    1: PointerField<Pointers.ConnectionCollection>;
    2: PointerField<Pointers.VoltageConnection>;
    3: PointerField<Pointers.VoltageConnection>;
};
export declare class ModuleConnectionBox extends Box<UnreferenceableType, ModuleConnectionBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModuleConnectionBox>): ModuleConnectionBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get collection(): PointerField<Pointers.ConnectionCollection>;
    get source(): PointerField<Pointers.VoltageConnection>;
    get target(): PointerField<Pointers.VoltageConnection>;
    initializeFields(): ModuleConnectionBoxFields;
}
//# sourceMappingURL=ModuleConnectionBox.d.ts.map