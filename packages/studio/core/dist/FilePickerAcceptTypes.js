export var FilePickerAcceptTypes;
(function (FilePickerAcceptTypes) {
    FilePickerAcceptTypes.WavFiles = {
        types: [{
                description: "wav-file",
                accept: { "audio/wav": [".wav"] }
            }]
    };
    FilePickerAcceptTypes.SoundfontFiles = {
        types: [{
                description: "soundfont-file",
                accept: { "audio/x-soundfont": [".sf2"] }
            }]
    };
    FilePickerAcceptTypes.ProjectSyncLog = {
        types: [{
                description: "openDAW sync-log-file",
                accept: { "application/octet-stream": [".odsl"] }
            }]
    };
    FilePickerAcceptTypes.ProjectFileType = {
        description: "openDAW project",
        accept: { "application/octet-stream": [".od"] }
    };
    FilePickerAcceptTypes.PresetFileType = {
        description: "openDAW preset",
        accept: { "application/octet-stream": [".odp"] }
    };
    FilePickerAcceptTypes.ProjectBundleFileType = {
        description: "openDAW project bundle",
        accept: { "application/octet-stream": [".odb"] }
    };
    FilePickerAcceptTypes.DawprojectFileType = {
        description: "dawproject",
        accept: { "application/octet-stream": [".dawproject"] }
    };
    FilePickerAcceptTypes.JsonFileType = {
        description: "json",
        accept: { "application/json": [".json"] }
    };
})(FilePickerAcceptTypes || (FilePickerAcceptTypes = {}));
