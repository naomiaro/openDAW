import { RegionCollection } from "@opendaw/lib-dsp";
import { Observer, SortedSet, Subscription } from "@opendaw/lib-std";
import { TrackBoxAdapter } from "./TrackBoxAdapter";
import { AnyRegionBoxAdapter } from "../UnionAdapterTypes";
import { BoxAdapters } from "../BoxAdapters";
export interface TrackRegionsListener {
    onAdded(region: AnyRegionBoxAdapter): void;
    onRemoved(region: AnyRegionBoxAdapter): void;
}
export declare class TrackRegions {
    #private;
    constructor(adapter: TrackBoxAdapter, boxAdapters: BoxAdapters);
    get trackBoxAdapter(): TrackBoxAdapter;
    get collection(): RegionCollection<AnyRegionBoxAdapter>;
    get adapters(): SortedSet<Readonly<Uint8Array>, AnyRegionBoxAdapter>;
    onIndexingChanged(): void;
    catchupAndSubscribe(listener: TrackRegionsListener): Subscription;
    subscribeChanges(observer: Observer<void>): Subscription;
    dispatchChange(): void;
    terminate(): void;
}
//# sourceMappingURL=TrackRegions.d.ts.map