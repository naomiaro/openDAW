import { UUID } from "@opendaw/lib-std";
import { DefaultSampleLoader } from "./DefaultSampleLoader";
export class DefaultSampleLoaderManager {
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
    invalidate(uuid) { this.#loaders.opt(uuid).ifSome(loader => loader.invalidate()); }
    record(loader) { this.#loaders.add(loader); }
    getOrCreate(uuid) {
        return this.#loaders.getOrCreate(uuid, uuid => new DefaultSampleLoader(this, uuid));
    }
}
