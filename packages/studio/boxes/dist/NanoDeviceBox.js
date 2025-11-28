import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class NanoDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NanoDeviceBox({
            uuid,
            graph,
            name: "NanoDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "NanoDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNanoDeviceBox, this);
    }
    get host() {
        return this.getField(1);
    }
    get label() {
        return this.getField(2);
    }
    get icon() {
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
    get file() {
        return this.getField(15);
    }
    get release() {
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
            }, Pointers.InstrumentHost, true),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "icon",
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
            }, "decibel", "dB", -3),
            15: PointerField.create({
                parent: this,
                fieldKey: 15,
                fieldName: "file",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioFile, false),
            20: Float32Field.create({
                parent: this,
                fieldKey: 20,
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
            }, { min: 0.001, max: 8, scaling: "exponential" }, "s", 0.1),
        };
    }
}
