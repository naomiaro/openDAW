import "@opendaw/lib-std";
import { ObjectField, Int32Field, Float32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class VaporisateurLFO extends ObjectField {
    static create(construct) {
        return new VaporisateurLFO(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get waveform() {
        return this.getField(1);
    }
    get rate() {
        return this.getField(2);
    }
    get sync() {
        return this.getField(3);
    }
    get targetTune() {
        return this.getField(10);
    }
    get targetCutoff() {
        return this.getField(11);
    }
    get targetVolume() {
        return this.getField(12);
    }
    initializeFields() {
        return {
            1: Int32Field.create({
                parent: this,
                fieldKey: 1,
                fieldName: "waveform",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { values: [0, 1, 2, 3] }, ""),
            2: Float32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "rate",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.0001, max: 30, scaling: "exponential" }, "Hz", 0.0001),
            3: BooleanField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "sync",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, false),
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "targetTune",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "%"),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "targetCutoff",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "%"),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "targetVolume",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "%"),
        };
    }
}
