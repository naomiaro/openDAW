import {Progress, SortedSet, UUID} from "@naomiarotest/lib-std"
import {DefaultSampleLoader} from "./DefaultSampleLoader"
import {SampleProvider} from "./SampleProvider"
import {AudioData, SampleLoader, SampleLoaderManager, SampleMetaData} from "@naomiarotest/studio-adapters"

export class DefaultSampleLoaderManager implements SampleLoaderManager, SampleProvider {
    readonly #provider: SampleProvider
    readonly #loaders: SortedSet<UUID.Bytes, SampleLoader>

    constructor(provider: SampleProvider) {
        this.#provider = provider
        this.#loaders = UUID.newSet(loader => loader.uuid)
    }

    fetch(uuid: UUID.Bytes, progress: Progress.Handler): Promise<[AudioData, SampleMetaData]> {
        return this.#provider.fetch(uuid, progress)
    }

    remove(uuid: UUID.Bytes) {this.#loaders.removeByKey(uuid)}
    invalidate(uuid: UUID.Bytes) {this.#loaders.opt(uuid).ifSome(loader => loader.invalidate())}

    record(loader: SampleLoader): void {this.#loaders.add(loader)}

    getOrCreate(uuid: UUID.Bytes): SampleLoader {
        return this.#loaders.getOrCreate(uuid, uuid => new DefaultSampleLoader(this, uuid))
    }
}