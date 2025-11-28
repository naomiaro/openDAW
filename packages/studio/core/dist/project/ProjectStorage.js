import { Option, safeExecute, tryCatch, UUID } from "@opendaw/lib-std";
import { ProjectSkeleton } from "@opendaw/studio-adapters";
import { Promises } from "@opendaw/lib-runtime";
import { Workers } from "../Workers";
import { ProjectPaths } from "./ProjectPaths";
export var ProjectStorage;
(function (ProjectStorage) {
    ProjectStorage.listProjects = async ({ includeCover, includeProject, progress } = {}) => {
        return Workers.Opfs.list(ProjectPaths.Folder)
            .then(files => Promise.all(files.filter(file => file.kind === "directory")
            .map(async ({ name }, index, { length }) => {
            safeExecute(progress, (index + 1) / length);
            const uuid = UUID.parse(name);
            const array = await Workers.Opfs.read(ProjectPaths.projectMeta(uuid));
            return {
                uuid,
                meta: JSON.parse(new TextDecoder().decode(array)),
                cover: includeCover ? (await ProjectStorage.loadCover(uuid)).unwrapOrUndefined() : undefined,
                project: includeProject ? await ProjectStorage.loadProject(uuid) : undefined
            };
        })));
    };
    ProjectStorage.loadProject = async (uuid) => {
        return Workers.Opfs.read(ProjectPaths.projectFile(uuid)).then(array => array.buffer);
    };
    ProjectStorage.loadMeta = async (uuid) => {
        return Workers.Opfs.read(ProjectPaths.projectMeta(uuid)).then(array => array.buffer);
    };
    ProjectStorage.loadCover = async (uuid) => {
        return Workers.Opfs.read(ProjectPaths.projectCover(uuid))
            .then(array => Option.wrap(array.buffer), () => Option.None);
    };
    ProjectStorage.listUsedAssets = async (type) => {
        const uuids = [];
        const files = await Workers.Opfs.list(ProjectPaths.Folder);
        for (const { name } of files.filter(file => file.kind === "directory")) {
            const result = await Workers.Opfs.read(ProjectPaths.projectFile(UUID.parse(name)));
            tryCatch(() => {
                const { boxGraph } = ProjectSkeleton.decode(result.buffer);
                uuids.push(...boxGraph.boxes()
                    .filter(box => box instanceof type)
                    .map((box) => UUID.toString(box.address.uuid)));
            });
        }
        return new Set(uuids);
    };
    ProjectStorage.deleteProject = async (uuid) => {
        const array = await ProjectStorage.loadTrashedIds();
        array.push(UUID.toString(uuid));
        const trash = new TextEncoder().encode(JSON.stringify(array));
        await Workers.Opfs.write(`${ProjectPaths.Folder}/trash.json`, trash);
        await Workers.Opfs.delete(ProjectPaths.projectFolder(uuid));
    };
    ProjectStorage.loadTrashedIds = async () => {
        const { status, value } = await Promises.tryCatch(Workers.Opfs.read(`${ProjectPaths.Folder}/trash.json`));
        return status === "rejected" ? [] : JSON.parse(new TextDecoder().decode(value));
    };
})(ProjectStorage || (ProjectStorage = {}));
