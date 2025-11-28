import { AudioUnitType, IconSymbol } from "@opendaw/studio-enums";
import { AudioBusBox } from "@opendaw/studio-boxes";
import { Color } from "@opendaw/lib-std";
import { ProjectSkeleton } from "../project/ProjectSkeleton";
export declare namespace AudioBusFactory {
    const create: (skeleton: ProjectSkeleton, name: string, icon: IconSymbol, type: AudioUnitType, color: Color) => AudioBusBox;
}
//# sourceMappingURL=AudioBusFactory.d.ts.map