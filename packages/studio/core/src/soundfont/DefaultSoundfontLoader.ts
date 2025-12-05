import {Notifier, Observer, Option, Progress, Subscription, Terminable, UUID} from "@naomiarotest/lib-std"
import {Promises} from "@naomiarotest/lib-runtime"
import {SoundfontLoader, SoundfontLoaderState, SoundfontMetaData} from "@naomiarotest/studio-adapters"
import {DefaultSoundfontLoaderManager} from "./DefaultSoundfontLoaderManager"
import {SoundfontStorage} from "./SoundfontStorage"
import type {SoundFont2} from "soundfont2"
import {ExternalLib} from "../ExternalLib"

export class DefaultSoundfontLoader implements SoundfontLoader {
    readonly #manager: DefaultSoundfontLoaderManager

    readonly #uuid: UUID.Bytes
    readonly #notifier: Notifier<SoundfontLoaderState>

    readonly #soundFont2 = Promises.memoizeAsync(() => ExternalLib.SoundFont2())

    #meta: Option<SoundfontMetaData> = Option.None
    #soundfont: Option<SoundFont2> = Option.None
    #state: SoundfontLoaderState = {type: "progress", progress: 0.0}

    constructor(manager: DefaultSoundfontLoaderManager, uuid: UUID.Bytes) {
        this.#manager = manager
        this.#uuid = uuid

        this.#notifier = new Notifier<SoundfontLoaderState>()
        this.#get()
    }

    subscribe(observer: Observer<SoundfontLoaderState>): Subscription {
        if (this.#state.type === "loaded") {
            observer(this.#state)
            return Terminable.Empty
        }
        return this.#notifier.subscribe(observer)
    }

    invalidate(): void {
        this.#state = {type: "progress", progress: 0.0}
        this.#meta = Option.None
        this.#soundfont = Option.None
        this.#get()
    }

    get uuid(): UUID.Bytes {return this.#uuid}
    get soundfont(): Option<SoundFont2> {return this.#soundfont}
    get meta(): Option<SoundfontMetaData> {return this.#meta}
    get state(): SoundfontLoaderState {return this.#state}

    toString(): string {return `{MainThreadSoundfontLoader}`}

    #setState(value: SoundfontLoaderState): void {
        this.#state = value
        this.#notifier.notify(this.#state)
    }

    #get(): void {
        SoundfontStorage.get().load(this.#uuid).then(async ([file, meta]) => {
                this.#soundfont = Option.wrap(await this.#createSoundFont2(file))
                this.#meta = Option.wrap(meta)
                this.#setState({type: "loaded"})
            },
            (error: any) => {
                if (error instanceof Error && error.message.startsWith("timeoout")) {
                    this.#setState({type: "error", reason: error.message})
                    return console.warn(`Soundfont ${UUID.toString(this.#uuid)} timed out.`)
                } else {
                    return this.#fetch()
                }
            })
    }

    async #fetch(): Promise<void> {
        const fetchProgress: Progress.Handler = progress => this.#setState({type: "progress", progress})
        const fetchResult = await Promises.tryCatch(this.#manager.fetch(this.#uuid, fetchProgress))
        if (fetchResult.status === "rejected") {
            console.warn(fetchResult.error)
            this.#setState({type: "error", reason: "Error: N/A"})
            return
        }
        const [file, meta] = fetchResult.value
        const storeResult = await Promises.tryCatch(SoundfontStorage.get().save({uuid: this.#uuid, file, meta}))
        if (storeResult.status === "resolved") {
            this.#soundfont = Option.wrap(await this.#createSoundFont2(file))
            this.#meta = Option.wrap(meta)
            this.#setState({type: "loaded"})
        } else {
            console.warn(storeResult.error)
            this.#setState({type: "error", reason: "N/A"})
        }
    }

    async #createSoundFont2(buffer: ArrayBuffer): Promise<SoundFont2> {
        const SoundFont2 = await this.#soundFont2()
        return new SoundFont2(new Uint8Array(buffer))
    }
}