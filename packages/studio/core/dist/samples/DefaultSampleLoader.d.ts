import { Observer, Option, Subscription, UUID } from "@opendaw/lib-std";
import { Peaks } from "@opendaw/lib-fusion";
import { AudioData, SampleLoader, SampleLoaderState, SampleMetaData } from "@opendaw/studio-adapters";
import { DefaultSampleLoaderManager } from "./DefaultSampleLoaderManager";
export declare class DefaultSampleLoader implements SampleLoader {
    #private;
    constructor(manager: DefaultSampleLoaderManager, uuid: UUID.Bytes);
    invalidate(): void;
    subscribe(observer: Observer<SampleLoaderState>): Subscription;
    get uuid(): UUID.Bytes;
    get data(): Option<AudioData>;
    get meta(): Option<SampleMetaData>;
    get peaks(): Option<Peaks>;
    get state(): SampleLoaderState;
    toString(): string;
}
//# sourceMappingURL=DefaultSampleLoader.d.ts.map