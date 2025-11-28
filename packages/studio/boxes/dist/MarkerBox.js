import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class MarkerBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new MarkerBox({
            uuid,
            graph,
            name: "MarkerBox",
            pointerRules: { accepts: [Pointers.Selection], mandatory: false },
        }), constructor);
    }
    static ClassName = "MarkerBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitMarkerBox, this);
    }
    get track() {
        return this.getField(1);
    }
    get position() {
        return this.getField(2);
    }
    get plays() {
        return this.getField(3);
    }
    get label() {
        return this.getField(4);
    }
    get hue() {
        return this.getField(5);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "track",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.MarkerTrack, true),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "position",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", "ppqn"),
            3: Int32Field.create({
                parent: this,
                fieldKey: 3,
                fieldName: "plays",
                deprecated: false,
                pointerRules: NoPointers,
            }, "non-negative", "", 1),
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
                fieldName: "hue",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 360 }, "°"),
        };
    }
}
