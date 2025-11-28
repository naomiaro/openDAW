import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, StringField, Float32Field, Int32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class GrooveShuffleBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new GrooveShuffleBox({
            uuid,
            graph,
            name: "GrooveShuffleBox",
            pointerRules: { accepts: [Pointers.Groove], mandatory: true },
        }), constructor);
    }
    static ClassName = "GrooveShuffleBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitGrooveShuffleBox, this);
    }
    get label() {
        return this.getField(1);
    }
    get amount() {
        return this.getField(10);
    }
    get duration() {
        return this.getField(11);
    }
    initializeFields() {
        return {
            1: StringField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "amount",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0.6),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "duration",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "non-negative", "ppqn", 480),
        };
    }
}
