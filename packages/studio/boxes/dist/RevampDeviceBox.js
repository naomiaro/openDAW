import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { RevampPass } from "./RevampPass";
import { RevampShelf } from "./RevampShelf";
import { RevampBell } from "./RevampBell";
import { Pointers } from "@opendaw/studio-enums";
export class RevampDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new RevampDeviceBox({
            uuid,
            graph,
            name: "RevampDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "RevampDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitRevampDeviceBox, this);
    }
    get host() {
        return this.getField(1);
    }
    get index() {
        return this.getField(2);
    }
    get label() {
        return this.getField(3);
    }
    get enabled() {
        return this.getField(4);
    }
    get minimized() {
        return this.getField(5);
    }
    get highPass() {
        return this.getField(10);
    }
    get lowShelf() {
        return this.getField(11);
    }
    get lowBell() {
        return this.getField(12);
    }
    get midBell() {
        return this.getField(13);
    }
    get highBell() {
        return this.getField(14);
    }
    get highShelf() {
        return this.getField(15);
    }
    get lowPass() {
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
                fieldName: "host",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioEffectHost, true),
            2: Int32Field.create({
                parent: this,
                fieldKey: 2,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "label",
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
            10: RevampPass.create({
                parent: this,
                fieldKey: 10,
                fieldName: "highPass",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            11: RevampShelf.create({
                parent: this,
                fieldKey: 11,
                fieldName: "lowShelf",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            12: RevampBell.create({
                parent: this,
                fieldKey: 12,
                fieldName: "lowBell",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            13: RevampBell.create({
                parent: this,
                fieldKey: 13,
                fieldName: "midBell",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            14: RevampBell.create({
                parent: this,
                fieldKey: 14,
                fieldName: "highBell",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            15: RevampShelf.create({
                parent: this,
                fieldKey: 15,
                fieldName: "highShelf",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            16: RevampPass.create({
                parent: this,
                fieldKey: 16,
                fieldName: "lowPass",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            17: Float32Field.create({
                parent: this,
                fieldKey: 17,
                fieldName: "gain",
                deprecated: true,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -18, max: 18, scaling: "linear" }, "db"),
        };
    }
}
