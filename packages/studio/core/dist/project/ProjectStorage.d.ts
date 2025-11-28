import { Class, Option, Progress, UUID } from "@opendaw/lib-std";
import { AudioFileBox, SoundfontFileBox } from "@opendaw/studio-boxes";
import { ProjectMeta } from "./ProjectMeta";
export declare namespace ProjectStorage {
    type ListEntry = {
        uuid: UUID.Bytes;
        meta: ProjectMeta;
        cover?: ArrayBuffer;
        project?: ArrayBuffer;
    };
    type List = ReadonlyArray<ListEntry>;
    const listProjects: ({ includeCover, includeProject, progress }?: {
        includeCover?: boolean;
        includeProject?: boolean;
        progress?: Progress.Handler;
    }) => Promise<List>;
    const loadProject: (uuid: UUID.Bytes) => Promise<ArrayBuffer>;
    const loadMeta: (uuid: UUID.Bytes) => Promise<ArrayBuffer>;
    const loadCover: (uuid: UUID.Bytes) => Promise<Option<ArrayBuffer>>;
    const listUsedAssets: (type: Class<AudioFileBox | SoundfontFileBox>) => Promise<Set<string>>;
    const deleteProject: (uuid: UUID.Bytes) => Promise<void>;
    const loadTrashedIds: () => Promise<Array<UUID.String>>;
}
//# sourceMappingURL=ProjectStorage.d.ts.map