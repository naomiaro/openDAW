import "@opendaw/lib-std";
import { ObjectField, FieldConstruct, Int32Field, UnreferenceableType } from "@opendaw/lib-box";
export type SignatureFields = {
    1: Int32Field;
    2: Int32Field;
};
export declare class Signature extends ObjectField<SignatureFields> {
    static create(construct: FieldConstruct<UnreferenceableType>): Signature;
    private constructor();
    get nominator(): Int32Field;
    get denominator(): Int32Field;
    initializeFields(): SignatureFields;
}
//# sourceMappingURL=Signature.d.ts.map