import { EmptyExec, Notifier, Option, UUID } from "@opendaw/lib-std";
import { ProjectMeta } from "./ProjectMeta";
import { Workers } from "../Workers";
import { ProjectPaths } from "./ProjectPaths";
export class ProjectProfile {
    #uuid;
    #project;
    #meta;
    #cover;
    #metaUpdated;
    #saved;
    #hasChanges = false;
    constructor(uuid, project, meta, cover, hasBeenSaved = false) {
        this.#uuid = uuid;
        this.#project = project;
        this.#meta = meta;
        this.#cover = cover;
        this.#saved = hasBeenSaved;
        this.#metaUpdated = new Notifier();
    }
    get uuid() { return this.#uuid; }
    get project() { return this.#project; }
    get meta() { return this.#meta; }
    get cover() { return this.#cover; }
    async save() {
        this.updateModifyDate();
        return this.#saved
            ? ProjectProfile.#writeFiles(this).then(() => { this.#hasChanges = false; })
            : Promise.reject("Project has not been saved");
    }
    async saveAs(meta) {
        Object.assign(this.meta, meta);
        this.updateModifyDate();
        if (this.#saved) {
            // Copy project
            const uuid = UUID.generate();
            const project = this.project.copy();
            const meta = ProjectMeta.copy(this.meta);
            const profile = new ProjectProfile(uuid, project, meta, Option.None, true);
            await ProjectProfile.#writeFiles(profile);
            return Option.wrap(profile);
        }
        else {
            return ProjectProfile.#writeFiles(this).then(() => {
                this.#saved = true;
                this.#hasChanges = false;
                this.#metaUpdated.notify(this.meta);
                return Option.None;
            });
        }
    }
    saved() { return this.#saved; }
    hasChanges() { return this.#hasChanges; }
    subscribeMetaData(observer) {
        return this.#metaUpdated.subscribe(observer);
    }
    updateCover(cover) {
        this.#cover = cover;
        this.#hasChanges = true;
    }
    updateMetaData(key, value) {
        if (this.meta[key] === value) {
            return;
        }
        this.meta[key] = value;
        this.#hasChanges = true;
        this.#metaUpdated.notify(this.meta);
    }
    updateModifyDate() { this.meta.modified = new Date().toISOString(); }
    copyForUpload() {
        const meta = ProjectMeta.copy(this.meta);
        delete meta.radioToken; // we do not expose this
        return new ProjectProfile(this.uuid, this.project, meta, this.cover);
    }
    toString() {
        return `{uuid: ${UUID.toString(this.uuid)}, meta: ${JSON.stringify(this.meta)}}`;
    }
    static async #writeFiles({ uuid, project, meta, cover }) {
        return Promise.all([
            Workers.Opfs.write(ProjectPaths.projectFile(uuid), new Uint8Array(project.toArrayBuffer())),
            Workers.Opfs.write(ProjectPaths.projectMeta(uuid), new TextEncoder().encode(JSON.stringify(meta))),
            cover.match({
                none: () => Promise.resolve(),
                some: x => Workers.Opfs.write(ProjectPaths.projectCover(uuid), new Uint8Array(x))
            })
        ]).then(EmptyExec);
    }
}
