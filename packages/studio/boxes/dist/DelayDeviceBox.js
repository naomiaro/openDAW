import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class DelayDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new DelayDeviceBox({
            uuid,
            graph,
            name: "DelayDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "DelayDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitDelayDeviceBox, this);
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
    get delay() {
        return this.getField(10);
    }
    get feedback() {
        return this.getField(11);
    }
    get cross() {
        return this.getField(12);
    }
    get filter() {
        return this.getField(13);
    }
    get wet() {
        return this.getField(14);
    }
    get dry() {
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
                fieldName: "delay",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "any", "", 4),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "feedback",
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
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "cross",
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
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "filter",
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
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
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
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
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
