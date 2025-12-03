import { DefaultObservableValue, Option, Terminator } from "@naomiarotest/lib-std";
export class EngineFacade {
    #terminator = new Terminator();
    #lifecycle = this.#terminator.own(new Terminator());
    #playbackTimestamp = new DefaultObservableValue(0.0);
    #playbackTimestampEnabled = new DefaultObservableValue(true);
    #countInBarsTotal = new DefaultObservableValue(1);
    #countInBeatsRemaining = new DefaultObservableValue(0);
    #position = new DefaultObservableValue(0.0);
    #isPlaying = new DefaultObservableValue(false);
    #isRecording = new DefaultObservableValue(false);
    #isCountingIn = new DefaultObservableValue(false);
    #metronomeEnabled = new DefaultObservableValue(false);
    #metronomeVolume = new DefaultObservableValue(0.5);
    #markerState = new DefaultObservableValue(null);
    #worklet = Option.None;
    constructor() { }
    setWorklet(worklet) {
        this.#worklet = Option.wrap(worklet);
        this.#lifecycle.terminate();
        this.#lifecycle.ownAll(worklet.playbackTimestamp.catchupAndSubscribe(owner => this.#playbackTimestamp.setValue(owner.getValue())), worklet.playbackTimestampEnabled.catchupAndSubscribe(owner => this.#playbackTimestampEnabled.setValue(owner.getValue())), worklet.countInBarsTotal.catchupAndSubscribe(owner => this.#countInBarsTotal.setValue(owner.getValue())), worklet.countInBeatsRemaining.catchupAndSubscribe(owner => this.#countInBeatsRemaining.setValue(owner.getValue())), worklet.position.catchupAndSubscribe(owner => this.#position.setValue(owner.getValue())), worklet.isPlaying.catchupAndSubscribe(owner => this.#isPlaying.setValue(owner.getValue())), worklet.isRecording.catchupAndSubscribe(owner => this.#isRecording.setValue(owner.getValue())), worklet.isCountingIn.catchupAndSubscribe(owner => this.#isCountingIn.setValue(owner.getValue())), worklet.metronomeEnabled.catchupAndSubscribe(owner => this.#metronomeEnabled.setValue(owner.getValue())), worklet.metronomeVolume.catchupAndSubscribe(owner => this.#metronomeVolume.setValue(owner.getValue())), worklet.markerState.catchupAndSubscribe(owner => this.#markerState.setValue(owner.getValue())), this.#metronomeEnabled.catchupAndSubscribe(owner => worklet.metronomeEnabled.setValue(owner.getValue())), this.#metronomeVolume.catchupAndSubscribe(owner => worklet.metronomeVolume.setValue(owner.getValue())), this.#playbackTimestampEnabled.catchupAndSubscribe(owner => worklet.playbackTimestampEnabled.setValue(owner.getValue())), this.#countInBarsTotal.catchupAndSubscribe(owner => worklet.countInBarsTotal.setValue(owner.getValue())));
    }
    assertWorklet() { this.#worklet.unwrap("No worklet available"); }
    releaseWorklet() {
        this.#lifecycle.terminate();
        this.#worklet.ifSome(worklet => worklet.terminate());
        this.#worklet = Option.None;
    }
    play() { this.#worklet.ifSome(worklet => worklet.play()); }
    stop(reset = false) { this.#worklet.ifSome(worklet => worklet.stop(reset)); }
    setPosition(position) { this.#worklet.ifSome(worklet => worklet.setPosition(position)); }
    prepareRecordingState(countIn) { this.#worklet.ifSome(worklet => worklet.prepareRecordingState(countIn)); }
    stopRecording() { this.#worklet.ifSome(worklet => worklet.stopRecording()); }
    get position() { return this.#position; }
    get isPlaying() { return this.#isPlaying; }
    get isRecording() { return this.#isRecording; }
    get isCountingIn() { return this.#isCountingIn; }
    get metronomeEnabled() { return this.#metronomeEnabled; }
    get metronomeVolume() { return this.#metronomeVolume; }
    get playbackTimestamp() { return this.#playbackTimestamp; }
    get playbackTimestampEnabled() { return this.#playbackTimestampEnabled; }
    get countInBarsTotal() { return this.#countInBarsTotal; }
    get countInBeatsRemaining() { return this.#countInBeatsRemaining; }
    get markerState() { return this.#markerState; }
    get project() { return this.#worklet.unwrap("No worklet to get project").project; }
    isReady() { return this.#worklet.mapOr(worklet => worklet.isReady(), Promise.resolve()); }
    queryLoadingComplete() {
        return this.#worklet.mapOr(worklet => worklet.queryLoadingComplete(), Promise.resolve(false));
    }
    panic() { this.#worklet.ifSome(worklet => worklet.panic()); }
    sleep() { this.#worklet.ifSome(worklet => worklet.sleep()); }
    wake() { this.#worklet.ifSome(worklet => worklet.wake()); }
    sampleRate() { return this.#worklet.isEmpty() ? 44_100 : this.#worklet.unwrap().context.sampleRate; }
    subscribeClipNotification(observer) {
        return this.#worklet.unwrap("No worklet to subscribeClipNotification").subscribeClipNotification(observer);
    }
    subscribeNotes(observer) {
        return this.#worklet.unwrap("No worklet to subscribeNotes").subscribeNotes(observer);
    }
    ignoreNoteRegion(uuid) {
        this.#worklet.unwrap("No worklet to ignoreNoteRegion").ignoreNoteRegion(uuid);
    }
    noteSignal(signal) {
        this.#worklet.unwrap("No worklet to noteOn").noteSignal(signal);
    }
    scheduleClipPlay(clipIds) {
        this.#worklet.unwrap("No worklet to scheduleClipPlay").scheduleClipPlay(clipIds);
    }
    scheduleClipStop(trackIds) {
        this.#worklet.unwrap("No worklet to scheduleClipStop").scheduleClipStop(trackIds);
    }
    terminate() {
        this.releaseWorklet();
        this.#terminator.terminate();
    }
}
