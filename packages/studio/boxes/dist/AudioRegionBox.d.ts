import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, Int32Field, Float32Field, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AudioRegionBoxFields = {
    1: PointerField<Pointers.RegionCollection>;
    2: PointerField<Pointers.AudioFile>;
    3: StringField;
    4: StringField;
    5: PointerField<Pointers.ValueEventCollection>;
    10: Int32Field;
    11: Float32Field;
    12: Float32Field;
    13: Float32Field;
    14: BooleanField;
    15: StringField;
    16: Int32Field;
    17: Float32Field;
};
export declare class AudioRegionBox extends Box<Pointers.Selection | Pointers.Editing, AudioRegionBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AudioRegionBox>): AudioRegionBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get regions(): PointerField<Pointers.RegionCollection>;
    get file(): PointerField<Pointers.AudioFile>;
    get playback(): StringField;
    get timeBase(): StringField;
    get events(): PointerField<Pointers.ValueEventCollection>;
    get position(): Int32Field;
    get duration(): Float32Field;
    get loopOffset(): Float32Field;
    get loopDuration(): Float32Field;
    get mute(): BooleanField;
    get label(): StringField;
    get hue(): Int32Field;
    get gain(): Float32Field;
    initializeFields(): AudioRegionBoxFields;
}
//# sourceMappingURL=AudioRegionBox.d.ts.map