import {asDefined, int, isDefined, isNotNull, Option, UUID} from "@naomiarotest/lib-std"
import {Box} from "@naomiarotest/lib-box"
import {AudioUnitType, IconSymbol} from "@naomiarotest/studio-enums"
import {AudioBusBox, AudioUnitBox, AuxSendBox, TrackBox} from "@naomiarotest/studio-boxes"
import {AudioUnitFactory, CaptureBox, InstrumentFactories, ProjectSkeleton} from "@naomiarotest/studio-adapters"
import {AuxAudioUnitImpl, GroupAudioUnitImpl, InstrumentAudioUnitImpl, ProjectImpl, SendImpl} from "./impl"
import {MIDIEffectFactory} from "./MIDIEffectFactory"
import {AudioEffectFactory} from "./AudioEffectFactory"
import {NoteTrackWriter} from "./NoteTrackWriter"
import {ValueTrackWriter} from "./ValueTrackWriter"
import {AnyDevice, AudioUnit} from "./Api"
import {AudioTrackWriter} from "./AudioTrackWriter"
import {AudioFileBoxfactory} from "./AudioFileBoxfactory"

export namespace AudioUnitBoxFactory {
    export const create = (skeleton: ProjectSkeleton, project: ProjectImpl): void => {
        const {boxGraph, mandatoryBoxes: {rootBox, primaryAudioBus, primaryAudioOutputUnit}} = skeleton

        let audioUnitIndex: int = 0

        const devices: Map<AnyDevice, Box> = new Map()
        const busMap: Map<AudioUnit, AudioBusBox> = new Map([[project.output, primaryAudioBus]])
        const audioUnitMap: Map<AudioUnit, AudioUnitBox> = new Map([[project.output, primaryAudioOutputUnit]])
        const awaitedSends: Array<[SendImpl, AuxSendBox]> = []
        const noteTrackWriter = new NoteTrackWriter()
        const valueTrackWriter = new ValueTrackWriter()
        const createSend = (sends: ReadonlyArray<SendImpl>, audioUnitBox: AudioUnitBox) => {
            awaitedSends.push(...(sends.map((send: SendImpl, index: int): [SendImpl, AuxSendBox] =>
                [send, AuxSendBox.create(boxGraph, UUID.generate(), box => {
                    box.index.setValue(index)
                    box.audioUnit.refer(audioUnitBox.auxSends)
                    box.sendGain.setValue(send.amount)
                    box.sendPan.setValue(send.pan)
                    // TODO mode "pre" | "post"
                })])))
        }
        project.instrumentUnits.forEach((audioUnit: InstrumentAudioUnitImpl) => {
            const {
                instrument, midiEffects, audioEffects, noteTracks, audioTracks, valueTracks,
                volume, panning, mute, solo, sends
            } = audioUnit
            const factory = InstrumentFactories.Named[instrument.name]
            const capture: Option<CaptureBox> = AudioUnitFactory.trackTypeToCapture(boxGraph, factory.trackType)
            const audioUnitBox = AudioUnitFactory.create(skeleton, AudioUnitType.Instrument, capture)
            devices.set(audioUnit, audioUnitBox)
            audioUnitBox.index.setValue(audioUnitIndex++)
            audioUnitBox.mute.setValue(mute)
            audioUnitBox.solo.setValue(solo)
            audioUnitBox.volume.setValue(volume)
            audioUnitBox.panning.setValue(panning)
            if (factory === InstrumentFactories.Nano) {
                const sample = (instrument?.props as Nano)?.sample
                factory.create(boxGraph, audioUnitBox.input, factory.defaultName, factory.defaultIcon,
                    isDefined(sample) ? AudioFileBoxfactory.create(boxGraph, sample) : undefined)
            } else {
                factory.create(boxGraph, audioUnitBox.input, factory.defaultName, factory.defaultIcon)
            }
            midiEffects.forEach((effect) => devices.set(effect, MIDIEffectFactory.write(boxGraph, audioUnitBox, effect)))
            audioEffects.forEach((effect) => devices.set(effect, AudioEffectFactory.write(boxGraph, audioUnitBox, effect)))
            const indexRef = {index: 0}
            noteTrackWriter.write(boxGraph, audioUnitBox, noteTracks, indexRef)
            valueTrackWriter.write(boxGraph, devices, audioUnitBox, valueTracks, indexRef)
            AudioTrackWriter.write(boxGraph, audioUnitBox, audioTracks, indexRef)
            if (indexRef.index === 0) { // create a default track if none existed
                TrackBox.create(boxGraph, UUID.generate(), box => {
                    box.type.setValue(factory.trackType)
                    box.index.setValue(0)
                    box.target.refer(audioUnitBox)
                    box.tracks.refer(audioUnitBox.tracks)
                })
            }
            createSend(sends, audioUnitBox)
            audioUnitMap.set(audioUnit, audioUnitBox)
        })
        const convertBusUnits = (audioUnit: GroupAudioUnitImpl | AuxAudioUnitImpl,
                                 type: string, icon: IconSymbol, color: string) => {
            const audioBusBox = AudioBusBox.create(boxGraph, UUID.generate(), box => {
                box.collection.refer(rootBox.audioBusses)
                box.label.setValue(audioUnit.label)
                box.icon.setValue(IconSymbol.toName(icon))
                box.color.setValue(color)
            })
            const audioUnitBox = AudioUnitBox.create(boxGraph, UUID.generate(), box => {
                box.type.setValue(type)
                box.collection.refer(rootBox.audioUnits)
                box.index.setValue(audioUnitIndex++)
            })
            busMap.set(audioUnit, audioBusBox)
            audioUnitMap.set(audioUnit, audioUnitBox)
            audioBusBox.output.refer(audioUnitBox.input)
            createSend(audioUnit.sends, audioUnitBox)
            devices.set(audioUnit, audioUnitBox)
            audioUnit.audioEffects.forEach((effect) =>
                devices.set(effect, AudioEffectFactory.write(boxGraph, audioUnitBox, effect)))
            valueTrackWriter.write(boxGraph, devices, audioUnitBox, audioUnit.valueTracks, {index: 0})
        }

        // TODO Colors need to be in code and written to CSS
        // Then use ColorCodes!
        project.auxUnits.forEach(unit => convertBusUnits(
            unit, AudioUnitType.Aux, IconSymbol.Flask, "var(--color-orange)"))
        project.groupUnits.forEach(unit => convertBusUnits(
            unit, AudioUnitType.Bus, IconSymbol.AudioBus, "var(--color-blue)"))

        awaitedSends.forEach(([send, box]) =>
            box.targetBus.refer(asDefined(busMap.get(send.target), "Could not find AudioBus").input))

        const {output: {mute, solo, volume, panning}} = project
        primaryAudioOutputUnit.mute.setValue(mute)
        primaryAudioOutputUnit.solo.setValue(solo)
        primaryAudioOutputUnit.volume.setValue(volume)
        primaryAudioOutputUnit.panning.setValue(panning)
        primaryAudioOutputUnit.index.setValue(audioUnitIndex)

        // connect
        const audioUnits: ReadonlyArray<AudioUnit> = [
            ...project.instrumentUnits,
            ...project.auxUnits,
            ...project.groupUnits
        ]
        audioUnits.forEach((audioUnit: AudioUnit) => {
            const {output} = audioUnit
            // undefined means we connect this to the primary output
            // null means this is intended to be unplugged
            const audioBusBox = output === undefined
                ? primaryAudioBus : output === null
                    ? null : asDefined(busMap.get(output), "Could not find AudioBus")
            if (isNotNull(audioBusBox)) {
                const audioUnitBox = asDefined(audioUnitMap.get(audioUnit), "audio unit not found in map")
                audioUnitBox.output.refer(audioBusBox.input)
            }
        })
    }
}