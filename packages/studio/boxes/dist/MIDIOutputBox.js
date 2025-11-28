import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, StringField, Int32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class MIDIOutputBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new MIDIOutputBox({
            uuid,
            graph,
            name: "MIDIOutputBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "MIDIOutputBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitMIDIOutputBox, this);
    }
    get root() {
        return this.getField(1);
    }
    get device() {
        return this.getField(2);
    }
    get id() {
        return this.getField(3);
    }
    get label() {
        return this.getField(4);
    }
    get delayInMs() {
        return this.getField(5);
    }
    get sendTransportMessages() {
        return this.getField(6);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "root",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.MIDIDevice, true),
            2: Field.hook({
                parent: this,
                fieldKey: 2,
                fieldName: "device",
                deprecated: false,
                pointerRules: { accepts: [Pointers.MIDIDevice], mandatory: true },
            }),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "id",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            4: StringField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            5: Int32Field.create({
                parent: this,
                fieldKey: 5,
                fieldName: "delayInMs",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 500 }, "ms", 10),
            6: BooleanField.create({
                parent: this,
                fieldKey: 6,
                fieldName: "sendTransportMessages",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
        };
    }
}
