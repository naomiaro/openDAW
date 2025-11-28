import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, BooleanField, StringField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ValueRegionBoxFields = {
    1: PointerField<Pointers.RegionCollection>;
    2: PointerField<Pointers.ValueEventCollection>;
    10: Int32Field;
    11: Int32Field;
    12: Int32Field;
    13: Int32Field;
    14: BooleanField;
    15: StringField;
    16: Int32Field;
};
export declare class ValueRegionBox extends Box<Pointers.Selection | Pointers.Editing, ValueRegionBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ValueRegionBox>): ValueRegionBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get regions(): PointerField<Pointers.RegionCollection>;
    get events(): PointerField<Pointers.ValueEventCollection>;
    get position(): Int32Field;
    get duration(): Int32Field;
    get loopOffset(): Int32Field;
    get loopDuration(): Int32Field;
    get mute(): BooleanField;
    get label(): StringField;
    get hue(): Int32Field;
    initializeFields(): ValueRegionBoxFields;
}
//# sourceMappingURL=ValueRegionBox.d.ts.map