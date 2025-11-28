import { AudioRegionBoxAdapter } from "./timeline/region/AudioRegionBoxAdapter";
import { NoteRegionBoxAdapter } from "./timeline/region/NoteRegionBoxAdapter";
import { ValueRegionBoxAdapter } from "./timeline/region/ValueRegionBoxAdapter";
import { NoteClipBoxAdapter } from "./timeline/clip/NoteClipBoxAdapter";
import { ValueClipBoxAdapter } from "./timeline/clip/ValueClipBoxAdapter";
import { AudioClipBoxAdapter } from "./timeline/clip/AudioClipBoxAdapter";
import { BoxAdapter } from "./BoxAdapter";
export type AnyClipBoxAdapter = NoteClipBoxAdapter | ValueClipBoxAdapter | AudioClipBoxAdapter;
export type AnyRegionBoxAdapter = NoteRegionBoxAdapter | ValueRegionBoxAdapter | AudioRegionBoxAdapter;
export type AnyLoopableRegionBoxAdapter = AnyRegionBoxAdapter;
export declare const UnionAdapterTypes: {
    isRegion: (adapter: BoxAdapter) => adapter is AnyRegionBoxAdapter;
    isLoopableRegion: (adapter: BoxAdapter) => adapter is AnyLoopableRegionBoxAdapter;
};
//# sourceMappingURL=UnionAdapterTypes.d.ts.map