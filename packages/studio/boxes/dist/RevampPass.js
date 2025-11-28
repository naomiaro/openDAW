import "@opendaw/lib-std";
import { ObjectField, BooleanField, Float32Field, Int32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class RevampPass extends ObjectField {
    static create(construct) {
        return new RevampPass(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get enabled() {
        return this.getField(1);
    }
    get frequency() {
        return this.getField(10);
    }
    get order() {
        return this.getField(11);
    }
    get q() {
        return this.getField(12);
    }
    initializeFields() {
        return {
            1: BooleanField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }),
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "frequency",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 20, max: 20000, scaling: "exponential" }, "Hz"),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "order",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { length: 4 }, ""),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "q",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.01, max: 10, scaling: "exponential" }, ""),
        };
    }
}
