import { asDefined, asInstanceOf, Color, ifDefined, isInstanceOf, Option, UUID } from "@opendaw/lib-std";
import { Xml } from "@opendaw/lib-xml";
import { dbToGain, PPQN } from "@opendaw/lib-dsp";
import { AddressIdEncoder, BooleanField } from "@opendaw/lib-box";
import { Html } from "@opendaw/lib-dom";
import { ApplicationSchema, ArrangementSchema, AudioAlgorithm, AudioSchema, BuiltinDeviceSchema, ChannelRole, ChannelSchema, ClipSchema, ClipsSchema, DeviceRole, FileReferenceSchema, LanesSchema, NoteSchema, NotesSchema, ParameterEncoder, ProjectSchema, RealParameterSchema, TimeSignatureParameterSchema, TimeUnit, TrackSchema, TransportSchema, Unit, WarpSchema, WarpsSchema } from "@opendaw/lib-dawproject";
import { AudioUnitType } from "@opendaw/studio-enums";
import { AudioFileBox, AudioUnitBox, NoteEventBox, NoteEventCollectionBox, TrackBox } from "@opendaw/studio-boxes";
import { ColorCodes, DeviceBoxUtils } from "@opendaw/studio-adapters";
import { AudioUnitExportLayout } from "./AudioUnitExportLayout";
import { DeviceIO } from "./DeviceIO";
import { WavFile } from "../WavFile";
export var DawProjectExporter;
(function (DawProjectExporter) {
    DawProjectExporter.write = (skeleton, sampleManager, resourcePacker) => {
        const ids = new AddressIdEncoder();
        const { boxGraph, mandatoryBoxes: { timelineBox, rootBox } } = skeleton;
        const audioUnits = rootBox.audioUnits.pointerHub.incoming()
            .map(({ box }) => asInstanceOf(box, AudioUnitBox))
            .sort((a, b) => a.index.getValue() - b.index.getValue());
        boxGraph.boxes().forEach(box => box.accept({
            visitAudioFileBox: (box) => sampleManager.getOrCreate(box.address.uuid).data
                .ifSome(({ frames, numberOfFrames, sampleRate, numberOfChannels }) => resourcePacker.write(`samples/${box.fileName.getValue()}.wav`, WavFile.encodeFloats({
                channels: frames,
                duration: numberOfFrames * sampleRate,
                numberOfChannels,
                sampleRate,
                numFrames: numberOfFrames
            })))
        }));
        const writeTransport = () => Xml.element({
            tempo: Xml.element({
                id: ids.getOrCreate(timelineBox.bpm.address),
                value: timelineBox.bpm.getValue(),
                unit: Unit.BPM
            }, RealParameterSchema),
            timeSignature: Xml.element({
                numerator: timelineBox.signature.nominator.getValue(),
                denominator: timelineBox.signature.denominator.getValue()
            }, TimeSignatureParameterSchema)
        }, TransportSchema);
        const writeDevices = (field, deviceRole) => field.pointerHub
            .incoming().map(({ box }) => {
            const enabled = ("enabled" in box && isInstanceOf(box.enabled, BooleanField)
                ? Option.wrap(box.enabled)
                : Option.None)
                .mapOr(field => ParameterEncoder.bool(ids.getOrCreate(field.address), field.getValue(), "On/Off"), undefined);
            const deviceID = box.name;
            const deviceName = DeviceBoxUtils.lookupLabelField(box).getValue();
            const deviceVendor = "openDAW";
            const id = ids.getOrCreate(box.address);
            return Xml.element({
                id,
                deviceID,
                deviceRole,
                deviceName,
                deviceVendor,
                enabled,
                loaded: true,
                automatedParameters: [],
                state: resourcePacker
                    .write(`presets/${UUID.toString(box.address.uuid)}`, DeviceIO.exportDevice(box))
            }, BuiltinDeviceSchema);
        });
        const colorForAudioType = (unitType) => {
            const [r, g, b] = Html.readCssVarColor(ColorCodes.forAudioType(unitType).toString())[0];
            const RR = Math.round(r * 255).toString(16).padStart(2, "0");
            const GG = Math.round(g * 255).toString(16).padStart(2, "0");
            const BB = Math.round(b * 255).toString(16).padStart(2, "0");
            return `#${RR}${GG}${BB}`;
        };
        const writeStructure = () => {
            const tracks = AudioUnitExportLayout.layout(audioUnits);
            const writeAudioUnitBox = (audioUnitBox, tracks) => {
                const unitType = audioUnitBox.type.getValue();
                const color = colorForAudioType(unitType);
                const isPrimary = unitType === AudioUnitType.Output;
                const isAux = unitType === AudioUnitType.Aux;
                const inputBox = audioUnitBox.input.pointerHub.incoming().at(0)?.box;
                const contentType = isPrimary ? "audio notes" // we copied that value from bitwig
                    : isAux ? "audio" : (() => 
                    // TODO Another location to remember to put devices in...?
                    //  We could also read the first track type?
                    inputBox?.accept({
                        visitTapeDeviceBox: () => "audio",
                        visitVaporisateurDeviceBox: () => "notes",
                        visitNanoDeviceBox: () => "notes",
                        visitPlayfieldDeviceBox: () => "notes",
                        visitAudioBusBox: () => "tracks"
                    }))() ?? undefined;
                return Xml.element({
                    id: ids.getOrCreate(audioUnitBox.address),
                    name: DeviceBoxUtils.lookupLabelField(inputBox).getValue(),
                    loaded: true,
                    color,
                    contentType,
                    channel: Xml.element({
                        id: ifDefined(inputBox, ({ address }) => ids.getOrCreate(address)),
                        destination: isPrimary
                            ? undefined
                            : audioUnitBox.output.targetVertex
                                .mapOr(({ box }) => ids.getOrCreate(box.address), undefined),
                        role: (() => {
                            switch (unitType) {
                                case AudioUnitType.Instrument:
                                    return ChannelRole.REGULAR;
                                case AudioUnitType.Aux:
                                    return ChannelRole.EFFECT;
                                case AudioUnitType.Bus:
                                case AudioUnitType.Output:
                                    return ChannelRole.MASTER;
                            }
                        })(),
                        devices: [
                            ...(writeDevices(audioUnitBox.midiEffects, DeviceRole.NOTE_FX)),
                            ...(writeDevices(audioUnitBox.input, DeviceRole.INSTRUMENT)),
                            ...(writeDevices(audioUnitBox.audioEffects, DeviceRole.AUDIO_FX))
                        ],
                        volume: ParameterEncoder.linear(ids.getOrCreate(audioUnitBox.volume.address), dbToGain(audioUnitBox.volume.getValue()), 0.0, 2.0, "Volume"),
                        pan: ParameterEncoder.normalized(ids.getOrCreate(audioUnitBox.panning.address), (audioUnitBox.panning.getValue() + 1.0) / 2.0, 0.0, 1.0, "Pan")
                    }, ChannelSchema),
                    tracks
                }, TrackSchema);
            };
            const writeTracks = (tracks) => tracks.map((track) => writeAudioUnitBox(track.audioUnit, writeTracks(track.children)));
            return writeTracks(tracks);
        };
        const writeAudioRegion = (region) => {
            const audioFileBox = asInstanceOf(region.file.targetVertex.unwrap("No file at region").box, AudioFileBox);
            const audioElement = sampleManager.getOrCreate(audioFileBox.address.uuid).data
                .map(({ numberOfFrames, sampleRate, numberOfChannels }) => Xml.element({
                duration: numberOfFrames / sampleRate,
                channels: numberOfChannels,
                sampleRate,
                algorithm: AudioAlgorithm.REPITCH,
                file: Xml.element({
                    path: `samples/${audioFileBox.fileName.getValue()}.wav`,
                    external: false
                }, FileReferenceSchema)
            }, AudioSchema));
            const duration = region.duration.getValue() / PPQN.Quarter;
            return Xml.element({
                clips: [Xml.element({
                        time: region.position.getValue() / PPQN.Quarter,
                        duration,
                        contentTimeUnit: TimeUnit.BEATS,
                        playStart: 0.0,
                        loopStart: 0.0,
                        loopEnd: region.loopDuration.getValue() / PPQN.Quarter,
                        enable: !region.mute.getValue(),
                        name: region.label.getValue(),
                        color: Color.hslToHex(region.hue.getValue(), 1.0, 0.60),
                        content: [Xml.element({
                                content: audioElement.mapOr(element => [element], []),
                                contentTimeUnit: "beats",
                                warps: [
                                    Xml.element({
                                        time: 0.0,
                                        contentTime: 0.0
                                    }, WarpSchema),
                                    Xml.element({
                                        time: duration,
                                        contentTime: audioElement.mapOr(element => element.duration, 0)
                                    }, WarpSchema)
                                ]
                            }, WarpsSchema)]
                    }, ClipSchema)]
            }, ClipsSchema);
        };
        const writeNoteRegion = (region) => {
            const collectionBox = asInstanceOf(region.events.targetVertex
                .unwrap("No notes in region").box, NoteEventCollectionBox);
            return Xml.element({
                clips: [Xml.element({
                        time: region.position.getValue() / PPQN.Quarter,
                        duration: region.duration.getValue() / PPQN.Quarter,
                        contentTimeUnit: TimeUnit.BEATS,
                        playStart: 0.0,
                        loopStart: 0.0,
                        loopEnd: region.loopDuration.getValue() / PPQN.Quarter,
                        enable: !region.mute.getValue(),
                        name: region.label.getValue(),
                        color: Color.hslToHex(region.hue.getValue(), 1.0, 0.60),
                        content: [Xml.element({
                                notes: collectionBox.events.pointerHub.incoming()
                                    .map(({ box }) => asInstanceOf(box, NoteEventBox))
                                    .map(box => Xml.element({
                                    time: box.position.getValue() / PPQN.Quarter,
                                    duration: box.duration.getValue() / PPQN.Quarter,
                                    key: box.pitch.getValue(),
                                    channel: 0,
                                    vel: box.velocity.getValue(),
                                    rel: box.velocity.getValue()
                                }, NoteSchema))
                            }, NotesSchema)]
                    }, ClipSchema)]
            }, ClipsSchema);
        };
        // TODO Implement!
        const writeValueRegion = (region) => Xml.element({
            clips: [Xml.element({
                    time: region.position.getValue() / PPQN.Quarter,
                    duration: region.duration.getValue() / PPQN.Quarter,
                    contentTimeUnit: TimeUnit.BEATS,
                    playStart: 0.0,
                    loopStart: 0.0,
                    loopEnd: region.loopDuration.getValue() / PPQN.Quarter,
                    enable: !region.mute.getValue(),
                    name: region.label.getValue(),
                    color: Color.hslToHex(region.hue.getValue(), 1.0, 0.60),
                    content: []
                }, ClipSchema)]
        }, ClipsSchema);
        const writeLanes = () => {
            return audioUnits
                .flatMap(audioUnitBox => audioUnitBox.tracks.pointerHub.incoming()
                .map(({ box }) => asInstanceOf(box, TrackBox))
                .sort((a, b) => a.index.getValue() - b.index.getValue())
                .map(trackBox => Xml.element({
                id: ids.getOrCreate(trackBox.address),
                track: ids.getOrCreate(audioUnitBox.address),
                lanes: trackBox.regions.pointerHub.incoming()
                    .map(({ box }) => asDefined(box.accept({
                    visitAudioRegionBox: (region) => writeAudioRegion(region),
                    visitNoteRegionBox: (region) => writeNoteRegion(region),
                    visitValueRegionBox: (region) => writeValueRegion(region)
                }), "Could not write region."))
            }, LanesSchema)));
        };
        return Xml.element({
            version: "1.0",
            application: Xml.element({
                name: "openDAW",
                version: "0.1"
            }, ApplicationSchema),
            transport: writeTransport(),
            structure: writeStructure(),
            arrangement: Xml.element({
                lanes: Xml.element({
                    lanes: writeLanes(),
                    timeUnit: TimeUnit.BEATS
                }, LanesSchema)
            }, ArrangementSchema),
            scenes: []
        }, ProjectSchema);
    };
})(DawProjectExporter || (DawProjectExporter = {}));
