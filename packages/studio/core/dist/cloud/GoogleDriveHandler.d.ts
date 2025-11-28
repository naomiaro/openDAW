import { CloudHandler } from "./CloudHandler";
export declare class GoogleDriveHandler implements CloudHandler {
    #private;
    constructor(accessToken: string);
    alive(): Promise<void>;
    upload(path: string, data: ArrayBuffer): Promise<void>;
    download(path: string): Promise<ArrayBuffer>;
    exists(path: string): Promise<boolean>;
    list(path?: string): Promise<string[]>;
    delete(path: string): Promise<void>;
}
//# sourceMappingURL=GoogleDriveHandler.d.ts.map