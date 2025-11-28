import { AudioFileBox, MIDIOutputDeviceBox, NanoDeviceBox, PlayfieldDeviceBox, PlayfieldSampleBox, SoundfontDeviceBox, SoundfontFileBox, TapeDeviceBox, VaporisateurDeviceBox } from "@opendaw/studio-boxes";
import { isDefined, UUID } from "@opendaw/lib-std";
import { ClassicWaveform } from "@opendaw/lib-dsp";
import { IconSymbol, VoicingMode } from "@opendaw/studio-enums";
import { TrackType } from "../timeline/TrackType";
export var InstrumentFactories;
(function (InstrumentFactories) {
    InstrumentFactories.Tape = {
        defaultName: "Tape",
        defaultIcon: IconSymbol.Tape,
        description: "Plays audio regions & clips",
        trackType: TrackType.Audio,
        create: (boxGraph, host, name, icon, _attachment) => TapeDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue(name);
            box.icon.setValue(IconSymbol.toName(icon));
            box.flutter.setValue(0.2);
            box.wow.setValue(0.05);
            box.noise.setValue(0.02);
            box.saturation.setValue(0.5);
            box.host.refer(host);
        })
    };
    InstrumentFactories.Nano = {
        defaultName: "Nano",
        defaultIcon: IconSymbol.NanoWave,
        description: "Simple sampler",
        trackType: TrackType.Notes,
        create: (boxGraph, host, name, icon, attachment) => {
            let audioFileBox;
            if (isDefined(attachment)) {
                audioFileBox = attachment;
            }
            else {
                const fileUUID = UUID.parse("c1678daa-4a47-4cba-b88f-4f4e384663c3");
                const fileDuration = 5.340;
                audioFileBox = boxGraph.findBox(fileUUID)
                    .unwrapOrElse(() => AudioFileBox.create(boxGraph, fileUUID, box => {
                    box.fileName.setValue("Rhode");
                    box.endInSeconds.setValue(fileDuration);
                }));
            }
            return NanoDeviceBox.create(boxGraph, UUID.generate(), box => {
                box.label.setValue(name);
                box.icon.setValue(IconSymbol.toName(icon));
                box.file.refer(audioFileBox);
                box.host.refer(host);
            });
        }
    };
    InstrumentFactories.Playfield = {
        defaultName: "Playfield",
        defaultIcon: IconSymbol.Playfield,
        description: "Drum computer",
        trackType: TrackType.Notes,
        create: (boxGraph, host, name, icon, attachment) => {
            const deviceBox = PlayfieldDeviceBox.create(boxGraph, UUID.generate(), box => {
                box.label.setValue(name);
                box.icon.setValue(IconSymbol.toName(icon));
                box.host.refer(host);
            });
            if (isDefined(attachment)) {
                attachment.filter(({ note, uuid, name, durationInSeconds, exclude }) => {
                    const fileBox = useAudioFile(boxGraph, uuid, name, durationInSeconds);
                    PlayfieldSampleBox.create(boxGraph, UUID.generate(), box => {
                        box.device.refer(deviceBox.samples);
                        box.file.refer(fileBox);
                        box.index.setValue(note);
                        box.exclude.setValue(exclude);
                    });
                });
            }
            return deviceBox;
        }
    };
    InstrumentFactories.Vaporisateur = {
        defaultName: "Vaporisateur",
        defaultIcon: IconSymbol.Piano,
        description: "Classic subtractive synthesizer",
        trackType: TrackType.Notes,
        create: (boxGraph, host, name, icon, _attachment) => VaporisateurDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue(name);
            box.icon.setValue(IconSymbol.toName(icon));
            box.tune.setInitValue(0.0);
            box.cutoff.setInitValue(8000.0);
            box.resonance.setInitValue(0.1);
            box.attack.setInitValue(0.005);
            box.decay.setInitValue(0.100);
            box.sustain.setInitValue(0.5);
            box.release.setInitValue(0.5);
            box.voicingMode.setInitValue(VoicingMode.Polyphonic);
            box.lfo.rate.setInitValue(1.0);
            box.oscillators.fields()[0].waveform.setInitValue(ClassicWaveform.saw);
            box.oscillators.fields()[0].volume.setInitValue(-6.0);
            box.oscillators.fields()[1].volume.setInitValue(Number.NEGATIVE_INFINITY);
            box.oscillators.fields()[1].waveform.setInitValue(ClassicWaveform.square);
            box.host.refer(host);
            box.version.setValue(2); // for removing the -15db in voice and extended osc
        })
    };
    InstrumentFactories.MIDIOutput = {
        defaultName: "MIDIOutput",
        defaultIcon: IconSymbol.Midi,
        description: "MIDI Output",
        trackType: TrackType.Notes,
        create: (boxGraph, host, name, icon, _attachment) => MIDIOutputDeviceBox.create(boxGraph, UUID.generate(), box => {
            box.label.setValue(name);
            box.icon.setValue(IconSymbol.toName(icon));
            box.host.refer(host);
        })
    };
    InstrumentFactories.Soundfont = {
        defaultName: "Soundfont",
        defaultIcon: IconSymbol.SoundFont,
        description: "Soundfont Player",
        trackType: TrackType.Notes,
        create: (boxGraph, host, name, icon, attachment) => {
            attachment ?? (attachment = { uuid: "d9f51577-2096-4671-9067-27ca2e12b329", name: "Upright Piano KW" });
            const soundFontUUIDAsString = attachment.uuid;
            const soundfontUUID = UUID.parse(soundFontUUIDAsString);
            const soundfontBox = useSoundfontFile(boxGraph, soundfontUUID, attachment.name);
            return SoundfontDeviceBox.create(boxGraph, UUID.generate(), box => {
                box.label.setValue(name);
                box.icon.setValue(IconSymbol.toName(icon));
                box.host.refer(host);
                box.file.refer(soundfontBox);
            });
        }
    };
    InstrumentFactories.Named = { Vaporisateur: InstrumentFactories.Vaporisateur, Playfield: InstrumentFactories.Playfield, Nano: InstrumentFactories.Nano, Tape: InstrumentFactories.Tape, Soundfont: InstrumentFactories.Soundfont, MIDIOutput: InstrumentFactories.MIDIOutput };
    const useAudioFile = (boxGraph, fileUUID, name, duration) => boxGraph.findBox(fileUUID)
        .unwrapOrElse(() => AudioFileBox.create(boxGraph, fileUUID, box => {
        box.fileName.setValue(name);
        box.endInSeconds.setValue(duration);
    }));
    const useSoundfontFile = (boxGraph, fileUUID, name) => boxGraph.findBox(fileUUID)
        .unwrapOrElse(() => SoundfontFileBox.create(boxGraph, fileUUID, box => box.fileName.setValue(name)));
})(InstrumentFactories || (InstrumentFactories = {}));
