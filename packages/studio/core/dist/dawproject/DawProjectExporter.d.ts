import { FileReferenceSchema, ProjectSchema } from "@opendaw/lib-dawproject";
import { ProjectSkeleton, SampleLoaderManager } from "@opendaw/studio-adapters";
export declare namespace DawProjectExporter {
    interface ResourcePacker {
        write(path: string, buffer: ArrayBufferLike): FileReferenceSchema;
    }
    const write: (skeleton: ProjectSkeleton, sampleManager: SampleLoaderManager, resourcePacker: ResourcePacker) => ProjectSchema;
}
//# sourceMappingURL=DawProjectExporter.d.ts.map