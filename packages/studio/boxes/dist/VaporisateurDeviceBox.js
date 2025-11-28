import { safeExecute } from "@opendaw/lib-std";
import { Box, NoPointers, PointerField, StringField, BooleanField, Float32Field, Int32Field, ArrayField, } from "@opendaw/lib-box";
import { VaporisateurOsc } from "./VaporisateurOsc";
import { VaporisateurLFO } from "./VaporisateurLFO";
import { VaporisateurNoise } from "./VaporisateurNoise";
import { Pointers } from "@opendaw/studio-enums";
export class VaporisateurDeviceBox extends Box {
    static create(graph, uuid, constructor) {
        return graph.stageBox(new VaporisateurDeviceBox({
            uuid,
            graph,
            name: "VaporisateurDeviceBox",
            pointerRules: {
                accepts: [Pointers.Device, Pointers.Selection],
                mandatory: false,
            },
        }), constructor);
    }
    static ClassName = "VaporisateurDeviceBox";
    constructor(construct) {
        super(construct);
    }
    accept(visitor) {
        return safeExecute(visitor.visitVaporisateurDeviceBox, this);
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
    get volume() {
        return this.getField(10);
    }
    get octave() {
        return this.getField(11);
    }
    get tune() {
        return this.getField(12);
    }
    get waveform() {
        return this.getField(13);
    }
    get cutoff() {
        return this.getField(14);
    }
    get resonance() {
        return this.getField(15);
    }
    get attack() {
        return this.getField(16);
    }
    get release() {
        return this.getField(17);
    }
    get filterEnvelope() {
        return this.getField(18);
    }
    get decay() {
        return this.getField(19);
    }
    get sustain() {
        return this.getField(20);
    }
    get glideTime() {
        return this.getField(21);
    }
    get voicingMode() {
        return this.getField(22);
    }
    get unisonCount() {
        return this.getField(23);
    }
    get unisonDetune() {
        return this.getField(24);
    }
    get unisonStereo() {
        return this.getField(25);
    }
    get filterOrder() {
        return this.getField(26);
    }
    get filterKeyboard() {
        return this.getField(27);
    }
    get lfo() {
        return this.getField(30);
    }
    get oscillators() {
        return this.getField(40);
    }
    get noise() {
        return this.getField(50);
    }
    get version() {
        return this.getField(99);
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
            10: Float32Field.create({
                parent: this,
                fieldKey: 10,
                fieldName: "volume",
                deprecated: true,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "decibel", "dB", -6),
            11: Int32Field.create({
                parent: this,
                fieldKey: 11,
                fieldName: "octave",
                deprecated: true,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "any", "oct"),
            12: Float32Field.create({
                parent: this,
                fieldKey: 12,
                fieldName: "tune",
                deprecated: true,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "any", "ct"),
            13: Int32Field.create({
                parent: this,
                fieldKey: 13,
                fieldName: "waveform",
                deprecated: true,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, "any", ""),
            14: Float32Field.create({
                parent: this,
                fieldKey: 14,
                fieldName: "cutoff",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 20, max: 20000, scaling: "exponential" }, "Hz"),
            15: Float32Field.create({
                parent: this,
                fieldKey: 15,
                fieldName: "resonance",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 0.01, max: 10, scaling: "exponential" }, "q"),
            16: Float32Field.create({
                parent: this,
                fieldKey: 16,
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
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s"),
            17: Float32Field.create({
                parent: this,
                fieldKey: 17,
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
            }, { min: 0.001, max: 5, scaling: "exponential" }, "s"),
            18: Float32Field.create({
                parent: this,
                fieldKey: 18,
                fieldName: "filterEnvelope",
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
            19: Float32Field.create({
                parent: this,
                fieldKey: 19,
                fieldName: "decay",
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
            20: Float32Field.create({
                parent: this,
                fieldKey: 20,
                fieldName: "sustain",
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
            21: Float32Field.create({
                parent: this,
                fieldKey: 21,
                fieldName: "glideTime",
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
            22: Int32Field.create({
                parent: this,
                fieldKey: 22,
                fieldName: "voicingMode",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { values: [0, 1] }, "", 1),
            23: Int32Field.create({
                parent: this,
                fieldKey: 23,
                fieldName: "unisonCount",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { values: [1, 3, 5] }, "", 1),
            24: Float32Field.create({
                parent: this,
                fieldKey: 24,
                fieldName: "unisonDetune",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { min: 1, max: 1200, scaling: "exponential" }, "ct", 30),
            25: Float32Field.create({
                parent: this,
                fieldKey: 25,
                fieldName: "unisonStereo",
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
            26: Int32Field.create({
                parent: this,
                fieldKey: 26,
                fieldName: "filterOrder",
                deprecated: false,
                pointerRules: {
                    accepts: [
                        Pointers.Modulation,
                        Pointers.Automation,
                        Pointers.MidiControl,
                    ],
                    mandatory: false,
                },
            }, { values: [1, 2, 3, 4] }, "", 1),
            27: Float32Field.create({
                parent: this,
                fieldKey: 27,
                fieldName: "filterKeyboard",
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
            30: VaporisateurLFO.create({
                parent: this,
                fieldKey: 30,
                fieldName: "lfo",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            40: ArrayField.create({
                parent: this,
                fieldKey: 40,
                fieldName: "oscillators",
                deprecated: false,
                pointerRules: NoPointers,
            }, (construct) => VaporisateurOsc.create(construct), 2),
            50: VaporisateurNoise.create({
                parent: this,
                fieldKey: 50,
                fieldName: "noise",
                deprecated: false,
                pointerRules: NoPointers,
            }),
            99: Int32Field.create({
                parent: this,
                fieldKey: 99,
                fieldName: "version",
                deprecated: false,
                pointerRules: NoPointers,
            }, "any", ""),
        };
    }
}
