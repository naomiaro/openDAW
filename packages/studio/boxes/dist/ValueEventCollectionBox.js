import { safeExecute } from "@opendaw/lib-std";
import { Box, Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ValueEventCollectionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ValueEventCollectionBox({
            uuid,
            graph,
            name: "ValueEventCollectionBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ValueEventCollectionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitValueEventCollectionBox, this);
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
                    accepts: [Pointers.ValueEvents],
                    mandatory: false,
                },
            }),
            2: Field.hook({
                parent: this,
                fieldKey: 2,
                fieldName: "owners",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ValueEventCollection],
                    mandatory: true,
                },
            }),
        };
    }
}
