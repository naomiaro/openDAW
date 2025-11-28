import "@opendaw/lib-std";
import { ObjectField, NoPointers, Field, Int32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class MarkerTrack extends ObjectField {
    static create(construct) {
        return new MarkerTrack(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get markers() {
        return this.getField(1);
    }
    get index() {
        return this.getField(10);
    }
    get enabled() {
        return this.getField(20);
    }
    initializeFields() {
        return {
            1: Field.hook({
                parent: this,
                fieldKey: 1,
                fieldName: "markers",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.MarkerTrack],
                    mandatory: false,
                },
            }),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            20: BooleanField.create({
                parent: this,
                fieldKey: 20,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
        };
    }
}
