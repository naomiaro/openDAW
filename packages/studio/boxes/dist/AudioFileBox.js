import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, Float32Field, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class AudioFileBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new AudioFileBox({
            uuid,
            graph,
            name: "AudioFileBox",
            pointerRules: {
                accepts: [Pointers.AudioFile, Pointers.FileUploadState],
                mandatory: true,
            },
        }), constructor);
    }
    static ClassName = "AudioFileBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitAudioFileBox, this);
    }
    get startInSeconds() {
        return this.getField(1);
    }
    get endInSeconds() {
        return this.getField(2);
    }
    get fileName() {
        return this.getField(3);
    }
    initializeFields() {
        return {
            1: Float32Field.create({
                parent: this,
                fieldKey: 1,
                fieldName: "startInSeconds",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", "s"),
            2: Float32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "endInSeconds",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", "s"),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "fileName",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
