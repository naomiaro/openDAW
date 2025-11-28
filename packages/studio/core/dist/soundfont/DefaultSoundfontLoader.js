import { Notifier, Option, Terminable, UUID } from "@opendaw/lib-std";
import { Promises } from "@opendaw/lib-runtime";
import { SoundfontStorage } from "./SoundfontStorage";
import { ExternalLib } from "../ExternalLib";
export class DefaultSoundfontLoader {
    #manager;
    #uuid;
    #notifier;
    #soundFont2 = Promises.memoizeAsync(() => ExternalLib.SoundFont2());
    #meta = Option.None;
    #soundfont = Option.None;
    #state = { type: "progress", progress: 0.0 };
    constructor(manager, uuid) {
        this.#manager = manager;
        this.#uuid = uuid;
        this.#notifier = new Notifier();
        this.#get();
    }
    subscribe(observer) {
        if (this.#state.type === "loaded") {
            observer(this.#state);
            return Terminable.Empty;
        }
        return this.#notifier.subscribe(observer);
    }
    invalidate() {
        this.#state = { type: "progress", progress: 0.0 };
        this.#meta = Option.None;
        this.#soundfont = Option.None;
        this.#get();
    }
    get uuid() { return this.#uuid; }
    get soundfont() { return this.#soundfont; }
    get meta() { return this.#meta; }
    get state() { return this.#state; }
    toString() { return `{MainThreadSoundfontLoader}`; }
    #setState(value) {
        this.#state = value;
        this.#notifier.notify(this.#state);
    }
    #get() {
        SoundfontStorage.get().load(this.#uuid).then(async ([file, meta]) => {
            this.#soundfont = Option.wrap(await this.#createSoundFont2(file));
            this.#meta = Option.wrap(meta);
            this.#setState({ type: "loaded" });
        }, (error) => {
            if (error instanceof Error && error.message.startsWith("timeoout")) {
                this.#setState({ type: "error", reason: error.message });
                return console.warn(`Soundfont ${UUID.toString(this.#uuid)} timed out.`);
            }
            else {
                return this.#fetch();
            }
        });
    }
    async #fetch() {
        const fetchProgress = progress => this.#setState({ type: "progress", progress });
        const fetchResult = await Promises.tryCatch(this.#manager.fetch(this.#uuid, fetchProgress));
        if (fetchResult.status === "rejected") {
            console.warn(fetchResult.error);
            this.#setState({ type: "error", reason: "Error: N/A" });
            return;
        }
        const [file, meta] = fetchResult.value;
        const storeResult = await Promises.tryCatch(SoundfontStorage.get().save({ uuid: this.#uuid, file, meta }));
        if (storeResult.status === "resolved") {
            this.#soundfont = Option.wrap(await this.#createSoundFont2(file));
            this.#meta = Option.wrap(meta);
            this.#setState({ type: "loaded" });
        }
        else {
            console.warn(storeResult.error);
            this.#setState({ type: "error", reason: "N/A" });
        }
    }
    async #createSoundFont2(buffer) {
        const SoundFont2 = await this.#soundFont2();
        return new SoundFont2(new Uint8Array(buffer));
    }
}
