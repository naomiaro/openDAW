import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ValueEventBoxFields = {
    1: PointerField<Pointers.ValueEvents>;
    10: Int32Field;
    11: Int32Field;
    12: Int32Field<Pointers.ValueInterpolation>;
    13: Float32Field;
    14: Float32Field;
};
export declare class ValueEventBox extends Box<Pointers.Selection, ValueEventBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ValueEventBox>): ValueEventBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get events(): PointerField<Pointers.ValueEvents>;
    get position(): Int32Field;
    get index(): Int32Field;
    get interpolation(): Int32Field<Pointers.ValueInterpolation>;
    get value(): Float32Field;
    get slope(): Float32Field;
    initializeFields(): ValueEventBoxFields;
}
//# sourceMappingURL=ValueEventBox.d.ts.map