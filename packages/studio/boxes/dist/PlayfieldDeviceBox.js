import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, BooleanField, Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class PlayfieldDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new PlayfieldDeviceBox({
            uuid,
            graph,
            name: "PlayfieldDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "PlayfieldDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitPlayfieldDeviceBox, this);
    }
    get host() {
        return this.getField(1);
    }
    get label() {
        return this.getField(2);
    }
    get icon() {
        return this.getField(3);
    }
    get enabled() {
        return this.getField(4);
    }
    get minimized() {
        return this.getField(5);
    }
    get samples() {
        return this.getField(10);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "host",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.InstrumentHost, true),
            2: StringField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "icon",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            4: BooleanField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            5: BooleanField.create({
                parent: this,
                fieldKey: 5,
                fieldName: "minimized",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
            10: Field.hook({
                parent: this,
                fieldKey: 10,
                fieldName: "samples",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Sample], mandatory: false },
            }),
        };
    }
}
