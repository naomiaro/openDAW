import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class NoteEventRepeatBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NoteEventRepeatBox({
            uuid,
            graph,
            name: "NoteEventRepeatBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "NoteEventRepeatBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNoteEventRepeatBox, this);
    }
    get event() {
        return this.getField(1);
    }
    get count() {
        return this.getField(2);
    }
    get curve() {
        return this.getField(3);
    }
    get length() {
        return this.getField(4);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "event",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.NoteEventFeature, true),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "count",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 1, max: 128 }, "", 1),
            3: Float32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "curve",
                deprecated: false,
                pointerRules: NoPointers,
            }, "bipolar", "%", 0),
            4: Float32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "length",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%", 1),
        };
    }
}
