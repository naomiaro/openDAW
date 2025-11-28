import "@opendaw/lib-std";
import { ObjectField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class VaporisateurOsc extends ObjectField {
    static create(construct) {
        return new VaporisateurOsc(construct);
    }
    constructor(construct) {
        super(construct);
    }
    get waveform() {
        return this.getField(1);
    }
    get volume() {
        return this.getField(2);
    }
    get octave() {
        return this.getField(3);
    }
    get tune() {
        return this.getField(4);
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
            }, "decibel", "db", -Infinity),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "octave",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -3, max: 3 }, "oct", 0),
            4: Float32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "tune",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -1200, max: 1200, scaling: "linear" }, "ct"),
        };
    }
}
