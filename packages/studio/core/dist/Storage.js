import { UUID } from "@opendaw/lib-std";
import { Workers } from "./Workers";
import { Promises } from "@opendaw/lib-runtime";
export class Storage {
    folder;
    constructor(folder) {
        this.folder = folder;
    }
    async deleteItem(uuid) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        const uuids = await this.loadTrashedIds();
        uuids.push(UUID.toString(uuid));
        await this.saveTrashedIds(uuids);
        await Workers.Opfs.delete(path);
    }
    async loadTrashedIds() {
        const { status, value } = await Promises.tryCatch(Workers.Opfs.read(`${this.folder}/trash.json`));
        return status === "rejected" ? [] : JSON.parse(new TextDecoder().decode(value));
    }
    async saveTrashedIds(ids) {
        const trash = new TextEncoder().encode(JSON.stringify(ids));
        await Workers.Opfs.write(`${this.folder}/trash.json`, trash);
    }
    async list() {
        return Workers.Opfs.list(this.folder)
            .then(files => Promise.all(files.filter(file => file.kind === "directory")
            .map(async ({ name }) => {
            const array = await Workers.Opfs.read(`${this.folder}/${name}/meta.json`);
            return { uuid: name, ...JSON.parse(new TextDecoder().decode(array)) };
        })), () => []);
    }
}
