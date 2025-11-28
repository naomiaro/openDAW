import "@opendaw/lib-std";
import { ObjectField, NoPointers, BooleanField, Int32Field, } from "@opendaw/lib-box";
export class ClipPlaybackFields extends ObjectField {
    static create(construct) {
        return new ClipPlaybackFields(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get loop() {
        return this.getField(1);
    }
    get reverse() {
        return this.getField(2);
    }
    get mute() {
        return this.getField(3);
    }
    get speed() {
        return this.getField(4);
    }
    get quantise() {
        return this.getField(5);
    }
    get trigger() {
        return this.getField(6);
    }
    initializeFields() {
        return {
            1: BooleanField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "loop",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            2: BooleanField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "reverse",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            3: BooleanField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "mute",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            4: Int32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "speed",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", ""),
            5: Int32Field.create({
                parent: this,
                fieldKey: 5,
                fieldName: "quantise",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", ""),
            6: Int32Field.create({
                parent: this,
                fieldKey: 6,
                fieldName: "trigger",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", ""),
        };
    }
}
