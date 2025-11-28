import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type MarkerBoxFields = {
    1: PointerField<Pointers.MarkerTrack>;
    2: Int32Field;
    3: Int32Field;
    4: StringField;
    5: Int32Field;
};
export declare class MarkerBox extends Box<Pointers.Selection, MarkerBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<MarkerBox>): MarkerBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get track(): PointerField<Pointers.MarkerTrack>;
    get position(): Int32Field;
    get plays(): Int32Field;
    get label(): StringField;
    get hue(): Int32Field;
    initializeFields(): MarkerBoxFields;
}
//# sourceMappingURL=MarkerBox.d.ts.map