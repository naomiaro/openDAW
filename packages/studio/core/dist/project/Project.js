import { Arrays, panic, safeExecute, Terminator } from "@opendaw/lib-std";
import { BoxEditing } from "@opendaw/lib-box";
import { AudioRegionBox } from "@opendaw/studio-boxes";
import { BoxAdapters, ParameterFieldAdapters, ProjectSkeleton, RootBoxAdapter, TimelineBoxAdapter, UnionBoxTypes, UserEditingManager, VertexSelection } from "@opendaw/studio-adapters";
import { LiveStreamReceiver } from "@opendaw/lib-fusion";
import { Mixer } from "../Mixer";
import { ProjectApi } from "./ProjectApi";
import { ProjectMigration } from "./ProjectMigration";
import { CaptureDevices, Recording } from "../capture";
import { EngineFacade } from "../EngineFacade";
import { MidiDevices, MIDILearning } from "../midi";
import { ProjectValidation } from "./ProjectValidation";
import { Preferences } from "../Preferences";
import { ConstantTempoMap, PPQN, TimeBase } from "@opendaw/lib-dsp";
import { MidiData } from "@opendaw/lib-midi";
// Main Entry Point for a Project
export class Project {
    static new(env, options) {
        const createDefaultUser = options?.noDefaultUser !== true;
        const createOutputCompressor = Preferences.values["auto-create-output-compressor"];
        const { boxGraph, mandatoryBoxes } = ProjectSkeleton.empty({
            createOutputCompressor,
            createDefaultUser
        });
        const project = new Project(env, boxGraph, mandatoryBoxes);
        if (createDefaultUser) {
            project.follow(mandatoryBoxes.userInterfaceBoxes[0]);
        }
        return project;
    }
    static load(env, arrayBuffer) {
        return this.skeleton(env, ProjectSkeleton.decode(arrayBuffer));
    }
    static skeleton(env, skeleton, followFirstUser = true) {
        ProjectMigration.migrate(skeleton);
        ProjectValidation.validate(skeleton);
        const project = new Project(env, skeleton.boxGraph, skeleton.mandatoryBoxes);
        if (followFirstUser) {
            project.follow(project.userInterfaceBoxes[0]);
        }
        return project;
    }
    #terminator = new Terminator();
    #env;
    boxGraph;
    rootBox;
    userInterfaceBoxes;
    masterBusBox;
    masterAudioUnit;
    timelineBox;
    api;
    captureDevices;
    editing;
    selection;
    boxAdapters;
    userEditingManager;
    parameterFieldAdapters;
    liveStreamReceiver;
    midiLearning;
    mixer;
    tempoMap;
    engine = new EngineFacade();
    constructor(env, boxGraph, { rootBox, userInterfaceBoxes, primaryAudioBus, primaryAudioOutputUnit, timelineBox }) {
        this.#env = env;
        this.boxGraph = boxGraph;
        this.rootBox = rootBox;
        this.userInterfaceBoxes = userInterfaceBoxes;
        this.masterBusBox = primaryAudioBus;
        this.masterAudioUnit = primaryAudioOutputUnit;
        this.timelineBox = timelineBox;
        this.api = new ProjectApi(this);
        this.editing = new BoxEditing(this.boxGraph);
        this.selection = new VertexSelection(this.editing, this.boxGraph);
        this.parameterFieldAdapters = new ParameterFieldAdapters();
        this.tempoMap = new ConstantTempoMap(this.timelineBox.bpm);
        this.boxAdapters = this.#terminator.own(new BoxAdapters(this));
        this.userEditingManager = new UserEditingManager(this.editing);
        this.liveStreamReceiver = this.#terminator.own(new LiveStreamReceiver());
        this.midiLearning = this.#terminator.own(new MIDILearning(this));
        this.captureDevices = this.#terminator.own(new CaptureDevices(this));
        this.mixer = new Mixer(this.rootBoxAdapter.audioUnits);
        // TODO We are probably doing that from the outside
        if (this.userInterfaceBoxes.length === 1) {
            this.follow(this.userInterfaceBoxes[0]);
        }
        console.debug(`Project was created on ${this.rootBoxAdapter.created.toString()}`);
    }
    startAudioWorklet(restart, options) {
        console.debug(`start AudioWorklet`);
        const lifecycle = this.#terminator.spawn();
        const engine = lifecycle.own(this.#env.audioWorklets.createEngine({ project: this, options }));
        const handler = async (event) => {
            console.warn(event);
            // we will only accept the first error
            engine.removeEventListener("error", handler);
            engine.removeEventListener("processorerror", handler);
            lifecycle.terminate();
            await safeExecute(restart?.unload, event);
            safeExecute(restart?.load, this.startAudioWorklet(restart));
        };
        engine.addEventListener("error", handler);
        engine.addEventListener("processorerror", handler);
        engine.connect(engine.context.destination);
        this.engine.setWorklet(engine);
        return engine;
    }
    startRecording(countIn = true) {
        this.engine.assertWorklet();
        if (Recording.isRecording) {
            return;
        }
        Recording.start(this, countIn).finally();
    }
    follow(box) {
        this.userEditingManager.follow(box);
        this.selection.switch(box.selection);
    }
    own(terminable) { return this.#terminator.own(terminable); }
    ownAll(...terminables) { return this.#terminator.ownAll(...terminables); }
    spawn() { return this.#terminator.spawn(); }
    get env() { return this.#env; }
    get rootBoxAdapter() { return this.boxAdapters.adapterFor(this.rootBox, RootBoxAdapter); }
    get timelineBoxAdapter() { return this.boxAdapters.adapterFor(this.timelineBox, TimelineBoxAdapter); }
    get sampleManager() { return this.#env.sampleManager; }
    get soundfontManager() { return this.#env.soundfontManager; }
    get clipSequencing() { return panic("Only available in audio context"); }
    get isAudioContext() { return false; }
    get isMainThread() { return true; }
    get liveStreamBroadcaster() { return panic("Only available in audio context"); }
    get signatureDuration() {
        const { nominator, denominator } = this.timelineBox.signature;
        return PPQN.fromSignature(nominator.getValue(), denominator.getValue());
    }
    get skeleton() {
        return {
            boxGraph: this.boxGraph,
            mandatoryBoxes: {
                rootBox: this.rootBox,
                timelineBox: this.timelineBox,
                primaryAudioBus: this.masterBusBox,
                primaryAudioOutputUnit: this.masterAudioUnit,
                userInterfaceBoxes: this.userInterfaceBoxes
            }
        };
    }
    receivedMIDIFromEngine(midiDeviceId, data, relativeTimeInMs) {
        const debug = false;
        if (debug) {
            console.debug("receivedMIDIFromEngine", MidiData.debug(data), relativeTimeInMs);
        }
        const timestamp = performance.now() + relativeTimeInMs;
        MidiDevices.get().ifSome(midiAccess => {
            const output = midiAccess.outputs.get(midiDeviceId);
            try {
                output?.send(data, timestamp);
            }
            catch (reason) {
                console.warn("Failed to send MIDI message", reason);
            }
        });
    }
    collectSampleUUIDs() {
        return this.boxGraph.boxes()
            .filter(box => box.accept({ visitAudioFileBox: (_box) => true }))
            .map(box => box.address.uuid);
    }
    toArrayBuffer() {
        return ProjectSkeleton.encode(this.boxGraph);
    }
    copy(env) {
        return Project.load({ ...this.#env, ...env }, this.toArrayBuffer());
    }
    invalid() {
        // TODO Optimise. Flag changes somewhere.
        return this.boxGraph.boxes().some(box => box.accept({
            visitTrackBox: (box) => {
                for (const [current, next] of Arrays.iterateAdjacent(box.regions.pointerHub.incoming()
                    .map(({ box }) => UnionBoxTypes.asRegionBox(box))
                    .sort(({ position: a }, { position: b }) => a.getValue() - b.getValue()))) {
                    if (current instanceof AudioRegionBox && current.timeBase.getValue() === TimeBase.Seconds) {
                        return false;
                    }
                    if (current.position.getValue() + current.duration.getValue() > next.position.getValue()) {
                        return true;
                    }
                }
                return false;
            }
        }) ?? false);
    }
    terminate() {
        console.debug("Project terminated");
        this.#terminator.terminate();
    }
}
