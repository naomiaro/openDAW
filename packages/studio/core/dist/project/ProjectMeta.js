export var ProjectMeta;
(function (ProjectMeta) {
    const created = new Date().toISOString();
    ProjectMeta.init = (name = "Untitled") => ({
        artist: "",
        name,
        description: "",
        tags: [],
        created,
        modified: created
    });
    ProjectMeta.copy = (meta) => Object.assign({}, meta);
})(ProjectMeta || (ProjectMeta = {}));
