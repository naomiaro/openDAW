import { Progress, UUID } from "@opendaw/lib-std";
import { ProjectEnv } from "./ProjectEnv";
import { ProjectProfile } from "./ProjectProfile";
export declare namespace ProjectBundle {
    const encode: ({ uuid, project, meta, cover }: ProjectProfile, progress: Progress.Handler) => Promise<ArrayBuffer>;
    const decode: (env: ProjectEnv, arrayBuffer: ArrayBuffer, openProfileUUID?: UUID.Bytes) => Promise<ProjectProfile>;
}
//# sourceMappingURL=ProjectBundle.d.ts.map