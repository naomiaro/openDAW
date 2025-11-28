import { Arrays, ByteArrayOutput } from "@opendaw/lib-std";
import { ProjectSkeleton } from "../project/ProjectSkeleton";
import { ProjectUtils } from "../project/ProjectUtils";
import { PresetHeader } from "./PresetHeader";
export var PresetEncoder;
(function (PresetEncoder) {
    PresetEncoder.encode = (audioUnitBox) => {
        const header = ByteArrayOutput.create();
        header.writeInt(PresetHeader.MAGIC_HEADER_OPEN);
        header.writeInt(PresetHeader.FORMAT_VERSION);
        const preset = ProjectSkeleton.empty({ createOutputCompressor: false, createDefaultUser: false });
        preset.boxGraph.beginTransaction();
        ProjectUtils.extractAudioUnits([audioUnitBox], preset, { excludeTimeline: true });
        preset.boxGraph.endTransaction();
        console.debug("SAVING...");
        preset.boxGraph.debugBoxes();
        return Arrays.concatArrayBuffers(header.toArrayBuffer(), preset.boxGraph.toArrayBuffer());
    };
})(PresetEncoder || (PresetEncoder = {}));
