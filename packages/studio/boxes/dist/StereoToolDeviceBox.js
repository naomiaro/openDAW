import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class StereoToolDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new StereoToolDeviceBox({
            uuid,
            graph,
            name: "StereoToolDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "StereoToolDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitStereoToolDeviceBox, this);
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
    get volume() {
        return this.getField(10);
    }
    get panning() {
        return this.getField(11);
    }
    get stereo() {
        return this.getField(12);
    }
    get invertL() {
        return this.getField(13);
    }
    get invertR() {
        return this.getField(14);
    }
    get swap() {
        return this.getField(15);
    }
    get panningMixing() {
        return this.getField(20);
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
            }, { min: -72, mid: 0, max: 12, scaling: "decibel" }, "dB", 0),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "panning",
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
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "stereo",
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
            13: BooleanField.create({
                parent: this,
                fieldKey: 13,
                fieldName: "invertL",
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
            14: BooleanField.create({
                parent: this,
                fieldKey: 14,
                fieldName: "invertR",
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
            15: BooleanField.create({
                parent: this,
                fieldKey: 15,
                fieldName: "swap",
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
            20: Int32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "panningMixing",
                deprecated: false,
                pointerRules: NoPointers,
            }, { values: [0, 1] }, "", 1),
        };
    }
}
