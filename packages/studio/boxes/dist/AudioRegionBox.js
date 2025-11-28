import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, Int32Field, Float32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class AudioRegionBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new AudioRegionBox({
            uuid,
            graph,
            name: "AudioRegionBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.Editing],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "AudioRegionBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitAudioRegionBox, this);
    }
    get regions() {
        return this.getField(1);
    }
    get file() {
        return this.getField(2);
    }
    get playback() {
        return this.getField(3);
    }
    get timeBase() {
        return this.getField(4);
    }
    get events() {
        return this.getField(5);
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
    get mute() {
        return this.getField(14);
    }
    get label() {
        return this.getField(15);
    }
    get hue() {
        return this.getField(16);
    }
    get gain() {
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
                fieldName: "file",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioFile, true),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "playback",
                deprecated: false,
                pointerRules: NoPointers,
            }, "pitch"),
            4: StringField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "timeBase",
                deprecated: false,
                pointerRules: NoPointers,
            }, "musical"),
            5: PointerField.create({
                parent: this,
                fieldKey: 5,
                fieldName: "events",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.ValueEventCollection, true),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "position",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn"),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "duration",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "mixed"),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "loopOffset",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "mixed"),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "loopDuration",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "mixed"),
            14: BooleanField.create({
                parent: this,
                fieldKey: 14,
                fieldName: "mute",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            15: StringField.create({
                parent: this,
                fieldKey: 15,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            16: Int32Field.create({
                parent: this,
                fieldKey: 16,
                fieldName: "hue",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 360 }, "°"),
            17: Float32Field.create({
                parent: this,
                fieldKey: 17,
                fieldName: "gain",
                deprecated: false,
                pointerRules: NoPointers,
            }, "decibel", "db"),
        };
    }
}
