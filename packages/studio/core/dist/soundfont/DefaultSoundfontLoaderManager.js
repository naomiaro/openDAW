import { UUID } from "@opendaw/lib-std";
import { DefaultSoundfontLoader } from "./DefaultSoundfontLoader";
export class DefaultSoundfontLoaderManager {
    #provider;
    #loaders;
    constructor(provider) {
        this.#provider = provider;
        this.#loaders = UUID.newSet(loader => loader.uuid);
    }
    fetch(uuid, progress) {
        return this.#provider.fetch(uuid, progress);
    }
    remove(uuid) { this.#loaders.removeByKey(uuid); }
    getOrCreate(uuid) {
        return this.#loaders.getOrCreate(uuid, uuid => new DefaultSoundfontLoader(this, uuid));
    }
    invalidate(uuid) { this.#loaders.opt(uuid).ifSome(loader => loader.invalidate()); }
}
