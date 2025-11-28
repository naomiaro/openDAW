import { Option, Terminable, UUID } from "@opendaw/lib-std";
import { Project } from "../project";
import { Capture } from "./Capture";
export declare class CaptureDevices implements Terminable {
    #private;
    constructor(project: Project);
    get project(): Project;
    get(uuid: UUID.Bytes): Option<Capture>;
    setArm(subject: Capture, exclusive: boolean): void;
    filterArmed(): ReadonlyArray<Capture>;
    terminate(): void;
}
//# sourceMappingURL=CaptureDevices.d.ts.map