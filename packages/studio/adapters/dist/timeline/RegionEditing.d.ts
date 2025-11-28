import { ppqn } from "@opendaw/lib-dsp";
import { AnyRegionBoxAdapter } from "../UnionAdapterTypes";
export declare namespace RegionEditing {
    const cut: (region: AnyRegionBoxAdapter, cut: ppqn, consolidate: boolean) => void;
    const clip: (region: AnyRegionBoxAdapter, begin: ppqn, end: ppqn) => void;
}
//# sourceMappingURL=RegionEditing.d.ts.map