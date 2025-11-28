import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class SelectionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new SelectionBox({
            uuid,
            graph,
            name: "SelectionBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "SelectionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitSelectionBox, this);
    }
    get selection() {
        return this.getField(1);
    }
    get selectable() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "selection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Selection, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "selectable",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Selection, true),
        };
    }
}
