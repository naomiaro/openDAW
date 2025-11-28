import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Field, Float32Field, } from "@opendaw/lib-box";
import { ModuleAttributes } from "./ModuleAttributes";
import { Pointers } from "@opendaw/studio-enums";
export class ModuleGainBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ModuleGainBox({
            uuid,
            graph,
            name: "ModuleGainBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ModuleGainBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitModuleGainBox, this);
    }
    get attributes() {
        return this.getField(1);
    }
    get voltageInput() {
        return this.getField(10);
    }
    get voltageOutput() {
        return this.getField(12);
    }
    get gain() {
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
                fieldName: "gain",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ParameterController],
                    mandatory: false,
                },
            }, "decibel", "dB"),
        };
    }
}
