import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, BooleanField, StringField } from "@opendaw/lib-box";
import { ClipPlaybackFields } from "./ClipPlaybackFields";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ValueClipBoxFields = {
    1: PointerField<Pointers.ClipCollection>;
    2: PointerField<Pointers.ValueEventCollection>;
    3: Int32Field;
    4: ClipPlaybackFields;
    10: Int32Field;
    11: BooleanField;
    12: StringField;
    13: Int32Field;
};
export declare class ValueClipBox extends Box<Pointers.Selection | Pointers.Editing, ValueClipBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ValueClipBox>): ValueClipBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get clips(): PointerField<Pointers.ClipCollection>;
    get events(): PointerField<Pointers.ValueEventCollection>;
    get index(): Int32Field;
    get playback(): ClipPlaybackFields;
    get duration(): Int32Field;
    get mute(): BooleanField;
    get label(): StringField;
    get hue(): Int32Field;
    initializeFields(): ValueClipBoxFields;
}
//# sourceMappingURL=ValueClipBox.d.ts.map