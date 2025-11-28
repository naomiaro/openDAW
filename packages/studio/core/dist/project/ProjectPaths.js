import { UUID } from "@opendaw/lib-std";
export var ProjectPaths;
(function (ProjectPaths) {
    ProjectPaths.Folder = "projects/v1";
    ProjectPaths.ProjectFile = "project.od";
    ProjectPaths.ProjectMetaFile = "meta.json";
    ProjectPaths.ProjectCoverFile = "image.bin";
    ProjectPaths.projectFile = (uuid) => `${(ProjectPaths.projectFolder(uuid))}/${ProjectPaths.ProjectFile}`;
    ProjectPaths.projectMeta = (uuid) => `${(ProjectPaths.projectFolder(uuid))}/${ProjectPaths.ProjectMetaFile}`;
    ProjectPaths.projectCover = (uuid) => `${(ProjectPaths.projectFolder(uuid))}/${ProjectPaths.ProjectCoverFile}`;
    ProjectPaths.projectFolder = (uuid) => `${ProjectPaths.Folder}/${UUID.toString(uuid)}`;
})(ProjectPaths || (ProjectPaths = {}));
