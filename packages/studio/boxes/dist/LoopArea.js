import "@opendaw/lib-std";
import { ObjectField, NoPointers, BooleanField, Int32Field, } from "@opendaw/lib-box";
export class LoopArea extends ObjectField {
    static create(construct) {
        return new LoopArea(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get enabled() {
        return this.getField(1);
    }
    get from() {
        return this.getField(2);
    }
    get to() {
        return this.getField(3);
    }
    initializeFields() {
        return {
            1: BooleanField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "from",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn", 0),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "to",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn", 15360),
        };
    }
}
