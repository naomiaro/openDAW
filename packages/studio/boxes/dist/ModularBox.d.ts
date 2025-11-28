import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, StringField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ModularBoxFields = {
    1: PointerField<Pointers.ModularSetup>;
    2: Field<Pointers.ModularSetup>;
    3: Field<Pointers.Editing>;
    11: Field<Pointers.ModuleCollection>;
    12: Field<Pointers.ConnectionCollection>;
    13: StringField;
};
export declare class ModularBox extends Box<UnreferenceableType, ModularBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ModularBox>): ModularBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get collection(): PointerField<Pointers.ModularSetup>;
    get device(): Field<Pointers.ModularSetup>;
    get editing(): Field<Pointers.Editing>;
    get modules(): Field<Pointers.ModuleCollection>;
    get connections(): Field<Pointers.ConnectionCollection>;
    get label(): StringField;
    initializeFields(): ModularBoxFields;
}
//# sourceMappingURL=ModularBox.d.ts.map