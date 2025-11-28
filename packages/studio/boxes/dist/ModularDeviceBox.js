import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, } from "@opendaw/lib-box";
import { DeviceUserInterface } from "./DeviceUserInterface";
import { Pointers } from "@opendaw/studio-enums";
export class ModularDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModularDeviceBox({
            uuid,
            graph,
            name: "ModularDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "ModularDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModularDeviceBox, this);
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
    get modularSetup() {
        return this.getField(10);
    }
    get userInterface() {
        return this.getField(11);
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
            10: PointerField.create({
                parent: this,
                fieldKey: 10,
                fieldName: "modularSetup",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ModularSetup, true),
            11: DeviceUserInterface.create({
                parent: this,
                fieldKey: 11,
                fieldName: "userInterface",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
