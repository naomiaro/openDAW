import "@opendaw/lib-std";
import { ObjectField, NoPointers, Int32Field, } from "@opendaw/lib-box";
export class Signature extends ObjectField {
    static create(construct) {
        return new Signature(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get nominator() {
        return this.getField(1);
    }
    get denominator() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: Int32Field.create({
                parent: this,
                fieldKey: 1,
                fieldName: "nominator",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 1, max: 32 }, "", 4),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "denominator",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 1, max: 32 }, "", 4),
        };
    }
}
