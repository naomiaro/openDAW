import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class ValueEventCurveBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new ValueEventCurveBox({
            uuid,
            graph,
            name: "ValueEventCurveBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "ValueEventCurveBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitValueEventCurveBox, this);
    }
    get event() {
        return this.getField(1);
    }
    get slope() {
        return this.getField(2);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "event",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ValueInterpolation, true),
            2: Float32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "slope",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%", 0.5),
        };
    }
}
