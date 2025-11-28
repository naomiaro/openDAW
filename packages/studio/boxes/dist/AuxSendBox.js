import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class AuxSendBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new AuxSendBox({
            uuid,
            graph,
            name: "AuxSendBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "AuxSendBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitAuxSendBox, this);
    }
    get audioUnit() {
        return this.getField(1);
    }
    get targetBus() {
        return this.getField(2);
    }
    get index() {
        return this.getField(3);
    }
    get routing() {
        return this.getField(4);
    }
    get sendGain() {
        return this.getField(5);
    }
    get sendPan() {
        return this.getField(6);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "audioUnit",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AuxSend, true),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "targetBus",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioOutput, true),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            4: Int32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "routing",
                deprecated: false,
                pointerRules: NoPointers,
            }, { values: [0, 1] }, "", 1),
            5: Float32Field.create({
                parent: this,
                fieldKey: 5,
                fieldName: "sendGain",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "decibel", "dB"),
            6: Float32Field.create({
                parent: this,
                fieldKey: 6,
                fieldName: "sendPan",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", ""),
        };
    }
}
