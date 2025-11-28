import { UnionBoxTypes } from "./unions";
export const UnionAdapterTypes = {
    isRegion: (adapter) => UnionBoxTypes.isRegionBox(adapter.box),
    isLoopableRegion: (adapter) => UnionBoxTypes.isLoopableRegionBox(adapter.box)
};
