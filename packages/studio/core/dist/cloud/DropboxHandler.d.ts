import { CloudHandler } from "./CloudHandler";
export declare class DropboxHandler implements CloudHandler {
    #private;
    constructor(accessToken: string);
    alive(): Promise<void>;
    upload(path: string, buffer: ArrayBuffer): Promise<void>;
    download(path: string): Promise<ArrayBuffer>;
    exists(path: string): Promise<boolean>;
    list(path?: string): Promise<Array<string>>;
    delete(path: string): Promise<void>;
}
//# sourceMappingURL=DropboxHandler.d.ts.map