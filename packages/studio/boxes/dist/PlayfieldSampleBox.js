import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, Field, Int32Field, StringField, BooleanField, Float32Field, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class PlayfieldSampleBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new PlayfieldSampleBox({
            uuid,
            graph,
            name: "PlayfieldSampleBox",
            pointerRules: { accepts: [Pointers.Editing], mandatory: false },
        }), constructor);
    }
    static ClassName = "PlayfieldSampleBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitPlayfieldSampleBox, this);
    }
    get device() {
        return this.getField(10);
    }
    get file() {
        return this.getField(11);
    }
    get midiEffects() {
        return this.getField(12);
    }
    get audioEffects() {
        return this.getField(13);
    }
    get index() {
        return this.getField(15);
    }
    get label() {
        return this.getField(20);
    }
    get icon() {
        return this.getField(21);
    }
    get enabled() {
        return this.getField(22);
    }
    get minimized() {
        return this.getField(23);
    }
    get mute() {
        return this.getField(40);
    }
    get solo() {
        return this.getField(41);
    }
    get exclude() {
        return this.getField(42);
    }
    get polyphone() {
        return this.getField(43);
    }
    get gate() {
        return this.getField(44);
    }
    get pitch() {
        return this.getField(45);
    }
    get sampleStart() {
        return this.getField(46);
    }
    get sampleEnd() {
        return this.getField(47);
    }
    get attack() {
        return this.getField(48);
    }
    get release() {
        return this.getField(49);
    }
    initializeFields() {
        return {
            10: PointerField.create({
                parent: this,
                fieldKey: 10,
                fieldName: "device",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Sample, true),
            11: PointerField.create({
                parent: this,
                fieldKey: 11,
                fieldName: "file",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioFile, true),
            12: Field.hook({
                parent: this,
                fieldKey: 12,
                fieldName: "midiEffects",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.MidiEffectHost],
                    mandatory: false,
                },
            }),
            13: Field.hook({
                parent: this,
                fieldKey: 13,
                fieldName: "audioEffects",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioEffectHost],
                    mandatory: false,
                },
            }),
            15: Int32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, { min: 0, max: 127 }, "", 60),
            20: StringField.create({
                parent: this,
                fieldKey: 20,
                fieldName: "label",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            21: StringField.create({
                parent: this,
                fieldKey: 21,
                fieldName: "icon",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            22: BooleanField.create({
                parent: this,
                fieldKey: 22,
                fieldName: "enabled",
                deprecated: false,
                pointerRules: NoPointers,
            }, true),
            23: BooleanField.create({
                parent: this,
                fieldKey: 23,
                fieldName: "minimized",
                deprecated: false,
                pointerRules: NoPointers,
            }, false),
            40: BooleanField.create({
                parent: this,
                fieldKey: 40,
                fieldName: "mute",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            41: BooleanField.create({
                parent: this,
                fieldKey: 41,
                fieldName: "solo",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            42: BooleanField.create({
                parent: this,
                fieldKey: 42,
                fieldName: "exclude",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            43: BooleanField.create({
                parent: this,
                fieldKey: 43,
                fieldName: "polyphone",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            44: Int32Field.create({
                parent: this,
                fieldKey: 44,
                fieldName: "gate",
                deprecated: false,
                pointerRules: NoPointers,
            }, { length: 3 }, "", 0),
            45: Float32Field.create({
                parent: this,
                fieldKey: 45,
                fieldName: "pitch",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -1200, max: 1200, scaling: "linear" }, "ct"),
            46: Float32Field.create({
                parent: this,
                fieldKey: 46,
                fieldName: "sampleStart",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 0),
            47: Float32Field.create({
                parent: this,
                fieldKey: 47,
                fieldName: "sampleEnd",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "unipolar", "%", 1),
            48: Float32Field.create({
                parent: this,
                fieldKey: 48,
                fieldName: "attack",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s", 0.001),
            49: Float32Field.create({
                parent: this,
                fieldKey: 49,
                fieldName: "release",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s", 0.02),
        };
    }
}
