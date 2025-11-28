import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Int32Field, Float32Field, BooleanField, UnreferenceableType } from "@opendaw/lib-box";
export type PianoModeFields = {
    1: Int32Field;
    2: Float32Field;
    3: Float32Field;
    4: BooleanField;
    5: Int32Field;
};
export declare class PianoMode extends ObjectField<PianoModeFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): PianoMode;
    private constructor();
    get keyboard(): Int32Field;
    get timeRangeInQuarters(): Float32Field;
    get noteScale(): Float32Field;
    get noteLabels(): BooleanField;
    get transpose(): Int32Field;
    initializeFields(): PianoModeFields;
}
//# sourceMappingURL=PianoMode.d.ts.map