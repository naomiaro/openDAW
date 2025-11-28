import "@opendaw/lib-std";
import { ObjectField, NoPointers, StringField, } from "@opendaw/lib-box";
export class Device extends ObjectField {
    static create(construct) {
        return new Device(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get id() {
        return this.getField(1);
    }
    get label() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: StringField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "id",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
