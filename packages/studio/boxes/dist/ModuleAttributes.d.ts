import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, PointerField, StringField, Int32Field, BooleanField, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type ModuleAttributesFields = {
    1: PointerField<Pointers.ModuleCollection>;
    2: StringField;
    3: Int32Field;
    4: Int32Field;
    5: BooleanField;
    6: BooleanField;
};
export declare class ModuleAttributes extends ObjectField<ModuleAttributesFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): ModuleAttributes;
    private constructor();
    get collection(): PointerField<Pointers.ModuleCollection>;
    get label(): StringField;
    get x(): Int32Field;
    get y(): Int32Field;
    get collapsed(): BooleanField;
    get removable(): BooleanField;
    initializeFields(): ModuleAttributesFields;
}
//# sourceMappingURL=ModuleAttributes.d.ts.map