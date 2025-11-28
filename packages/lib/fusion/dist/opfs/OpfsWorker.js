import { Arrays, asDefined, isNotUndefined, panic } from "@opendaw/lib-std";
import { Communicator, Promises } from "@opendaw/lib-runtime";
import "../types";
export var OpfsWorker;
(function (OpfsWorker) {
    const DEBUG = false;
    OpfsWorker.init = (messenger) => Communicator.executor(messenger.channel("opfs"), new class {
        #locks = new Map();
        async write(path, data) {
            await this.#acquireLock(path, async () => {
                if (DEBUG) {
                    console.debug(`write ${data.length}b to ${path}`);
                }
                const handle = await this.#resolveFile(path, { create: true });
                try {
                    handle.truncate(data.length);
                    handle.write(data.buffer, { at: 0 });
                    handle.flush();
                }
                finally {
                    handle.close();
                }
            });
        }
        async read(path) {
            return await this.#acquireLock(path, async () => {
                if (DEBUG) {
                    console.debug(`read ${path}`);
                }
                const handle = await this.#resolveFile(path);
                try {
                    const size = handle.getSize();
                    const buffer = new Uint8Array(size);
                    handle.read(buffer);
                    return buffer;
                }
                finally {
                    handle.close();
                }
            });
        }
        async delete(path) {
            await this.#acquireLock(path, async () => {
                const segments = pathToSegments(path);
                if (segments.length === 0) {
                    return this.clear();
                }
                return this.#resolveFolder(segments.slice(0, -1))
                    .then(folder => folder.removeEntry(asDefined(segments.at(-1)), { recursive: true }));
            });
        }
        async list(path) {
            const segments = pathToSegments(path);
            const { status, value: folder } = await Promises.tryCatch(this.#resolveFolder(segments));
            if (status === "rejected") {
                return Arrays.empty();
            }
            const result = [];
            for await (const { name, kind } of folder.values()) {
                result.push({ name, kind });
            }
            return result;
        }
        async clear() {
            const root = await navigator.storage.getDirectory();
            for await (const [name, handle] of root.entries()) {
                if (handle.kind === "file") {
                    await root.removeEntry(name);
                }
                else if (handle.kind === "directory") {
                    await root.removeEntry(name, { recursive: true });
                }
            }
        }
        async #acquireLock(path, operation) {
            while (true) {
                const existingLock = this.#locks.get(path);
                if (isNotUndefined(existingLock)) {
                    await existingLock;
                    continue;
                }
                let releaseLock = () => panic("Lock not acquired");
                const lockPromise = new Promise(resolve => releaseLock = resolve);
                this.#locks.set(path, lockPromise);
                try {
                    return await operation();
                }
                finally {
                    if (this.#locks.get(path) === lockPromise) {
                        this.#locks.delete(path);
                    }
                    releaseLock();
                }
            }
        }
        async #resolveFile(path, options) {
            const segments = pathToSegments(path);
            const folder = await this.#resolveFolder(segments.slice(0, -1), options);
            const fileHandle = await folder.getFileHandle(asDefined(segments.at(-1)), options);
            return await fileHandle.createSyncAccessHandle();
        }
        async #resolveFolder(segments, options) {
            let folder = await navigator.storage.getDirectory();
            for (const segment of segments) {
                folder = await folder.getDirectoryHandle(segment, options);
            }
            return folder;
        }
    });
    const pathToSegments = (path) => {
        const noSlashes = path.replace(/^\/+|\/+$/g, "");
        return noSlashes === "" ? [] : noSlashes.split("/");
    };
})(OpfsWorker || (OpfsWorker = {}));
