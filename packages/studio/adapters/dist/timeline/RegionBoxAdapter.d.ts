import { LoopableRegion, ppqn, Region } from "@opendaw/lib-dsp";
import { Comparator, int, Maybe, Observer, Option, Selectable, Subscription } from "@opendaw/lib-std";
import { AudioRegionBoxAdapter } from "./region/AudioRegionBoxAdapter";
import { Box, Field } from "@opendaw/lib-box";
import { NoteRegionBoxAdapter } from "./region/NoteRegionBoxAdapter";
import { Pointers } from "@opendaw/studio-enums";
import { ValueRegionBoxAdapter } from "./region/ValueRegionBoxAdapter";
import { AnyRegionBox } from "../unions";
import { BoxAdapter } from "../BoxAdapter";
import { TrackBoxAdapter } from "./TrackBoxAdapter";
import { AnyRegionBoxAdapter } from "../UnionAdapterTypes";
import { BoxAdapters } from "../BoxAdapters";
export interface RegionBoxAdapterVisitor<R> {
    visitNoteRegionBoxAdapter?(adapter: NoteRegionBoxAdapter): R;
    visitAudioRegionBoxAdapter?(adapter: AudioRegionBoxAdapter): R;
    visitValueRegionBoxAdapter?(adapter: ValueRegionBoxAdapter): R;
}
export interface RegionBoxAdapter<CONTENT> extends BoxAdapter, Region, Selectable {
    get box(): AnyRegionBox;
    get isSelected(): boolean;
    get hue(): int;
    get mute(): boolean;
    get label(): string;
    get isMirrowed(): boolean;
    get canMirror(): boolean;
    get trackBoxAdapter(): Option<TrackBoxAdapter>;
    get hasCollection(): boolean;
    get optCollection(): Option<CONTENT>;
    subscribeChange(observer: Observer<void>): Subscription;
    copyTo(target?: {
        track?: Field<Pointers.RegionCollection>;
        position?: ppqn;
    }): AnyRegionBoxAdapter;
    consolidate(): void;
    flatten(regions: ReadonlyArray<RegionBoxAdapter<unknown>>): void;
    canFlatten(regions: ReadonlyArray<RegionBoxAdapter<unknown>>): boolean;
    accept<VISITOR extends RegionBoxAdapterVisitor<any>>(visitor: VISITOR): VISITOR extends RegionBoxAdapterVisitor<infer R> ? Maybe<R> : void;
}
export interface LoopableRegionBoxAdapter<CONTENT> extends RegionBoxAdapter<CONTENT>, LoopableRegion {
    get offset(): ppqn;
    get loopOffset(): ppqn;
    get loopDuration(): ppqn;
}
export declare const RegionComparator: Comparator<AnyRegionBoxAdapter>;
export declare const RegionAdapters: {
    for: (boxAdapters: BoxAdapters, box: Box) => AnyRegionBoxAdapter;
};
//# sourceMappingURL=RegionBoxAdapter.d.ts.map