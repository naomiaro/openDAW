import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, BooleanField, Int32Field, UnreferenceableType } from "@opendaw/lib-box";
export type LoopAreaFields = {
    1: BooleanField;
    2: Int32Field;
    3: Int32Field;
};
export declare class LoopArea extends ObjectField<LoopAreaFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): LoopArea;
    private constructor();
    get enabled(): BooleanField;
    get from(): Int32Field;
    get to(): Int32Field;
    initializeFields(): LoopAreaFields;
}
//# sourceMappingURL=LoopArea.d.ts.map