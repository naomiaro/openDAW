import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class UserInterfaceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new UserInterfaceBox({
            uuid,
            graph,
            name: "UserInterfaceBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "UserInterfaceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitUserInterfaceBox, this);
    }
    get root() {
        return this.getField(1);
    }
    get selection() {
        return this.getField(10);
    }
    get uploadStates() {
        return this.getField(11);
    }
    get editingDeviceChain() {
        return this.getField(21);
    }
    get editingTimelineRegion() {
        return this.getField(22);
    }
    get editingModularSystem() {
        return this.getField(23);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "root",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.User, true),
            10: Field.hook({
                parent: this,
                fieldKey: 10,
                fieldName: "selection",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Selection], mandatory: false },
            }),
            11: Field.hook({
                parent: this,
                fieldKey: 11,
                fieldName: "uploadStates",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.FileUploadState],
                    mandatory: false,
                },
            }),
            21: PointerField.create({
                parent: this,
                fieldKey: 21,
                fieldName: "editingDeviceChain",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Editing, false),
            22: PointerField.create({
                parent: this,
                fieldKey: 22,
                fieldName: "editingTimelineRegion",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Editing, false),
            23: PointerField.create({
                parent: this,
                fieldKey: 23,
                fieldName: "editingModularSystem",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Editing, false),
        };
    }
}
