import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, Int32Field, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class MIDIOutputParameterBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new MIDIOutputParameterBox({
            uuid,
            graph,
            name: "MIDIOutputParameterBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "MIDIOutputParameterBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitMIDIOutputParameterBox, this);
    }
    get owner() {
        return this.getField(1);
    }
    get label() {
        return this.getField(2);
    }
    get controller() {
        return this.getField(3);
    }
    get value() {
        return this.getField(4);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "owner",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Parameter, true),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }, ""),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "controller",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 127 }, "#", 64),
            4: Float32Field.create({
                parent: this,
                fieldKey: 4,
                fieldName: "value",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: true,
                },
            }, "unipolar", "%"),
        };
    }
}
