import { ByteArrayInput, Notifier, Option, Progress, Terminable, UUID } from "@opendaw/lib-std";
import { Promises } from "@opendaw/lib-runtime";
import { SamplePeaks } from "@opendaw/lib-fusion";
import { Workers } from "../Workers";
import { SampleStorage } from "./SampleStorage";
export class DefaultSampleLoader {
    #manager;
    #uuid;
    #notifier;
    #meta = Option.None;
    #data = Option.None;
    #peaks = Option.None;
    #state = { type: "progress", progress: 0.0 };
    #version = 0;
    constructor(manager, uuid) {
        this.#manager = manager;
        this.#uuid = uuid;
        this.#notifier = new Notifier();
        this.#get();
    }
    invalidate() {
        this.#state = { type: "progress", progress: 0.0 };
        this.#meta = Option.None;
        this.#data = Option.None;
        this.#peaks = Option.None;
        this.#version++;
        this.#get();
    }
    subscribe(observer) {
        if (this.#state.type === "loaded") {
            observer(this.#state);
            return Terminable.Empty;
        }
        return this.#notifier.subscribe(observer);
    }
    get uuid() { return this.#uuid; }
    get data() { return this.#data; }
    get meta() { return this.#meta; }
    get peaks() { return this.#peaks; }
    get state() { return this.#state; }
    toString() { return `{MainThreadSampleLoader}`; }
    #setState(value) {
        this.#state = value;
        this.#notifier.notify(this.#state);
    }
    #get() {
        let version = this.#version;
        SampleStorage.get().load(this.#uuid).then(([data, peaks, meta]) => {
            if (this.#version !== version) {
                console.warn(`Ignore obsolete version: ${this.#version} / ${version}`);
                return;
            }
            this.#data = Option.wrap(data);
            this.#meta = Option.wrap(meta);
            this.#peaks = Option.wrap(peaks);
            this.#setState({ type: "loaded" });
        }, (error) => {
            if (error instanceof Error && error.message.startsWith("timeoout")) {
                this.#setState({ type: "error", reason: error.message });
                return console.warn(`Sample ${UUID.toString(this.#uuid)} timed out.`);
            }
            else {
                return this.#fetch();
            }
        });
    }
    async #fetch() {
        let version = this.#version;
        const [fetchProgress, peakProgress] = Progress.split(progress => this.#setState({
            type: "progress",
            progress: 0.1 + 0.9 * progress
        }), 2);
        const fetchResult = await Promises.tryCatch(this.#manager.fetch(this.#uuid, fetchProgress));
        if (this.#version !== version) {
            return;
        }
        if (fetchResult.status === "rejected") {
            console.warn(fetchResult.error);
            this.#setState({ type: "error", reason: "Error: N/A" });
            return;
        }
        const [audio, meta] = fetchResult.value;
        const shifts = SamplePeaks.findBestFit(audio.numberOfFrames);
        const peaks = await Workers.Peak.generateAsync(peakProgress, shifts, audio.frames, audio.numberOfFrames, audio.numberOfChannels);
        const storeResult = await Promises.tryCatch(SampleStorage.get().save({
            uuid: this.#uuid,
            audio: audio,
            peaks: peaks,
            meta: meta
        }));
        if (this.#version !== version) {
            return;
        }
        if (storeResult.status === "resolved") {
            this.#data = Option.wrap(audio);
            this.#meta = Option.wrap(meta);
            this.#peaks = Option.wrap(SamplePeaks.from(new ByteArrayInput(peaks)));
            this.#setState({ type: "loaded" });
        }
        else {
            console.warn(storeResult.error);
            this.#setState({ type: "error", reason: "N/A" });
        }
    }
}
