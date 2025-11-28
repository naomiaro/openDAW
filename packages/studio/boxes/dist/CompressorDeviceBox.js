import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class CompressorDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new CompressorDeviceBox({
            uuid,
            graph,
            name: "CompressorDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "CompressorDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitCompressorDeviceBox, this);
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
    get lookahead() {
        return this.getField(10);
    }
    get automakeup() {
        return this.getField(11);
    }
    get autoattack() {
        return this.getField(12);
    }
    get autorelease() {
        return this.getField(13);
    }
    get inputgain() {
        return this.getField(14);
    }
    get threshold() {
        return this.getField(15);
    }
    get ratio() {
        return this.getField(16);
    }
    get knee() {
        return this.getField(17);
    }
    get attack() {
        return this.getField(18);
    }
    get release() {
        return this.getField(19);
    }
    get makeup() {
        return this.getField(20);
    }
    get mix() {
        return this.getField(21);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "host",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioEffectHost, true),
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
            10: BooleanField.create({
                parent: this,
                fieldKey: 10,
                fieldName: "lookahead",
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
            11: BooleanField.create({
                parent: this,
                fieldKey: 11,
                fieldName: "automakeup",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, true),
            12: BooleanField.create({
                parent: this,
                fieldKey: 12,
                fieldName: "autoattack",
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
            13: BooleanField.create({
                parent: this,
                fieldKey: 13,
                fieldName: "autorelease",
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
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "inputgain",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -30, max: 30, scaling: "linear" }, "dB", 0),
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "threshold",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -60, max: 0, scaling: "linear" }, "dB", -10),
            16: Float32Field.create({
                parent: this,
                fieldKey: 16,
                fieldName: "ratio",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 1, max: 24, scaling: "exponential" }, "", 2),
            17: Float32Field.create({
                parent: this,
                fieldKey: 17,
                fieldName: "knee",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0, max: 24, scaling: "linear" }, "dB", 0),
            18: Float32Field.create({
                parent: this,
                fieldKey: 18,
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
            }, { min: 0, max: 100, scaling: "linear" }, "ms", 0),
            19: Float32Field.create({
                parent: this,
                fieldKey: 19,
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
            }, { min: 5, max: 1500, scaling: "linear" }, "ms", 5),
            20: Float32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "makeup",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -40, max: 40, scaling: "linear" }, "dB", 0),
            21: Float32Field.create({
                parent: this,
                fieldKey: 21,
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
