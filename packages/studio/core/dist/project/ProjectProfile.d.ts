import { Observer, Option, Subscription, UUID } from "@opendaw/lib-std";
import { ProjectMeta } from "./ProjectMeta";
import { Project } from "./Project";
export declare class ProjectProfile {
    #private;
    constructor(uuid: UUID.Bytes, project: Project, meta: ProjectMeta, cover: Option<ArrayBuffer>, hasBeenSaved?: boolean);
    get uuid(): UUID.Bytes;
    get project(): Project;
    get meta(): ProjectMeta;
    get cover(): Option<ArrayBuffer>;
    save(): Promise<void>;
    saveAs(meta: ProjectMeta): Promise<Option<ProjectProfile>>;
    saved(): boolean;
    hasChanges(): boolean;
    subscribeMetaData(observer: Observer<ProjectMeta>): Subscription;
    updateCover(cover: Option<ArrayBuffer>): void;
    updateMetaData<KEY extends keyof ProjectMeta>(key: KEY, value: ProjectMeta[KEY]): void;
    updateModifyDate(): void;
    copyForUpload(): ProjectProfile;
    toString(): string;
}
//# sourceMappingURL=ProjectProfile.d.ts.map