import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class VelocityDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new VelocityDeviceBox({
            uuid,
            graph,
            name: "VelocityDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "VelocityDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitVelocityDeviceBox, this);
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
    get magnetPosition() {
        return this.getField(10);
    }
    get magnetStrength() {
        return this.getField(11);
    }
    get randomSeed() {
        return this.getField(12);
    }
    get randomAmount() {
        return this.getField(13);
    }
    get offset() {
        return this.getField(14);
    }
    get mix() {
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
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "magnetPosition",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.5),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "magnetStrength",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%"),
            12: Int32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "randomSeed",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "", 2048),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "randomAmount",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%"),
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "offset",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "%", 0),
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "mix",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 1),
        };
    }
}
