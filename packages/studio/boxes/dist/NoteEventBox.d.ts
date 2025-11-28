import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type NoteEventBoxFields = {
    1: PointerField<Pointers.NoteEvents>;
    10: Int32Field;
    11: Int32Field;
    20: Int32Field;
    21: Float32Field;
    22: Int32Field;
    23: Float32Field;
    24: Float32Field;
    25: Int32Field;
};
export declare class NoteEventBox extends Box<Pointers.Selection | Pointers.NoteEventFeature, NoteEventBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<NoteEventBox>): NoteEventBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get events(): PointerField<Pointers.NoteEvents>;
    get position(): Int32Field;
    get duration(): Int32Field;
    get pitch(): Int32Field;
    get velocity(): Float32Field;
    get playCount(): Int32Field;
    get playCurve(): Float32Field;
    get cent(): Float32Field;
    get chance(): Int32Field;
    initializeFields(): NoteEventBoxFields;
}
//# sourceMappingURL=NoteEventBox.d.ts.map