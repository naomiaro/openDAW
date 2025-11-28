import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ValueEventCurveBoxFields = {
    1: PointerField<Pointers.ValueInterpolation>;
    2: Float32Field;
};
export declare class ValueEventCurveBox extends Box<UnreferenceableType, ValueEventCurveBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ValueEventCurveBox>): ValueEventCurveBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get event(): PointerField<Pointers.ValueInterpolation>;
    get slope(): Float32Field;
    initializeFields(): ValueEventCurveBoxFields;
}
//# sourceMappingURL=ValueEventCurveBox.d.ts.map