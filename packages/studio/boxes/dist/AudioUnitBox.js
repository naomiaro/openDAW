import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, StringField, PointerField, Field, Int32Field, Float32Field, BooleanField, } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
export class AudioUnitBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new AudioUnitBox({
            uuid,
            graph,
            name: "AudioUnitBox",
            pointerRules: {
                accepts: [Pointers.Selection, Pointers.Automation],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "AudioUnitBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitAudioUnitBox, this);
    }
    get type() {
        return this.getField(1);
    }
    get collection() {
        return this.getField(2);
    }
    get editing() {
        return this.getField(3);
    }
    get index() {
        return this.getField(11);
    }
    get volume() {
        return this.getField(12);
    }
    get panning() {
        return this.getField(13);
    }
    get mute() {
        return this.getField(14);
    }
    get solo() {
        return this.getField(15);
    }
    get tracks() {
        return this.getField(20);
    }
    get midiEffects() {
        return this.getField(21);
    }
    get input() {
        return this.getField(22);
    }
    get audioEffects() {
        return this.getField(23);
    }
    get auxSends() {
        return this.getField(24);
    }
    get output() {
        return this.getField(25);
    }
    get capture() {
        return this.getField(26);
    }
    initializeFields() {
        return {
            1: StringField.create({
                parent: this,
                fieldKey: 1,
                fieldName: "type",
                deprecated: false,
                pointerRules: NoPointers,
            }, "instrument"),
            2: PointerField.create({
                parent: this,
                fieldKey: 2,
                fieldName: "collection",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioUnits, true),
            3: Field.hook({
                parent: this,
                fieldKey: 3,
                fieldName: "editing",
                deprecated: false,
                pointerRules: { accepts: [Pointers.Editing], mandatory: false },
            }),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "index",
                deprecated: false,
                pointerRules: NoPointers,
            }, "index", ""),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "volume",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: -96, mid: -9, max: 6, scaling: "decibel" }, "dB"),
            13: Float32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "panning",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "bipolar", "%"),
            14: BooleanField.create({
                parent: this,
                fieldKey: 14,
                fieldName: "mute",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }),
            15: BooleanField.create({
                parent: this,
                fieldKey: 15,
                fieldName: "solo",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }),
            20: Field.hook({
                parent: this,
                fieldKey: 20,
                fieldName: "tracks",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.TrackCollection],
                    mandatory: false,
                },
            }),
            21: Field.hook({
                parent: this,
                fieldKey: 21,
                fieldName: "midiEffects",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.MidiEffectHost],
                    mandatory: false,
                },
            }),
            22: Field.hook({
                parent: this,
                fieldKey: 22,
                fieldName: "input",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.InstrumentHost, Pointers.AudioOutput],
                    mandatory: false,
                },
            }),
            23: Field.hook({
                parent: this,
                fieldKey: 23,
                fieldName: "audioEffects",
                deprecated: false,
                pointerRules: {
                    accepts: [Pointers.AudioEffectHost],
                    mandatory: false,
                },
            }),
            24: Field.hook({
                parent: this,
                fieldKey: 24,
                fieldName: "auxSends",
                deprecated: false,
                pointerRules: { accepts: [Pointers.AuxSend], mandatory: false },
            }),
            25: PointerField.create({
                parent: this,
                fieldKey: 25,
                fieldName: "output",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.AudioOutput, false),
            26: PointerField.create({
                parent: this,
                fieldKey: 26,
                fieldName: "capture",
                deprecated: false,
                pointerRules: NoPointers,
            }, Pointers.Capture, false),
        };
    }
}
