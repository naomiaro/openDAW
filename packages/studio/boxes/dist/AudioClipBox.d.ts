import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, BooleanField, StringField, Float32Field } from "@opendaw/lib-box";
import { ClipPlaybackFields } from "./ClipPlaybackFields";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AudioClipBoxFields = {
    1: PointerField<Pointers.ClipCollection>;
    2: PointerField<Pointers.AudioFile>;
    3: Int32Field;
    4: ClipPlaybackFields;
    5: PointerField<Pointers.ValueEventCollection>;
    10: Int32Field;
    11: BooleanField;
    12: StringField;
    13: Int32Field;
    14: Float32Field;
};
export declare class AudioClipBox extends Box<Pointers.Selection | Pointers.Editing, AudioClipBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AudioClipBox>): AudioClipBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get clips(): PointerField<Pointers.ClipCollection>;
    get file(): PointerField<Pointers.AudioFile>;
    get index(): Int32Field;
    get playback(): ClipPlaybackFields;
    get events(): PointerField<Pointers.ValueEventCollection>;
    get duration(): Int32Field;
    get mute(): BooleanField;
    get label(): StringField;
    get hue(): Int32Field;
    get gain(): Float32Field;
    initializeFields(): AudioClipBoxFields;
}
//# sourceMappingURL=AudioClipBox.d.ts.map