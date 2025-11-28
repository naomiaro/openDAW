import { ppqn, RegionCollection } from "@opendaw/lib-dsp";
import { int } from "@opendaw/lib-std";
import { AnyRegionBoxAdapter } from "@opendaw/studio-adapters";
export interface RegionModifyStrategies {
    showOrigin(): boolean;
    selectedModifyStrategy(): RegionModifyStrategy;
    unselectedModifyStrategy(): RegionModifyStrategy;
}
export declare namespace RegionModifyStrategies {
    const Identity: RegionModifyStrategies;
    const IdentityIncludeOrigin: RegionModifyStrategies;
}
export interface RegionModifyStrategy {
    readPosition(region: AnyRegionBoxAdapter): ppqn;
    readComplete(region: AnyRegionBoxAdapter): ppqn;
    readLoopOffset(region: AnyRegionBoxAdapter): ppqn;
    readLoopDuration(region: AnyRegionBoxAdapter): ppqn;
    readMirror(region: AnyRegionBoxAdapter): boolean;
    translateTrackIndex(value: int): int;
    iterateRange<R extends AnyRegionBoxAdapter>(regions: RegionCollection<R>, from: ppqn, to: ppqn): Iterable<R>;
}
export declare namespace RegionModifyStrategy {
    const Identity: RegionModifyStrategy;
}
//# sourceMappingURL=RegionModifyStrategies.d.ts.map