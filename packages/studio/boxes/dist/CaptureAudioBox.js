import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, StringField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class CaptureAudioBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new CaptureAudioBox({
            uuid,
            graph,
            name: "CaptureAudioBox",
            pointerRules: { accepts: [Pointers.Capture], mandatory: true },
        }), constructor);
    }
    static ClassName = "CaptureAudioBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitCaptureAudioBox, this);
    }
    get deviceId() {
        return this.getField(1);
    }
    get recordMode() {
        return this.getField(2);
    }
    get requestChannels() {
        return this.getField(10);
    }
    get gainDb() {
        return this.getField(11);
    }
    initializeFields() {
        return {
            1: StringField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "deviceId",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "recordMode",
                deprecated: false,
                pointerRules: NoPointers,
            }, "normal"),
            10: Int32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "requestChannels",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "", 1),
            11: Float32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "gainDb",
                deprecated: false,
                pointerRules: NoPointers,
            }, "decibel", "dB", 0),
        };
    }
}
