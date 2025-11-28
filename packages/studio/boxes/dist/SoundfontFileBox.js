import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class SoundfontFileBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new SoundfontFileBox({
            uuid,
            graph,
            name: "SoundfontFileBox",
            pointerRules: {
                accepts: [Pointers.SoundfontFile],
                mandatory: true,
            },
        }), constructor);
    }
    static ClassName = "SoundfontFileBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitSoundfontFileBox, this);
    }
    get fileName() {
        return this.getField(1);
    }
    initializeFields() {
        return {
            1: StringField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "fileName",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
