import { asDefined, isDefined, isNotNull, UUID } from "@opendaw/lib-std";
import { AudioUnitType, IconSymbol } from "@opendaw/studio-enums";
import { AudioBusBox, AudioUnitBox, AuxSendBox, TrackBox } from "@opendaw/studio-boxes";
import { AudioUnitFactory, InstrumentFactories } from "@opendaw/studio-adapters";
import { MIDIEffectFactory } from "./MIDIEffectFactory";
import { AudioEffectFactory } from "./AudioEffectFactory";
import { NoteTrackWriter } from "./NoteTrackWriter";
import { ValueTrackWriter } from "./ValueTrackWriter";
import { AudioTrackWriter } from "./AudioTrackWriter";
import { AudioFileBoxfactory } from "./AudioFileBoxfactory";
export var AudioUnitBoxFactory;
(function (AudioUnitBoxFactory) {
    AudioUnitBoxFactory.create = (skeleton, project) => {
        const { boxGraph, mandatoryBoxes: { rootBox, primaryAudioBus, primaryAudioOutputUnit } } = skeleton;
        let audioUnitIndex = 0;
        const devices = new Map();
        const busMap = new Map([[project.output, primaryAudioBus]]);
        const audioUnitMap = new Map([[project.output, primaryAudioOutputUnit]]);
        const awaitedSends = [];
        const noteTrackWriter = new NoteTrackWriter();
        const valueTrackWriter = new ValueTrackWriter();
        const createSend = (sends, audioUnitBox) => {
            awaitedSends.push(...(sends.map((send, index) => [send, AuxSendBox.create(boxGraph, UUID.generate(), box => {
                    box.index.setValue(index);
                    box.audioUnit.refer(audioUnitBox.auxSends);
                    box.sendGain.setValue(send.amount);
                    box.sendPan.setValue(send.pan);
                    // TODO mode "pre" | "post"
                })])));
        };
        project.instrumentUnits.forEach((audioUnit) => {
            const { instrument, midiEffects, audioEffects, noteTracks, audioTracks, valueTracks, volume, panning, mute, solo, sends } = audioUnit;
            const factory = InstrumentFactories.Named[instrument.name];
            const capture = AudioUnitFactory.trackTypeToCapture(boxGraph, factory.trackType);
            const audioUnitBox = AudioUnitFactory.create(skeleton, AudioUnitType.Instrument, capture);
            devices.set(audioUnit, audioUnitBox);
            audioUnitBox.index.setValue(audioUnitIndex++);
            audioUnitBox.mute.setValue(mute);
            audioUnitBox.solo.setValue(solo);
            audioUnitBox.volume.setValue(volume);
            audioUnitBox.panning.setValue(panning);
            if (factory === InstrumentFactories.Nano) {
                const sample = instrument?.props?.sample;
                factory.create(boxGraph, audioUnitBox.input, factory.defaultName, factory.defaultIcon, isDefined(sample) ? AudioFileBoxfactory.create(boxGraph, sample) : undefined);
            }
            else {
                factory.create(boxGraph, audioUnitBox.input, factory.defaultName, factory.defaultIcon);
            }
            midiEffects.forEach((effect) => devices.set(effect, MIDIEffectFactory.write(boxGraph, audioUnitBox, effect)));
            audioEffects.forEach((effect) => devices.set(effect, AudioEffectFactory.write(boxGraph, audioUnitBox, effect)));
            const indexRef = { index: 0 };
            noteTrackWriter.write(boxGraph, audioUnitBox, noteTracks, indexRef);
            valueTrackWriter.write(boxGraph, devices, audioUnitBox, valueTracks, indexRef);
            AudioTrackWriter.write(boxGraph, audioUnitBox, audioTracks, indexRef);
            if (indexRef.index === 0) { // create a default track if none existed
                TrackBox.create(boxGraph, UUID.generate(), box => {
                    box.type.setValue(factory.trackType);
                    box.index.setValue(0);
                    box.target.refer(audioUnitBox);
                    box.tracks.refer(audioUnitBox.tracks);
                });
            }
            createSend(sends, audioUnitBox);
            audioUnitMap.set(audioUnit, audioUnitBox);
        });
        const convertBusUnits = (audioUnit, type, icon, color) => {
            const audioBusBox = AudioBusBox.create(boxGraph, UUID.generate(), box => {
                box.collection.refer(rootBox.audioBusses);
                box.label.setValue(audioUnit.label);
                box.icon.setValue(IconSymbol.toName(icon));
                box.color.setValue(color);
            });
            const audioUnitBox = AudioUnitBox.create(boxGraph, UUID.generate(), box => {
                box.type.setValue(type);
                box.collection.refer(rootBox.audioUnits);
                box.index.setValue(audioUnitIndex++);
            });
            busMap.set(audioUnit, audioBusBox);
            audioUnitMap.set(audioUnit, audioUnitBox);
            audioBusBox.output.refer(audioUnitBox.input);
            createSend(audioUnit.sends, audioUnitBox);
            devices.set(audioUnit, audioUnitBox);
            audioUnit.audioEffects.forEach((effect) => devices.set(effect, AudioEffectFactory.write(boxGraph, audioUnitBox, effect)));
            valueTrackWriter.write(boxGraph, devices, audioUnitBox, audioUnit.valueTracks, { index: 0 });
        };
        // TODO Colors need to be in code and written to CSS
        // Then use ColorCodes!
        project.auxUnits.forEach(unit => convertBusUnits(unit, AudioUnitType.Aux, IconSymbol.Flask, "var(--color-orange)"));
        project.groupUnits.forEach(unit => convertBusUnits(unit, AudioUnitType.Bus, IconSymbol.AudioBus, "var(--color-blue)"));
        awaitedSends.forEach(([send, box]) => box.targetBus.refer(asDefined(busMap.get(send.target), "Could not find AudioBus").input));
        const { output: { mute, solo, volume, panning } } = project;
        primaryAudioOutputUnit.mute.setValue(mute);
        primaryAudioOutputUnit.solo.setValue(solo);
        primaryAudioOutputUnit.volume.setValue(volume);
        primaryAudioOutputUnit.panning.setValue(panning);
        primaryAudioOutputUnit.index.setValue(audioUnitIndex);
        // connect
        const audioUnits = [
            ...project.instrumentUnits,
            ...project.auxUnits,
            ...project.groupUnits
        ];
        audioUnits.forEach((audioUnit) => {
            const { output } = audioUnit;
            // undefined means we connect this to the primary output
            // null means this is intended to be unplugged
            const audioBusBox = output === undefined
                ? primaryAudioBus : output === null
                ? null : asDefined(busMap.get(output), "Could not find AudioBus");
            if (isNotNull(audioBusBox)) {
                const audioUnitBox = asDefined(audioUnitMap.get(audioUnit), "audio unit not found in map");
                audioUnitBox.output.refer(audioBusBox.input);
            }
        });
    };
})(AudioUnitBoxFactory || (AudioUnitBoxFactory = {}));
