import { Pointers } from "@opendaw/studio-enums";
import { Observer, Subscription, Terminable } from "@opendaw/lib-std";
import { TrackBoxAdapter } from "./TrackBoxAdapter";
import { IndexedBoxAdapterCollection } from "../IndexedBoxAdapterCollection";
import { AnyClipBoxAdapter } from "../UnionAdapterTypes";
import { BoxAdapters } from "../BoxAdapters";
export declare class TrackClips implements Terminable {
    #private;
    constructor(adapter: TrackBoxAdapter, boxAdapters: BoxAdapters);
    get trackBoxAdapter(): TrackBoxAdapter;
    get collection(): IndexedBoxAdapterCollection<AnyClipBoxAdapter, Pointers.ClipCollection>;
    dispatchChange(): void;
    subscribeChanges(observer: Observer<void>): Subscription;
    terminate(): void;
}
//# sourceMappingURL=TrackClips.d.ts.map