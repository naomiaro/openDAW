import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, BooleanField, Int32Field, Field, } from "@opendaw/lib-box";
import { Device } from "./Device";
import { Pointers } from "@opendaw/studio-enums";
export class MIDIOutputDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new MIDIOutputDeviceBox({
            uuid,
            graph,
            name: "MIDIOutputDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "MIDIOutputDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitMIDIOutputDeviceBox, this);
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
    get deprecatedDevice() {
        return this.getField(10);
    }
    get channel() {
        return this.getField(11);
    }
    get deprecatedDelay() {
        return this.getField(12);
    }
    get parameters() {
        return this.getField(13);
    }
    get device() {
        return this.getField(14);
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
            10: Device.create({
                parent: this,
                fieldKey: 10,
                fieldName: "deprecatedDevice",
                deprecated: true,
                pointerRules: NoPointers,
            }),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "channel",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 15 }, "ch"),
            12: Int32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "deprecatedDelay",
                deprecated: true,
                pointerRules: NoPointers,
            }, "any", "ms", 10),
            13: Field.hook({
                parent: this,
                fieldKey: 13,
                fieldName: "parameters",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Parameter], mandatory: false },
            }),
            14: PointerField.create({
                parent: this,
                fieldKey: 14,
                fieldName: "device",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.MIDIDevice, false),
        };
    }
}
