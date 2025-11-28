import { Exec, int } from "@opendaw/lib-std";
import { Event, ppqn } from "@opendaw/lib-dsp";
import { AnyRegionBoxAdapter, TrackBoxAdapter } from "@opendaw/studio-adapters";
import { RegionModifyStrategies } from "./RegionModifyStrategies";
export type ClipTask = {
    type: "delete";
    region: AnyRegionBoxAdapter;
} | {
    type: "separate";
    region: AnyRegionBoxAdapter;
    begin: ppqn;
    end: ppqn;
} | {
    type: "start";
    region: AnyRegionBoxAdapter;
    position: ppqn;
} | {
    type: "complete";
    region: AnyRegionBoxAdapter;
    position: ppqn;
};
interface Mask extends Event {
    complete: ppqn;
}
export declare class RegionClipResolver {
    #private;
    static fromSelection(tracks: ReadonlyArray<TrackBoxAdapter>, adapters: ReadonlyArray<AnyRegionBoxAdapter>, strategy: RegionModifyStrategies, deltaIndex?: int): Exec;
    static fromRange(track: TrackBoxAdapter, position: ppqn, complete: ppqn): Exec;
    static validateTracks(tracks: ReadonlyArray<TrackBoxAdapter>): void;
    static validateTrack(track: TrackBoxAdapter): void;
    static sortAndJoinMasks(masks: ReadonlyArray<Mask>): ReadonlyArray<Mask>;
    constructor(strategy: RegionModifyStrategies, ground: TrackBoxAdapter);
    addMask(region: AnyRegionBoxAdapter): void;
    addMaskRange(position: ppqn, complete: ppqn): void;
}
export {};
//# sourceMappingURL=RegionClipResolver.d.ts.map