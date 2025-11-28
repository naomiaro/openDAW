import { Option, quantizeCeil, quantizeFloor, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { dbToGain, PPQN } from "@opendaw/lib-dsp";
import { AudioFileBox, AudioRegionBox, ValueEventCollectionBox } from "@opendaw/studio-boxes";
import { ColorCodes, TrackType } from "@opendaw/studio-adapters";
import { RecordTrack } from "./RecordTrack";
export var RecordAudio;
(function (RecordAudio) {
    /** Currently active recording worklets (cleared when recording stops) */
    const activeWorklets = new Set();
    /** Get all currently active recording worklets */
    RecordAudio.getActiveWorklets = () => Array.from(activeWorklets);
    RecordAudio.start = ({ recordingWorklet, mediaStream, sampleManager, audioContext, project, capture, gainDb }) => {
        // Track this worklet as active
        activeWorklets.add(recordingWorklet);
        const terminator = new Terminator();
        const beats = PPQN.fromSignature(1, project.timelineBox.signature.denominator.getValue());
        const { editing, engine, boxGraph } = project;
        const trackBox = RecordTrack.findOrCreate(editing, capture.audioUnitBox, TrackType.Audio);
        const uuid = recordingWorklet.uuid;
        sampleManager.record(recordingWorklet);
        const streamSource = audioContext.createMediaStreamSource(mediaStream);
        const streamGain = audioContext.createGain();
        streamGain.gain.value = dbToGain(gainDb);
        streamSource.connect(streamGain);
        recordingWorklet.own(Terminable.create(() => {
            streamGain.disconnect();
            streamSource.disconnect();
        }));
        let recordingData = Option.None;
        const createRecordingData = (position) => editing.modify(() => {
            const fileDateString = new Date()
                .toISOString()
                .replaceAll("T", "-")
                .replaceAll(".", "-")
                .replaceAll(":", "-")
                .replaceAll("Z", "");
            const fileName = `Recording-${fileDateString}`;
            const fileBox = AudioFileBox.create(boxGraph, uuid, box => box.fileName.setValue(fileName));
            const collectionBox = ValueEventCollectionBox.create(boxGraph, UUID.generate());
            const regionBox = AudioRegionBox.create(boxGraph, UUID.generate(), box => {
                box.file.refer(fileBox);
                box.events.refer(collectionBox.owners);
                box.regions.refer(trackBox.regions);
                box.position.setValue(position);
                box.hue.setValue(ColorCodes.forTrackType(TrackType.Audio));
                box.label.setValue("Recording");
            });
            return { fileBox, regionBox };
        });
        const { tempoMap, env: { audioContext: { sampleRate } } } = project;
        terminator.ownAll(Terminable.create(() => {
            // Remove from active worklets when recording terminates
            activeWorklets.delete(recordingWorklet);
            if (recordingWorklet.numberOfFrames === 0 || recordingData.isEmpty()) {
                console.debug("Abort recording audio.");
                sampleManager.remove(uuid);
                recordingWorklet.terminate();
            }
            else {
                const { regionBox: { duration }, fileBox } = recordingData.unwrap("No recording data available");
                recordingWorklet.limit(Math.ceil(tempoMap.intervalToSeconds(0, duration.getValue()) * sampleRate));
                fileBox.endInSeconds.setValue(recordingWorklet.numberOfFrames / sampleRate);
            }
        }), engine.position.catchupAndSubscribe(owner => {
            if (!engine.isRecording.getValue()) {
                return;
            }
            if (recordingData.isEmpty()) {
                streamGain.connect(recordingWorklet);
                recordingData = createRecordingData(quantizeFloor(owner.getValue(), beats));
            }
            const { regionBox } = recordingData.unwrap();
            editing.modify(() => {
                if (regionBox.isAttached()) {
                    const { duration, loopDuration } = regionBox;
                    const newDuration = quantizeCeil(engine.position.getValue(), beats) - regionBox.position.getValue();
                    duration.setValue(newDuration);
                    loopDuration.setValue(newDuration);
                    const totalSamples = Math.ceil(tempoMap.intervalToSeconds(0, newDuration) * sampleRate);
                    recordingWorklet.setFillLength(totalSamples);
                }
                else {
                    terminator.terminate();
                    recordingData = Option.None;
                }
            }, false);
        }));
        return terminator;
    };
})(RecordAudio || (RecordAudio = {}));
