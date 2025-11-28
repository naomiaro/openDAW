import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type NoteEventRepeatBoxFields = {
    1: PointerField<Pointers.NoteEventFeature>;
    2: Int32Field;
    3: Float32Field;
    4: Float32Field;
};
export declare class NoteEventRepeatBox extends Box<UnreferenceableType, NoteEventRepeatBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<NoteEventRepeatBox>): NoteEventRepeatBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get event(): PointerField<Pointers.NoteEventFeature>;
    get count(): Int32Field;
    get curve(): Float32Field;
    get length(): Float32Field;
    initializeFields(): NoteEventRepeatBoxFields;
}
//# sourceMappingURL=NoteEventRepeatBox.d.ts.map