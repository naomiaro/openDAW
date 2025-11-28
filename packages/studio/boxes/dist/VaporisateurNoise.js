import "@opendaw/lib-std";
import { ObjectField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class VaporisateurNoise extends ObjectField {
    static create(construct) {
        return new VaporisateurNoise(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get attack() {
        return this.getField(1);
    }
    get hold() {
        return this.getField(2);
    }
    get release() {
        return this.getField(3);
    }
    get volume() {
        return this.getField(4);
    }
    initializeFields() {
        return {
            1: Float32Field.create({
                parent: this,
                fieldKey: 1,
                fieldName: "attack",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s", 0.001),
            2: Float32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "hold",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s", 0.001),
            3: Float32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "release",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s", 0.001),
            4: Float32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "volume",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "decibel", "db", 0.001),
        };
    }
}
