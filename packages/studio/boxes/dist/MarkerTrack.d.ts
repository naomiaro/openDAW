import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Field, Int32Field, BooleanField, UnreferenceableType } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export type MarkerTrackFields = {
    1: Field<Pointers.MarkerTrack>;
    10: Int32Field;
    20: BooleanField;
};
export declare class MarkerTrack extends ObjectField<MarkerTrackFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): MarkerTrack;
    private constructor();
    get markers(): Field<Pointers.MarkerTrack>;
    get index(): Int32Field;
    get enabled(): BooleanField;
    initializeFields(): MarkerTrackFields;
}
//# sourceMappingURL=MarkerTrack.d.ts.map