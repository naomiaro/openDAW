import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, BooleanField, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class NoteRegionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NoteRegionBox({
            uuid,
            graph,
            name: "NoteRegionBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.Editing],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "NoteRegionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNoteRegionBox, this);
    }
    get regions() {
        return this.getField(1);
    }
    get events() {
        return this.getField(2);
    }
    get position() {
        return this.getField(10);
    }
    get duration() {
        return this.getField(11);
    }
    get loopOffset() {
        return this.getField(12);
    }
    get loopDuration() {
        return this.getField(13);
    }
    get eventOffset() {
        return this.getField(14);
    }
    get mute() {
        return this.getField(15);
    }
    get label() {
        return this.getField(16);
    }
    get hue() {
        return this.getField(17);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "regions",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.RegionCollection, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "events",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.NoteEventCollection, true),
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
            }, "positive", "ppqn"),
            12: Int32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "loopOffset",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn"),
            13: Int32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "loopDuration",
                deprecated: false,
                pointerRules: NoPointers,
            }, "positive", "ppqn"),
            14: Int32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "eventOffset",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn"),
            15: BooleanField.create({
                parent: this,
                fieldKey: 15,
                fieldName: "mute",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            16: StringField.create({
                parent: this,
                fieldKey: 16,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            17: Int32Field.create({
                parent: this,
                fieldKey: 17,
                fieldName: "hue",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 360 }, "°"),
        };
    }
}
