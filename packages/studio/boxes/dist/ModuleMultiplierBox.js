import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Field, Float32Field, } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { Pointers } from "@opendaw/studio-enums";
export class ModuleMultiplierBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModuleMultiplierBox({
            uuid,
            graph,
            name: "ModuleMultiplierBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ModuleMultiplierBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModuleMultiplierBox, this);
    }
    get attributes() {
        return this.getField(1);
    }
    get voltageInputX() {
        return this.getField(10);
    }
    get voltageInputY() {
        return this.getField(11);
    }
    get voltageOutput() {
        return this.getField(12);
    }
    get multiplier() {
        return this.getField(20);
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
                fieldName: "voltageInputX",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.VoltageConnection],
                    mandatory: false,
                },
            }),
            11: Field.hook({
                parent: this,
                fieldKey: 11,
                fieldName: "voltageInputY",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.VoltageConnection],
                    mandatory: false,
                },
            }),
            12: Field.hook({
                parent: this,
                fieldKey: 12,
                fieldName: "voltageOutput",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.VoltageConnection],
                    mandatory: false,
                },
            }),
            20: Float32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "multiplier",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%"),
        };
    }
}
