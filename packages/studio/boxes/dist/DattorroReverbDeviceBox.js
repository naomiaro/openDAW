import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class DattorroReverbDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new DattorroReverbDeviceBox({
            uuid,
            graph,
            name: "DattorroReverbDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "DattorroReverbDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitDattorroReverbDeviceBox, this);
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
    get preDelay() {
        return this.getField(10);
    }
    get bandwidth() {
        return this.getField(11);
    }
    get inputDiffusion1() {
        return this.getField(12);
    }
    get inputDiffusion2() {
        return this.getField(13);
    }
    get decay() {
        return this.getField(14);
    }
    get decayDiffusion1() {
        return this.getField(15);
    }
    get decayDiffusion2() {
        return this.getField(16);
    }
    get damping() {
        return this.getField(17);
    }
    get excursionRate() {
        return this.getField(18);
    }
    get excursionDepth() {
        return this.getField(19);
    }
    get wet() {
        return this.getField(20);
    }
    get dry() {
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
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "preDelay",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0, max: 1000, scaling: "linear" }, "ms", 0),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "bandwidth",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.9999),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "inputDiffusion1",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.75),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "inputDiffusion2",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.625),
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "decay",
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
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "decayDiffusion1",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.7),
            16: Float32Field.create({
                parent: this,
                fieldKey: 16,
                fieldName: "decayDiffusion2",
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
            17: Float32Field.create({
                parent: this,
                fieldKey: 17,
                fieldName: "damping",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.005),
            18: Float32Field.create({
                parent: this,
                fieldKey: 18,
                fieldName: "excursionRate",
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
            19: Float32Field.create({
                parent: this,
                fieldKey: 19,
                fieldName: "excursionDepth",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.7),
            20: Float32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "wet",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "decibel", "dB", -6),
            21: Float32Field.create({
                parent: this,
                fieldKey: 21,
                fieldName: "dry",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "decibel", "dB", 0),
        };
    }
}
