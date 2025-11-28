import { safeExecute } from "@opendaw/lib-std";
import { Box, Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class NoteEventCollectionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NoteEventCollectionBox({
            uuid,
            graph,
            name: "NoteEventCollectionBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "NoteEventCollectionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNoteEventCollectionBox, this);
    }
    get events() {
        return this.getField(1);
    }
    get owners() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: Field.hook({
                parent: this,
                fieldKey: 1,
                fieldName: "events",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.NoteEvents],
                    mandatory: false,
                },
            }),
            2: Field.hook({
                parent: this,
                fieldKey: 2,
                fieldName: "owners",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.NoteEventCollection],
                    mandatory: true,
                },
            }),
        };
    }
}
