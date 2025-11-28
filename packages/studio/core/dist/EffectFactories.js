import { UUID } from "@opendaw/lib-std";
import { ArpeggioDeviceBox, CompressorDeviceBox, CrusherDeviceBox, DattorroReverbDeviceBox, DelayDeviceBox, FoldDeviceBox, GrooveShuffleBox, ModularAudioInputBox, ModularAudioOutputBox, ModularBox, ModularDeviceBox, ModuleConnectionBox, PitchDeviceBox, RevampDeviceBox, ReverbDeviceBox, StereoToolDeviceBox, TidalDeviceBox, VelocityDeviceBox, ZeitgeistDeviceBox } from "@opendaw/studio-boxes";
import { IconSymbol } from "@opendaw/studio-enums";
import { EffectParameterDefaults } from "./EffectParameterDefaults";
export var EffectFactories;
(function (EffectFactories) {
    EffectFactories.Arpeggio = {
        defaultName: "Arpeggio",
        defaultIcon: IconSymbol.Stack,
        description: "Generates rhythmic note sequences from chords",
        separatorBefore: false,
        type: "midi",
        create: ({ boxGraph }, hostField, index) => ArpeggioDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Arpeggio");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Pitch = {
        defaultName: "Pitch",
        defaultIcon: IconSymbol.Note,
        description: "Shifts the pitch of incoming notes",
        separatorBefore: false,
        type: "midi",
        create: ({ boxGraph }, hostField, index) => PitchDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Pitch");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Velocity = {
        defaultName: "Velocity",
        defaultIcon: IconSymbol.Velocity,
        description: "Manipulates the velocity of incoming notes",
        manualPage: "manuals/devices/midi/velocity",
        separatorBefore: false,
        type: "midi",
        create: ({ boxGraph }, hostField, index) => VelocityDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Velocity");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Zeitgeist = {
        defaultName: "Zeitgeist",
        defaultIcon: IconSymbol.Zeitgeist,
        description: "Distorts space and time",
        separatorBefore: false,
        type: "midi",
        create: ({ boxGraph, rootBoxAdapter }, hostField, index) => {
            const useGlobal = false; // TODO First Zeitgeist should be true
            const shuffleBox = useGlobal
                ? rootBoxAdapter.groove.box
                : GrooveShuffleBox.create(boxGraph, UUID.generate(), box => {
                    box.label.setValue("Shuffle");
                    box.duration.setValue(480);
                });
            return ZeitgeistDeviceBox.create(boxGraph, UUID.generate(), box => {
                box.label.setValue("Zeitgeist");
                box.groove.refer(shuffleBox);
                box.index.setValue(index);
                box.host.refer(hostField);
            });
        }
    };
    EffectFactories.StereoTool = {
        defaultName: "Stereo Tool",
        defaultIcon: IconSymbol.Stereo,
        description: "Computes a stereo transformation matrix with volume, panning, phase inversion and stereo width.",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => StereoToolDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Stereo Tool");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Delay = {
        defaultName: "Delay",
        defaultIcon: IconSymbol.Time,
        description: "Echoes the input signal with time-based repeats",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => DelayDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Delay");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.DattorroReverb = {
        defaultName: "Dattorro Reverb",
        defaultIcon: IconSymbol.Dattorro,
        description: "Dense algorithmic reverb based on Dattorro's design, capable of infinite decay",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => DattorroReverbDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Dattorro Reverb");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Compressor = {
        defaultName: "Compressor",
        defaultIcon: IconSymbol.Compressor,
        description: "Reduces the dynamic range by attenuating signals above a threshold",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => CompressorDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Compressor");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Reverb = {
        defaultName: "Cheap Reverb",
        defaultIcon: IconSymbol.Cube,
        description: "Simulates space and depth with reflections",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => ReverbDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Reverb");
            box.preDelay.setInitValue(0.001);
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Crusher = {
        defaultName: "Crusher",
        defaultIcon: IconSymbol.Bug,
        description: "Degrates the audio signal",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => CrusherDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Crusher");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Fold = {
        defaultName: "Fold",
        defaultIcon: IconSymbol.Fold,
        description: "Folds the signal back into audio-range",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => FoldDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Fold");
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Tidal = {
        defaultName: "Tidal",
        defaultIcon: IconSymbol.Tidal,
        description: "Shape rhythm and space through volume and pan.",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => TidalDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue("Tidal");
            box.index.setValue(index);
            box.depth.setValue(0.75);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Revamp = {
        defaultName: "Revamp",
        defaultIcon: IconSymbol.EQ,
        description: "Shapes the frequency balance of the sound",
        separatorBefore: false,
        type: "audio",
        create: ({ boxGraph }, hostField, index) => RevampDeviceBox.create(boxGraph, UUID.generate(), box => {
            EffectParameterDefaults.defaultRevampDeviceBox(box);
            box.index.setValue(index);
            box.host.refer(hostField);
        })
    };
    EffectFactories.Modular = {
        defaultName: "🔇 Create New Modular Audio Effect (inaudible yet)",
        defaultIcon: IconSymbol.Box,
        description: "",
        separatorBefore: true,
        type: "audio",
        create: ({ boxGraph, rootBox, userEditingManager }, hostField, index) => {
            const moduleSetupBox = ModularBox.create(boxGraph, UUID.generate(), box => {
                box.collection.refer(rootBox.modularSetups);
                box.label.setValue("Modular");
            });
            const modularInput = ModularAudioInputBox.create(boxGraph, UUID.generate(), box => {
                box.attributes.collection.refer(moduleSetupBox.modules);
                box.attributes.label.setValue("Modular Input");
                box.attributes.x.setValue(-256);
                box.attributes.y.setValue(32);
            });
            const modularOutput = ModularAudioOutputBox.create(boxGraph, UUID.generate(), box => {
                box.attributes.collection.refer(moduleSetupBox.modules);
                box.attributes.label.setValue("Modular Output");
                box.attributes.x.setValue(256);
                box.attributes.y.setValue(32);
            });
            ModuleConnectionBox.create(boxGraph, UUID.generate(), box => {
                box.collection.refer(moduleSetupBox.connections);
                box.source.refer(modularInput.output);
                box.target.refer(modularOutput.input);
            });
            userEditingManager.modularSystem.edit(moduleSetupBox.editing);
            return ModularDeviceBox.create(boxGraph, UUID.generate(), box => {
                box.label.setValue("Modular");
                box.modularSetup.refer(moduleSetupBox.device);
                box.index.setValue(index);
                box.host.refer(hostField);
            });
        }
    };
    EffectFactories.MidiNamed = { Arpeggio: EffectFactories.Arpeggio, Pitch: EffectFactories.Pitch, Velocity: EffectFactories.Velocity, Zeitgeist: EffectFactories.Zeitgeist };
    EffectFactories.AudioNamed = {
        StereoTool: EffectFactories.StereoTool, Compressor: EffectFactories.Compressor, Delay: EffectFactories.Delay, Reverb: EffectFactories.Reverb, DattorroReverb: EffectFactories.DattorroReverb, Revamp: EffectFactories.Revamp, Crusher: EffectFactories.Crusher, Fold: EffectFactories.Fold, Tidal: EffectFactories.Tidal, Modular: EffectFactories.Modular
    };
    EffectFactories.MidiList = Object.values(EffectFactories.MidiNamed);
    EffectFactories.AudioList = Object.values(EffectFactories.AudioNamed);
    EffectFactories.MergedNamed = { ...EffectFactories.MidiNamed, ...EffectFactories.AudioNamed };
})(EffectFactories || (EffectFactories = {}));
