import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, BooleanField, StringField } from "@opendaw/lib-box";
import { ClipPlaybackFields } from "./ClipPlaybackFields";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type NoteClipBoxFields = {
    1: PointerField<Pointers.ClipCollection>;
    2: PointerField<Pointers.NoteEventCollection>;
    3: Int32Field;
    4: ClipPlaybackFields;
    10: Int32Field;
    11: BooleanField;
    12: StringField;
    13: Int32Field;
};
export declare class NoteClipBox extends Box<Pointers.Selection | Pointers.Editing, NoteClipBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<NoteClipBox>): NoteClipBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get clips(): PointerField<Pointers.ClipCollection>;
    get events(): PointerField<Pointers.NoteEventCollection>;
    get index(): Int32Field;
    get playback(): ClipPlaybackFields;
    get duration(): Int32Field;
    get mute(): BooleanField;
    get label(): StringField;
    get hue(): Int32Field;
    initializeFields(): NoteClipBoxFields;
}
//# sourceMappingURL=NoteClipBox.d.ts.map