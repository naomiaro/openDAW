import { UUID } from "@opendaw/lib-std";
import { ProjectSchema } from "@opendaw/lib-dawproject";
import { ProjectSkeleton } from "@opendaw/studio-adapters";
import { DawProject } from "./DawProject";
export declare namespace DawProjectImport {
    type Result = {
        audioIds: ReadonlyArray<UUID.Bytes>;
        skeleton: ProjectSkeleton;
    };
    const read: (schema: ProjectSchema, resources: DawProject.ResourceProvider) => Promise<Result>;
}
//# sourceMappingURL=DawProjectImporter.d.ts.map