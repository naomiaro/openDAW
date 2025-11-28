import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, BooleanField, StringField, } from "@opendaw/lib-box";
import { ClipPlaybackFields } from "./ClipPlaybackFields";
import { Pointers } from "@opendaw/studio-enums";
export class NoteClipBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new NoteClipBox({
            uuid,
            graph,
            name: "NoteClipBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.Editing],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "NoteClipBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitNoteClipBox, this);
    }
    get clips() {
        return this.getField(1);
    }
    get events() {
        return this.getField(2);
    }
    get index() {
        return this.getField(3);
    }
    get playback() {
        return this.getField(4);
    }
    get duration() {
        return this.getField(10);
    }
    get mute() {
        return this.getField(11);
    }
    get label() {
        return this.getField(12);
    }
    get hue() {
        return this.getField(13);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "clips",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ClipCollection, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "events",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.NoteEventCollection, true),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            4: ClipPlaybackFields.create({
                parent: this,
                fieldKey: 4,
                fieldName: "playback",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "duration",
                deprecated: false,
                pointerRules: NoPointers,
            }, "positive", "ppqn"),
            11: BooleanField.create({
                parent: this,
                fieldKey: 11,
                fieldName: "mute",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            12: StringField.create({
                parent: this,
                fieldKey: 12,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            13: Int32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "hue",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 360 }, "°"),
        };
    }
}
