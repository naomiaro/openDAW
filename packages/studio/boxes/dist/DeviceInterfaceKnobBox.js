import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, Float32Field, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class DeviceInterfaceKnobBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new DeviceInterfaceKnobBox({
            uuid,
            graph,
            name: "DeviceInterfaceKnobBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "DeviceInterfaceKnobBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitDeviceInterfaceKnobBox, this);
    }
    get userInterface() {
        return this.getField(1);
    }
    get parameter() {
        return this.getField(2);
    }
    get index() {
        return this.getField(3);
    }
    get anchor() {
        return this.getField(10);
    }
    get color() {
        return this.getField(11);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "userInterface",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.DeviceUserInterface, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "parameter",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ParameterController, true),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "anchor",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%"),
            11: StringField.create({
                parent: this,
                fieldKey: 11,
                fieldName: "color",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
