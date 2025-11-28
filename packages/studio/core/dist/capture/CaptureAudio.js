import { Errors, isDefined, isUndefined, MutableObservableOption, Option, RuntimeNotifier, Terminable } from "@opendaw/lib-std";
import { Promises } from "@opendaw/lib-runtime";
import { Capture } from "./Capture";
import { RecordAudio } from "./RecordAudio";
import { AudioDevices } from "../AudioDevices";
export class CaptureAudio extends Capture {
    #stream;
    #streamGenerator;
    #requestChannels = Option.None;
    #gainDb = 0.0;
    constructor(manager, audioUnitBox, captureAudioBox) {
        super(manager, audioUnitBox, captureAudioBox);
        this.#stream = new MutableObservableOption();
        this.#streamGenerator = Promises.sequentialize(() => this.#updateStream());
        this.ownAll(captureAudioBox.requestChannels.catchupAndSubscribe(owner => {
            const channels = owner.getValue();
            this.#requestChannels = channels === 1 || channels === 2 ? Option.wrap(channels) : Option.None;
        }), captureAudioBox.gainDb.catchupAndSubscribe(owner => this.#gainDb = owner.getValue()), captureAudioBox.deviceId.catchupAndSubscribe(async () => {
            if (this.armed.getValue()) {
                await this.#streamGenerator();
            }
        }), this.armed.catchupAndSubscribe(async (owner) => {
            const armed = owner.getValue();
            if (armed) {
                await this.#streamGenerator();
            }
            else {
                this.#stopStream();
            }
        }));
    }
    get gainDb() { return this.#gainDb; }
    get stream() { return this.#stream; }
    get streamDeviceId() {
        return this.streamMediaTrack.map(settings => settings.getSettings().deviceId ?? "");
    }
    get label() { return this.streamMediaTrack.mapOr(track => track.label, "Default"); }
    get deviceLabel() { return this.streamMediaTrack.map(track => track.label ?? ""); }
    get streamMediaTrack() {
        return this.#stream.flatMap(stream => Option.wrap(stream.getAudioTracks().at(0)));
    }
    async prepareRecording() {
        const { project } = this.manager;
        const { env: { audioContext } } = project;
        if (isUndefined(audioContext.outputLatency)) {
            const approved = RuntimeNotifier.approve({
                headline: "Warning",
                message: "Your browser does not support 'output latency'. This will cause timing issue while recording.",
                approveText: "Ignore",
                cancelText: "Cancel"
            });
            if (!approved) {
                return Promise.reject("Recording cancelled");
            }
        }
        return this.#streamGenerator();
    }
    startRecording() {
        const { project } = this.manager;
        const { env: { audioContext, audioWorklets, sampleManager } } = project;
        const streamOption = this.#stream;
        if (streamOption.isEmpty()) {
            console.warn("No audio stream available for recording.");
            return Terminable.Empty;
        }
        const mediaStream = streamOption.unwrap();
        const channelCount = mediaStream.getAudioTracks().at(0)?.getSettings().channelCount ?? 1;
        const numChunks = 128;
        const recordingWorklet = audioWorklets.createRecording(channelCount, numChunks, audioContext.outputLatency, this.uuid);
        return RecordAudio.start({
            recordingWorklet,
            mediaStream,
            sampleManager,
            audioContext,
            project,
            capture: this,
            gainDb: this.#gainDb
        });
    }
    async #updateStream() {
        if (this.#stream.nonEmpty()) {
            const stream = this.#stream.unwrap();
            const settings = stream.getAudioTracks().at(0)?.getSettings();
            if (isDefined(settings)) {
                const deviceId = this.deviceId.getValue().unwrapOrUndefined();
                if (isUndefined(deviceId) || deviceId === settings.deviceId) {
                    return Promise.resolve();
                }
            }
        }
        this.#stopStream();
        const deviceId = this.deviceId.getValue().unwrapOrUndefined();
        const channelCount = this.#requestChannels.unwrapOrElse(1);
        return AudioDevices.requestStream({
            deviceId: { exact: deviceId },
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            channelCount: { ideal: channelCount }
        }).then(stream => {
            const tracks = stream.getAudioTracks();
            const track = tracks.at(0);
            const settings = track?.getSettings();
            const gotDeviceId = settings?.deviceId;
            console.debug(`new stream. device requested: ${stream.id}, got: ${gotDeviceId ?? "Default"}. channelCount requested: ${channelCount}, got: ${settings?.channelCount}`);
            if (isUndefined(deviceId) || deviceId === gotDeviceId) {
                this.#stream.wrap(stream);
            }
            else {
                stream.getAudioTracks().forEach(track => track.stop());
                return Errors.warn(`Could not find audio device with id: '${deviceId} in ${gotDeviceId}'`);
            }
        });
    }
    #stopStream() {
        this.#stream.clear(stream => stream.getAudioTracks().forEach(track => track.stop()));
    }
}
