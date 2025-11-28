export var ExportStemsConfiguration;
(function (ExportStemsConfiguration) {
    ExportStemsConfiguration.countStems = (config) => config.match({
        none: () => 1,
        some: (configuration) => Object.keys(configuration).length
    });
    ExportStemsConfiguration.sanitizeFileName = (name) => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").trim();
    ExportStemsConfiguration.sanitizeExportNamesInPlace = (configuration) => {
        const sanitizedNames = new Map();
        const getUniqueName = (baseName) => {
            let count = sanitizedNames.get(baseName) ?? 0;
            let newName = baseName;
            while (sanitizedNames.has(newName)) {
                count++;
                newName = `${baseName} ${count}`;
            }
            sanitizedNames.set(baseName, count);
            sanitizedNames.set(newName, 1);
            return newName;
        };
        Object.keys(configuration).forEach((key) => {
            const entry = configuration[key];
            entry.fileName = getUniqueName(ExportStemsConfiguration.sanitizeFileName(entry.fileName));
        });
    };
})(ExportStemsConfiguration || (ExportStemsConfiguration = {}));
