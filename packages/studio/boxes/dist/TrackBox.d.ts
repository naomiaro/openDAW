import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, Int32Field, BooleanField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type TrackBoxFields = {
    1: PointerField<Pointers.TrackCollection>;
    2: PointerField<Pointers.Automation>;
    3: Field<Pointers.RegionCollection>;
    4: Field<Pointers.ClipCollection>;
    10: Int32Field;
    11: Int32Field;
    20: BooleanField;
    30: BooleanField;
};
export declare class TrackBox extends Box<Pointers.Selection | Pointers.PianoMode, TrackBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<TrackBox>): TrackBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get tracks(): PointerField<Pointers.TrackCollection>;
    get target(): PointerField<Pointers.Automation>;
    get regions(): Field<Pointers.RegionCollection>;
    get clips(): Field<Pointers.ClipCollection>;
    get index(): Int32Field;
    get type(): Int32Field;
    get enabled(): BooleanField;
    get excludePianoMode(): BooleanField;
    initializeFields(): TrackBoxFields;
}
//# sourceMappingURL=TrackBox.d.ts.map