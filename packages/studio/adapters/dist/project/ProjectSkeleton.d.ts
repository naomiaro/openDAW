import { BoxGraph } from "@opendaw/lib-box";
import { BoxIO } from "@opendaw/studio-boxes";
import { ProjectMandatoryBoxes } from "./ProjectMandatoryBoxes";
export type ProjectSkeleton = {
    boxGraph: BoxGraph<BoxIO.TypeMap>;
    mandatoryBoxes: ProjectMandatoryBoxes;
};
export declare namespace ProjectSkeleton {
    const empty: (options: {
        createOutputCompressor: boolean;
        createDefaultUser: boolean;
    }) => ProjectSkeleton;
    const encode: (boxGraph: BoxGraph) => ArrayBufferLike;
    const decode: (arrayBuffer: ArrayBufferLike) => ProjectSkeleton;
    const findMandatoryBoxes: (boxGraph: BoxGraph) => ProjectMandatoryBoxes;
}
//# sourceMappingURL=ProjectSkeleton.d.ts.map