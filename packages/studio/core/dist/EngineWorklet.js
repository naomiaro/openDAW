import { Arrays, DefaultObservableValue, Notifier, Option, SyncStream, Terminator, UUID } from "@naomiarotest/lib-std";
import { SyncSource } from "@naomiarotest/lib-box";
import { AnimationFrame } from "@naomiarotest/lib-dom";
import { Communicator, Messenger } from "@naomiarotest/lib-runtime";
import { EngineStateSchema, ExportStemsConfiguration } from "@naomiarotest/studio-adapters";
import { MIDIReceiver } from "./midi/MIDIReceiver";
export class EngineWorklet extends AudioWorkletNode {
    static ID = 0 | 0;
    id = EngineWorklet.ID++;
    #terminator = new Terminator();
    #project;
    #playbackTimestamp = new DefaultObservableValue(0.0);
    #playbackTimestampEnabled = new DefaultObservableValue(true);
    #position = new DefaultObservableValue(0.0);
    #isPlaying = new DefaultObservableValue(false);
    #isRecording = new DefaultObservableValue(false);
    #isCountingIn = new DefaultObservableValue(false);
    #countInBarsTotal = new DefaultObservableValue(1);
    #countInBeatsRemaining = new DefaultObservableValue(0);
    #metronomeEnabled = new DefaultObservableValue(false);
    #metronomeVolume = new DefaultObservableValue(0.5);
    #markerState = new DefaultObservableValue(null);
    #controlFlags;
    #notifyClipNotification;
    #notifyNoteSignals;
    #playingClips;
    #commands;
    #isReady;
    constructor(context, project, exportConfiguration, options) {
        const numberOfChannels = ExportStemsConfiguration.countStems(Option.wrap(exportConfiguration)) * 2;
        const reader = SyncStream.reader(EngineStateSchema(), state => {
            this.#isPlaying.setValue(state.isPlaying);
            this.#isRecording.setValue(state.isRecording);
            this.#isCountingIn.setValue(state.isCountingIn);
            this.#countInBeatsRemaining.setValue(state.countInBeatsRemaining);
            this.#playbackTimestamp.setValue(state.playbackTimestamp);
            this.#position.setValue(state.position); // This must be the last to handle the state values before
        });
        const controlFlagsSAB = new SharedArrayBuffer(4); // 4 bytes minimum
        super(context, "engine-processor", {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [numberOfChannels],
            processorOptions: {
                syncStreamBuffer: reader.buffer,
                controlFlagsBuffer: controlFlagsSAB,
                project: project.toArrayBuffer(),
                exportConfiguration,
                options
            }
        });
        const { resolve, promise } = Promise.withResolvers();
        const messenger = Messenger.for(this.port);
        this.#project = project;
        this.#isReady = promise;
        this.#notifyClipNotification = this.#terminator.own(new Notifier());
        this.#notifyNoteSignals = this.#terminator.own(new Notifier());
        this.#playingClips = [];
        this.#controlFlags = new Int32Array(controlFlagsSAB);
        this.#commands = this.#terminator.own(Communicator.sender(messenger.channel("engine-commands"), dispatcher => new class {
            play() { dispatcher.dispatchAndForget(this.play); }
            stop(reset) { dispatcher.dispatchAndForget(this.stop, reset); }
            setPosition(position) { dispatcher.dispatchAndForget(this.setPosition, position); }
            prepareRecordingState(countIn) {
                dispatcher.dispatchAndForget(this.prepareRecordingState, countIn);
            }
            stopRecording() { dispatcher.dispatchAndForget(this.stopRecording); }
            setMetronomeEnabled(enabled) {
                dispatcher.dispatchAndForget(this.setMetronomeEnabled, enabled);
            }
            setMetronomeVolume(volume) {
                dispatcher.dispatchAndForget(this.setMetronomeVolume, volume);
            }
            setPlaybackTimestampEnabled(enabled) {
                dispatcher.dispatchAndForget(this.setPlaybackTimestampEnabled, enabled);
            }
            setCountInBarsTotal(value) {
                dispatcher.dispatchAndForget(this.setCountInBarsTotal, value);
            }
            queryLoadingComplete() {
                return dispatcher.dispatchAndReturn(this.queryLoadingComplete);
            }
            panic() { dispatcher.dispatchAndForget(this.panic); }
            sleep() { dispatcher.dispatchAndForget(this.sleep); }
            wake() { dispatcher.dispatchAndForget(this.wake); }
            noteSignal(signal) { dispatcher.dispatchAndForget(this.noteSignal, signal); }
            ignoreNoteRegion(uuid) {
                dispatcher.dispatchAndForget(this.ignoreNoteRegion, uuid);
            }
            scheduleClipPlay(clipIds) {
                dispatcher.dispatchAndForget(this.scheduleClipPlay, clipIds);
            }
            scheduleClipStop(trackIds) {
                dispatcher.dispatchAndForget(this.scheduleClipStop, trackIds);
            }
            setupMIDI(port, buffer) {
                dispatcher.dispatchAndForget(this.setupMIDI, port, buffer);
            }
            terminate() { dispatcher.dispatchAndForget(this.terminate); }
        }));
        const { port, sab } = this.#terminator.own(MIDIReceiver.create(context, (deviceId, data, relativeTimeInMs) => this.#project.receivedMIDIFromEngine(deviceId, data, relativeTimeInMs)));
        this.#commands.setupMIDI(port, sab);
        Communicator.executor(messenger.channel("engine-to-client"), {
            log: (message) => console.log("WORKLET", message),
            error: (reason) => this.dispatchEvent(new ErrorEvent("error", { error: reason })),
            ready: () => resolve(),
            fetchAudio: (uuid) => {
                return new Promise((resolve, reject) => {
                    const handler = project.sampleManager.getOrCreate(uuid);
                    const subscription = handler.subscribe(state => {
                        if (state.type === "error") {
                            reject(state.reason);
                            subscription.terminate();
                        }
                        else if (state.type === "loaded") {
                            resolve(handler.data.unwrap());
                            subscription.terminate();
                        }
                    });
                });
            },
            fetchSoundfont: (uuid) => {
                return new Promise((resolve, reject) => {
                    const handler = project.soundfontManager.getOrCreate(uuid);
                    const subscription = handler.subscribe(state => {
                        if (state.type === "error") {
                            reject(state.reason);
                            subscription.terminate();
                        }
                        else if (state.type === "loaded") {
                            resolve(handler.soundfont.unwrap());
                            subscription.terminate();
                        }
                    });
                });
            },
            notifyClipSequenceChanges: (changes) => {
                changes.stopped.forEach(uuid => {
                    for (let i = 0; i < this.#playingClips.length; i++) {
                        if (UUID.equals(this.#playingClips[i], uuid)) {
                            this.#playingClips.splice(i, 1);
                            break;
                        }
                    }
                });
                changes.started.forEach(uuid => this.#playingClips.push(uuid));
                this.#notifyClipNotification.notify({ type: "sequencing", changes });
            },
            switchMarkerState: (state) => this.#markerState.setValue(state)
        });
        this.#terminator.ownAll(AnimationFrame.add(() => reader.tryRead()), project.liveStreamReceiver.connect(messenger.channel("engine-live-data")), new SyncSource(project.boxGraph, messenger.channel("engine-sync"), false), this.#metronomeEnabled.catchupAndSubscribe(owner => this.#commands.setMetronomeEnabled(owner.getValue())), this.#metronomeVolume.catchupAndSubscribe(owner => this.#commands.setMetronomeVolume(owner.getValue())), this.#playbackTimestampEnabled.catchupAndSubscribe(owner => this.#commands.setPlaybackTimestampEnabled(owner.getValue())), this.#countInBarsTotal.catchupAndSubscribe(owner => this.#commands.setCountInBarsTotal(owner.getValue())));
    }
    play() { this.#commands.play(); }
    stop(reset = false) { this.#commands.stop(reset); }
    setPosition(position) { this.#commands.setPosition(position); }
    prepareRecordingState(countIn) { this.#commands.prepareRecordingState(countIn); }
    stopRecording() { this.#commands.stopRecording(); }
    panic() { this.#commands.panic(); }
    sleep() {
        Atomics.store(this.#controlFlags, 0, 1);
        this.#commands.stop(true);
    }
    wake() { Atomics.store(this.#controlFlags, 0, 0); }
    get isPlaying() { return this.#isPlaying; }
    get isRecording() { return this.#isRecording; }
    get isCountingIn() { return this.#isCountingIn; }
    get countInBarsTotal() { return this.#countInBarsTotal; }
    get countInBeatsRemaining() { return this.#countInBeatsRemaining; }
    get position() { return this.#position; }
    get playbackTimestamp() { return this.#playbackTimestamp; }
    get playbackTimestampEnabled() { return this.#playbackTimestampEnabled; }
    get metronomeEnabled() { return this.#metronomeEnabled; }
    get metronomeVolume() { return this.#metronomeVolume; }
    get markerState() { return this.#markerState; }
    get project() { return this.#project; }
    isReady() { return this.#isReady; }
    queryLoadingComplete() { return this.#commands.queryLoadingComplete(); }
    noteSignal(signal) { this.#commands.noteSignal(signal); }
    subscribeNotes(observer) { return this.#notifyNoteSignals.subscribe(observer); }
    ignoreNoteRegion(uuid) { this.#commands.ignoreNoteRegion(uuid); }
    scheduleClipPlay(clipIds) {
        this.#notifyClipNotification.notify({ type: "waiting", clips: clipIds });
        this.#commands.scheduleClipPlay(clipIds);
    }
    scheduleClipStop(trackIds) {
        this.#commands.scheduleClipStop(trackIds);
    }
    subscribeClipNotification(observer) {
        observer({
            type: "sequencing",
            changes: { started: this.#playingClips, stopped: Arrays.empty(), obsolete: Arrays.empty() }
        });
        return this.#notifyClipNotification.subscribe(observer);
    }
    terminate() {
        console.debug("WORKLET.terminate");
        this.#terminator.terminate();
        this.disconnect();
    }
}
