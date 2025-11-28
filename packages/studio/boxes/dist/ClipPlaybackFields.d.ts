import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, BooleanField, Int32Field, UnreferenceableType } from "@opendaw/lib-box";
export type ClipPlaybackFieldsFields = {
    1: BooleanField;
    2: BooleanField;
    3: BooleanField;
    4: Int32Field;
    5: Int32Field;
    6: Int32Field;
};
export declare class ClipPlaybackFields extends ObjectField<ClipPlaybackFieldsFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): ClipPlaybackFields;
    private constructor();
    get loop(): BooleanField;
    get reverse(): BooleanField;
    get mute(): BooleanField;
    get speed(): Int32Field;
    get quantise(): Int32Field;
    get trigger(): Int32Field;
    initializeFields(): ClipPlaybackFieldsFields;
}
//# sourceMappingURL=ClipPlaybackFields.d.ts.map