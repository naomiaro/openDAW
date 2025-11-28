import { Errors, isDefined, Option, panic } from "@opendaw/lib-std";
import { Promises } from "@opendaw/lib-runtime";
export class DropboxHandler {
    #accessToken;
    #dropboxClient = Option.None;
    constructor(accessToken) { this.#accessToken = accessToken; }
    async alive() {
        const client = await this.#ensureClient();
        const { status, error } = await Promises.tryCatch(client.usersGetCurrentAccount());
        if (status === "rejected")
            return panic(error);
    }
    async upload(path, buffer) {
        const client = await this.#ensureClient();
        const fullPath = this.#getFullPath(path);
        console.debug("[Dropbox] Uploading to:", fullPath);
        const { status, error, value: result } = await Promises.tryCatch(client
            .filesUpload({ path: fullPath, contents: buffer, mode: { ".tag": "overwrite" } }));
        if (status === "rejected") {
            return panic(error);
        }
        else {
            console.debug("[Dropbox] Upload successful:", result.result.path_display);
        }
    }
    async download(path) {
        const client = await this.#ensureClient();
        const fullPath = this.#getFullPath(path);
        try {
            const response = await client.filesDownload({ path: fullPath });
            const { result: { fileBlob } } = response;
            return fileBlob.arrayBuffer();
        }
        catch (error) {
            if (this.#isNotFoundError(error)) {
                throw new Errors.FileNotFound(path);
            }
            throw error;
        }
    }
    async exists(path) {
        const client = await this.#ensureClient();
        const fullPath = this.#getFullPath(path);
        const { status, error } = await Promises.tryCatch(client.filesGetMetadata({ path: fullPath })).catch(error => error);
        if (status === "resolved")
            return true;
        return this.#isNotFoundError(error) ? false : panic(error);
    }
    async list(path) {
        const client = await this.#ensureClient();
        const fullPath = path ? this.#getFullPath(path) : "";
        const response = await client.filesListFolder({ path: fullPath });
        return response.result.entries.map(entry => entry.name).filter(isDefined);
    }
    async delete(path) {
        const client = await this.#ensureClient();
        const fullPath = this.#getFullPath(path);
        await client.filesDeleteV2({ path: fullPath });
    }
    async #ensureClient() {
        if (this.#dropboxClient.isEmpty()) {
            const DropboxModule = await import("dropbox");
            this.#dropboxClient = Option.wrap(new DropboxModule.Dropbox({ accessToken: this.#accessToken }));
        }
        return this.#dropboxClient.unwrap();
    }
    #getFullPath(path) {
        if (path.includes(":") || path.includes("T")) {
            const filename = path.replace(/:/g, "-");
            return filename.startsWith("/") ? filename : `/${filename}`;
        }
        return path.startsWith("/") ? path : `/${path}`;
    }
    #isNotFoundError(error) {
        return (typeof error === "object" &&
            error !== null &&
            "status" in error &&
            error.status === 409 &&
            error.error?.error?.[".tag"] === "path" &&
            error.error?.error?.path?.[".tag"] === "not_found");
    }
}
