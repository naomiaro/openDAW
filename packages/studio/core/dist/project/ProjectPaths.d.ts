import { UUID } from "@opendaw/lib-std";
export declare namespace ProjectPaths {
    const Folder = "projects/v1";
    const ProjectFile = "project.od";
    const ProjectMetaFile = "meta.json";
    const ProjectCoverFile = "image.bin";
    const projectFile: (uuid: UUID.Bytes) => string;
    const projectMeta: (uuid: UUID.Bytes) => string;
    const projectCover: (uuid: UUID.Bytes) => string;
    const projectFolder: (uuid: UUID.Bytes) => string;
}
//# sourceMappingURL=ProjectPaths.d.ts.map