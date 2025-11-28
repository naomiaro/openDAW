import { asDefined, isDefined, panic, UUID } from "@opendaw/lib-std";
import { Xml } from "@opendaw/lib-xml";
import { FileReferenceSchema, MetaDataSchema, ProjectSchema } from "@opendaw/lib-dawproject";
import { DawProjectExporter } from "./DawProjectExporter";
import { ExternalLib } from "../ExternalLib";
export var DawProject;
(function (DawProject) {
    DawProject.decode = async (buffer) => {
        const JSZip = await ExternalLib.JSZip();
        const zip = await JSZip.loadAsync(buffer);
        const metaDataXml = await zip.file("metadata.xml")?.async("string");
        const metaData = isDefined(metaDataXml) ? Xml.parse(metaDataXml, MetaDataSchema) : Xml.element({}, MetaDataSchema);
        const projectXml = asDefined(await zip.file("project.xml")?.async("string"), "No project.xml found");
        console.debug(projectXml);
        const project = Xml.parse(projectXml, ProjectSchema);
        const resourceFiles = Object.entries(zip.files).filter(([_, file]) => !file.dir && !file.name.endsWith(".xml"));
        const resources = await Promise.all(resourceFiles.map(async ([path, file]) => {
            const name = path.substring(path.lastIndexOf("/") + 1);
            const buffer = await file.async("arraybuffer");
            const uuid = await UUID.sha256(new Uint8Array(buffer).buffer);
            return { uuid, path, name, buffer };
        }));
        return {
            metaData, project, resources: {
                fromPath: (path) => resources
                    .find(resource => resource.path === path) ?? panic("Resource not found"),
                fromUUID: (uuid) => resources
                    .find(resource => UUID.equals(resource.uuid, uuid)) ?? panic("Resource not found")
            }
        };
    };
    DawProject.encode = async (skeleton, sampleManager, metaData) => {
        const JSZip = await ExternalLib.JSZip();
        const zip = new JSZip();
        const projectSchema = DawProjectExporter.write(skeleton, sampleManager, {
            write: (path, buffer) => {
                zip.file(path, buffer);
                return Xml.element({ path, external: false }, FileReferenceSchema);
            }
        });
        const metaDataXml = Xml.pretty(Xml.toElement("MetaData", metaData));
        const projectXml = Xml.pretty(Xml.toElement("Project", projectSchema));
        console.debug("encode");
        console.debug(metaDataXml);
        console.debug(projectXml);
        zip.file("metadata.xml", metaDataXml);
        zip.file("project.xml", projectXml);
        return zip.generateAsync({ type: "arraybuffer" });
    };
})(DawProject || (DawProject = {}));
