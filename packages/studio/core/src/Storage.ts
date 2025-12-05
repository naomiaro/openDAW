import {UUID} from "@naomiarotest/lib-std"
import {Workers} from "./Workers"
import {Promises} from "@naomiarotest/lib-runtime"

export abstract class Storage<ITEM extends { uuid: UUID.String } & META, META, NEW, PARTS> {
    protected constructor(readonly folder: string) {}

    abstract save(item: NEW): Promise<void>
    abstract load(uuid: UUID.Bytes): Promise<PARTS>

    async deleteItem(uuid: UUID.Bytes): Promise<void> {
        const path = `${this.folder}/${UUID.toString(uuid)}`
        const uuids = await this.loadTrashedIds()
        uuids.push(UUID.toString(uuid))
        await this.saveTrashedIds(uuids)
        await Workers.Opfs.delete(path)
    }

    async loadTrashedIds(): Promise<Array<UUID.String>> {
        const {status, value} = await Promises.tryCatch(Workers.Opfs.read(`${this.folder}/trash.json`))
        return status === "rejected" ? [] : JSON.parse(new TextDecoder().decode(value))
    }

    async saveTrashedIds(ids: ReadonlyArray<UUID.String>): Promise<void> {
        const trash = new TextEncoder().encode(JSON.stringify(ids))
        await Workers.Opfs.write(`${this.folder}/trash.json`, trash)
    }

    async list(): Promise<ReadonlyArray<ITEM>> {
        return Workers.Opfs.list(this.folder)
            .then(files => Promise.all(files.filter(file => file.kind === "directory")
                .map(async ({name}) => {
                    const array = await Workers.Opfs.read(`${this.folder}/${name}/meta.json`)
                    return {uuid: name as UUID.String, ...JSON.parse(new TextDecoder().decode(array))}
                })), () => [])
    }
}