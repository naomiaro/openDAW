import { ppqn } from "@opendaw/lib-dsp";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { AnyRegionBox } from "../unions";
export declare namespace ProjectUtils {
    const extractAudioUnits: (audioUnitBoxes: ReadonlyArray<AudioUnitBox>, { boxGraph, mandatoryBoxes: { primaryAudioBus, rootBox } }: ProjectSkeleton, options?: {
        includeAux?: boolean;
        includeBus?: boolean;
        excludeTimeline?: boolean;
    }) => ReadonlyArray<AudioUnitBox>;
    const extractRegions: (regionBoxes: ReadonlyArray<AnyRegionBox>, { boxGraph, mandatoryBoxes: { primaryAudioBus, rootBox } }: ProjectSkeleton, insertPosition?: ppqn) => void;
}
//# sourceMappingURL=ProjectUtils.d.ts.map