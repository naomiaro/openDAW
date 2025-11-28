import { CloudService } from "./CloudService";
import { CloudHandler } from "./CloudHandler";
import { CloudAuthManager } from "./CloudAuthManager";
export declare namespace CloudBackup {
    const backup: (cloudAuthManager: CloudAuthManager, service: CloudService) => Promise<void>;
    const backupWithHandler: (cloudHandler: CloudHandler, service: CloudService) => Promise<undefined>;
}
//# sourceMappingURL=CloudBackup.d.ts.map