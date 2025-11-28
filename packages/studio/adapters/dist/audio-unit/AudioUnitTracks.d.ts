import { int, Observer, Option, Subscription, Terminable } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { Vertex } from "@opendaw/lib-box";
import { AudioUnitBoxAdapter } from "./AudioUnitBoxAdapter";
import { IndexedAdapterCollectionListener, IndexedBoxAdapterCollection } from "../IndexedBoxAdapterCollection";
import { TrackBoxAdapter } from "../timeline/TrackBoxAdapter";
import { BoxAdapters } from "../BoxAdapters";
import { TrackType } from "../timeline/TrackType";
export declare class AudioUnitTracks implements Terminable {
    #private;
    constructor(adapter: AudioUnitBoxAdapter, boxAdapters: BoxAdapters);
    create(type: TrackType, target: Vertex<Pointers.Automation | Pointers>, index?: int): void;
    controls(target: Vertex<Pointers.Automation | Pointers>): Option<TrackBoxAdapter>;
    delete(adapter: TrackBoxAdapter): void;
    get collection(): IndexedBoxAdapterCollection<TrackBoxAdapter, Pointers.TrackCollection>;
    values(): ReadonlyArray<TrackBoxAdapter>;
    catchupAndSubscribe(listener: IndexedAdapterCollectionListener<TrackBoxAdapter>): Subscription;
    subscribeAnyChange(observer: Observer<void>): Subscription;
    terminate(): void;
}
//# sourceMappingURL=AudioUnitTracks.d.ts.map