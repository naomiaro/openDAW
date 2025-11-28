import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Field } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { Pointers } from "@opendaw/studio-enums";
export class ModularAudioOutputBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModularAudioOutputBox({
            uuid,
            graph,
            name: "ModularAudioOutputBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ModularAudioOutputBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModularAudioOutputBox, this);
    }
    get attributes() {
        return this.getField(1);
    }
    get input() {
        return this.getField(10);
    }
    initializeFields() {
        return {
            1: ModuleAttributes.create({
                parent: this,
                fieldKey: 1,
                fieldName: "attributes",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            10: Field.hook({
                parent: this,
                fieldKey: 10,
                fieldName: "input",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.VoltageConnection],
                    mandatory: false,
                },
            }),
        };
    }
}
