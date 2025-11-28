import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, BooleanField, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class AudioBusBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new AudioBusBox({
            uuid,
            graph,
            name: "AudioBusBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "AudioBusBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitAudioBusBox, this);
    }
    get collection() {
        return this.getField(1);
    }
    get output() {
        return this.getField(2);
    }
    get input() {
        return this.getField(3);
    }
    get enabled() {
        return this.getField(4);
    }
    get icon() {
        return this.getField(5);
    }
    get label() {
        return this.getField(6);
    }
    get color() {
        return this.getField(7);
    }
    get minimized() {
        return this.getField(8);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "collection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioBusses, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "output",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioOutput, true),
            3: Field.hook({
                parent: this,
                fieldKey: 3,
                fieldName: "input",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioOutput],
                    mandatory: false,
                },
            }),
            4: BooleanField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            5: StringField.create({
                parent: this,
                fieldKey: 5,
                fieldName: "icon",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            6: StringField.create({
                parent: this,
                fieldKey: 6,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            7: StringField.create({
                parent: this,
                fieldKey: 7,
                fieldName: "color",
                deprecated: false,
                pointerRules: NoPointers,
            }, "red"),
            8: BooleanField.create({
                parent: this,
                fieldKey: 8,
                fieldName: "minimized",
                deprecated: false,
                pointerRules: NoPointers,
            }),
        };
    }
}
