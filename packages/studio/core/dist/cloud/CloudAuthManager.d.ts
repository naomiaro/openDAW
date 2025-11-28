import { CloudService } from "./CloudService";
import { CloudHandler } from "./CloudHandler";
type ClientIds = {
    Dropbox: string;
    GoogleDrive: string;
};
export declare class CloudAuthManager {
    #private;
    static create(clientIds: ClientIds): CloudAuthManager;
    private constructor();
    getHandler(service: CloudService): Promise<CloudHandler>;
}
export {};
//# sourceMappingURL=CloudAuthManager.d.ts.map