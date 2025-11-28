import { int } from "@opendaw/lib-std";
import { Project } from "../project/Project";
import { Commit } from "./Commit";
import { ProjectEnv } from "../project/ProjectEnv";
export declare class SyncLogReader {
    static unwrap(env: ProjectEnv, buffer: ArrayBuffer): Promise<{
        project: Project;
        lastCommit: Commit;
        numCommits: int;
    }>;
}
//# sourceMappingURL=SyncLogReader.d.ts.map