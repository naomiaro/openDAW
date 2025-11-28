import { Procedure, Progress } from "@opendaw/lib-std";
import { CloudHandler } from "./CloudHandler";
export declare class CloudBackupProjects {
    #private;
    static readonly RemotePath = "projects";
    static readonly RemoteCatalogPath: string;
    static start(cloudHandler: CloudHandler, progress: Progress.Handler, log: Procedure<string>): Promise<void>;
    private constructor();
}
//# sourceMappingURL=CloudBackupProjects.d.ts.map