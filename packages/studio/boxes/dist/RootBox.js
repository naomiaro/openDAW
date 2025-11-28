import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, StringField, } from "@opendaw/lib-box";
import { PianoMode } from "./PianoMode";
import { Pointers } from "@opendaw/studio-enums";
export class RootBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new RootBox({
            uuid,
            graph,
            name: "RootBox",
            pointerRules: NoPointers,
        }), constructor);
    }
    static ClassName = "RootBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitRootBox, this);
    }
    get timeline() {
        return this.getField(1);
    }
    get users() {
        return this.getField(2);
    }
    get created() {
        return this.getField(3);
    }
    get groove() {
        return this.getField(4);
    }
    get modularSetups() {
        return this.getField(10);
    }
    get audioUnits() {
        return this.getField(20);
    }
    get audioBusses() {
        return this.getField(21);
    }
    get outputDevice() {
        return this.getField(30);
    }
    get outputMidiDevices() {
        return this.getField(35);
    }
    get pianoMode() {
        return this.getField(40);
    }
    get editingChannel() {
        return this.getField(111);
    }
    initializeFields() {
        return {
            1: PointerField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "timeline",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Timeline, true),
            2: Field.hook({
                parent: this,
                fieldKey: 2,
                fieldName: "users",
                deprecated: false,
                pointerRules: { accepts: [Pointers.User], mandatory: true },
            }),
            3: StringField.create({
                parent: this,
                fieldKey: 3,
                fieldName: "created",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            4: PointerField.create({
                parent: this,
                fieldKey: 4,
                fieldName: "groove",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Groove, true),
            10: Field.hook({
                parent: this,
                fieldKey: 10,
                fieldName: "modularSetups",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.ModularSetup],
                    mandatory: false,
                },
            }),
            20: Field.hook({
                parent: this,
                fieldKey: 20,
                fieldName: "audioUnits",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioUnits],
                    mandatory: false,
                },
            }),
            21: Field.hook({
                parent: this,
                fieldKey: 21,
                fieldName: "audioBusses",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioBusses],
                    mandatory: false,
                },
            }),
            30: Field.hook({
                parent: this,
                fieldKey: 30,
                fieldName: "outputDevice",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioOutput],
                    mandatory: true,
                },
            }),
            35: Field.hook({
                parent: this,
                fieldKey: 35,
                fieldName: "outputMidiDevices",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.MIDIDevice],
                    mandatory: false,
                },
            }),
            40: PianoMode.create({
                parent: this,
                fieldKey: 40,
                fieldName: "pianoMode",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            111: PointerField.create({
                parent: this,
                fieldKey: 111,
                fieldName: "editingChannel",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Editing, false),
        };
    }
}
