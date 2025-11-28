import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class NoteEventBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NoteEventBox({
            uuid,
            graph,
            name: "NoteEventBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.NoteEventFeature],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "NoteEventBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNoteEventBox, this);
    }
    get events() {
        return this.getField(1);
    }
    get position() {
        return this.getField(10);
    }
    get duration() {
        return this.getField(11);
    }
    get pitch() {
        return this.getField(20);
    }
    get velocity() {
        return this.getField(21);
    }
    get playCount() {
        return this.getField(22);
    }
    get playCurve() {
        return this.getField(23);
    }
    get cent() {
        return this.getField(24);
    }
    get chance() {
        return this.getField(25);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "events",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.NoteEvents, true),
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
                fieldName: "duration",
                deprecated: false,
                pointerRules: NoPointers,
            }, "positive", "ppqn", 240),
            20: Int32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "pitch",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 127 }, "", 60),
            21: Float32Field.create({
                parent: this,
                fieldKey: 21,
                fieldName: "velocity",
                deprecated: false,
                pointerRules: NoPointers,
            }, "unipolar", "%", 0.7874015748031497),
            22: Int32Field.create({
                parent: this,
                fieldKey: 22,
                fieldName: "playCount",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 1, max: 128 }, "", 1),
            23: Float32Field.create({
                parent: this,
                fieldKey: 23,
                fieldName: "playCurve",
                deprecated: false,
                pointerRules: NoPointers,
            }, "bipolar", "%", 0),
            24: Float32Field.create({
                parent: this,
                fieldKey: 24,
                fieldName: "cent",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: -50, max: 50, scaling: "linear" }, "ct", 0),
            25: Int32Field.create({
                parent: this,
                fieldKey: 25,
                fieldName: "chance",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 100 }, "", 100),
        };
    }
}
