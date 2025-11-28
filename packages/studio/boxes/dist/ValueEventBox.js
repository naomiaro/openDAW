import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ValueEventBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ValueEventBox({
            uuid,
            graph,
            name: "ValueEventBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "ValueEventBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitValueEventBox, this);
    }
    get events() {
        return this.getField(1);
    }
    get position() {
        return this.getField(10);
    }
    get index() {
        return this.getField(11);
    }
    get interpolation() {
        return this.getField(12);
    }
    get value() {
        return this.getField(13);
    }
    get slope() {
        return this.getField(14);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "events",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ValueEvents, true),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "position",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn"),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            12: Int32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "interpolation",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ValueInterpolation],
                    mandatory: false,
                },
            }, { values: [0, 1] }, "", 1),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "value",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%"),
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "slope",
                deprecated: true,
                pointerRules: NoPointers,
            }, "any", "", NaN),
        };
    }
}
