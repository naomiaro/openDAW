import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ArpeggioDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ArpeggioDeviceBox({
            uuid,
            graph,
            name: "ArpeggioDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "ArpeggioDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitArpeggioDeviceBox, this);
    }
    get host() {
        return this.getField(1);
    }
    get index() {
        return this.getField(2);
    }
    get label() {
        return this.getField(3);
    }
    get enabled() {
        return this.getField(4);
    }
    get minimized() {
        return this.getField(5);
    }
    get modeIndex() {
        return this.getField(10);
    }
    get numOctaves() {
        return this.getField(11);
    }
    get rateIndex() {
        return this.getField(12);
    }
    get gate() {
        return this.getField(13);
    }
    get repeat() {
        return this.getField(14);
    }
    get velocity() {
        return this.getField(15);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "host",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.MidiEffectHost, true),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            4: BooleanField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            5: BooleanField.create({
                parent: this,
                fieldKey: 5,
                fieldName: "minimized",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "modeIndex",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { length: 3 }, "", 0),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "numOctaves",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 1, max: 5 }, "oct", 1),
            12: Int32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "rateIndex",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { length: 17 }, "", 9),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "gate",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0, max: 2, scaling: "linear" }, "", 1),
            14: Int32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "repeat",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 1, max: 16 }, "", 1),
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "velocity",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "", 0),
        };
    }
}
