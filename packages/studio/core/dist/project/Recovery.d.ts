import { Option, Provider } from "@opendaw/lib-std";
import { ProjectEnv, ProjectProfile } from "../";
export declare class Recovery {
    #private;
    constructor(projectProfileService: Provider<Option<ProjectProfile>>, env: ProjectEnv);
    restoreProfile(): Promise<Option<ProjectProfile>>;
    createBackupCommand(): Option<Provider<Promise<void>>>;
}
//# sourceMappingURL=Recovery.d.ts.map