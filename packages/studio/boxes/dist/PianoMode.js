import "@opendaw/lib-std";
import { ObjectField, NoPointers, Int32Field, Float32Field, BooleanField, } from "@opendaw/lib-box";
export class PianoMode extends ObjectField {
    static create(construct) {
        return new PianoMode(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get keyboard() {
        return this.getField(1);
    }
    get timeRangeInQuarters() {
        return this.getField(2);
    }
    get noteScale() {
        return this.getField(3);
    }
    get noteLabels() {
        return this.getField(4);
    }
    get transpose() {
        return this.getField(5);
    }
    initializeFields() {
        return {
            1: Int32Field.create({
                parent: this,
                fieldKey: 1,
                fieldName: "keyboard",
                deprecated: false,
                pointerRules: NoPointers,
            }, { length: 4 }, "", 0),
            2: Float32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "timeRangeInQuarters",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 1, max: 64, scaling: "linear" }, "", 8),
            3: Float32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "noteScale",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0.5, max: 2, scaling: "linear" }, "", 1),
            4: BooleanField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "noteLabels",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
            5: Int32Field.create({
                parent: this,
                fieldKey: 5,
                fieldName: "transpose",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: -48, max: 48 }, "st", 0),
        };
    }
}
