import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ModuleConnectionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModuleConnectionBox({
            uuid,
            graph,
            name: "ModuleConnectionBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "ModuleConnectionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModuleConnectionBox, this);
    }
    get collection() {
        return this.getField(1);
    }
    get source() {
        return this.getField(2);
    }
    get target() {
        return this.getField(3);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "collection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ConnectionCollection, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "source",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.VoltageConnection, true),
            3: PointerField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "target",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.VoltageConnection, true),
        };
    }
}
