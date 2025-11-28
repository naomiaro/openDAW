import { Communicator, Messenger } from "@opendaw/lib-runtime";
import { OpfsProtocol } from "./OpfsProtocol";
import "../types";
export declare namespace OpfsWorker {
    const init: (messenger: Messenger) => Communicator.Executor<{
        readonly "__#private@#locks": Map<string, Promise<void>>;
        write(path: string, data: Uint8Array): Promise<void>;
        read(path: string): Promise<Uint8Array>;
        delete(path: string): Promise<void>;
        list(path: string): Promise<ReadonlyArray<OpfsProtocol.Entry>>;
        clear(): Promise<void>;
        "__#private@#acquireLock"<T>(path: string, operation: () => Promise<T>): Promise<T>;
        "__#private@#resolveFile"(path: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemSyncAccessHandle>;
        "__#private@#resolveFolder"(segments: ReadonlyArray<string>, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
    }>;
}
//# sourceMappingURL=OpfsWorker.d.ts.map