import "@opendaw/lib-std";
import { ObjectField, NoPointers, PointerField, StringField, Int32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ModuleAttributes extends ObjectField {
    static create(construct) {
        return new ModuleAttributes(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get collection() {
        return this.getField(1);
    }
    get label() {
        return this.getField(2);
    }
    get x() {
        return this.getField(3);
    }
    get y() {
        return this.getField(4);
    }
    get collapsed() {
        return this.getField(5);
    }
    get removable() {
        return this.getField(6);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "collection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ModuleCollection, true),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "x",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "x"),
            4: Int32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "y",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "y"),
            5: BooleanField.create({
                parent: this,
                fieldKey: 5,
                fieldName: "collapsed",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
            6: BooleanField.create({
                parent: this,
                fieldKey: 6,
                fieldName: "removable",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
        };
    }
}
