import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ModularBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModularBox({
            uuid,
            graph,
            name: "ModularBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "ModularBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModularBox, this);
    }
    get collection() {
        return this.getField(1);
    }
    get device() {
        return this.getField(2);
    }
    get editing() {
        return this.getField(3);
    }
    get modules() {
        return this.getField(11);
    }
    get connections() {
        return this.getField(12);
    }
    get label() {
        return this.getField(13);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "collection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ModularSetup, true),
            2: Field.hook({
                parent: this,
                fieldKey: 2,
                fieldName: "device",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ModularSetup],
                    mandatory: true,
                },
            }),
            3: Field.hook({
                parent: this,
                fieldKey: 3,
                fieldName: "editing",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Editing], mandatory: false },
            }),
            11: Field.hook({
                parent: this,
                fieldKey: 11,
                fieldName: "modules",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ModuleCollection],
                    mandatory: false,
                },
            }),
            12: Field.hook({
                parent: this,
                fieldKey: 12,
                fieldName: "connections",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ConnectionCollection],
                    mandatory: false,
                },
            }),
            13: StringField.create({
                parent: this,
                fieldKey: 13,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
