import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Field, Float32Field, } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { Pointers } from "@opendaw/studio-enums";
export class ModuleDelayBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModuleDelayBox({
            uuid,
            graph,
            name: "ModuleDelayBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ModuleDelayBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModuleDelayBox, this);
    }
    get attributes() {
        return this.getField(1);
    }
    get voltageInput() {
        return this.getField(10);
    }
    get voltageOutput() {
        return this.getField(11);
    }
    get time() {
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
                fieldName: "voltageInput",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.VoltageConnection],
                    mandatory: false,
                },
            }),
            11: Field.hook({
                parent: this,
                fieldKey: 11,
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
                fieldName: "time",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ParameterController],
                    mandatory: false,
                },
            }, { min: 1, max: 1000, scaling: "exponential" }, "ms", 500),
        };
    }
}
