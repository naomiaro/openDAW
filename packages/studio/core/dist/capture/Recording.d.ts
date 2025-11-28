import { Terminable } from "@opendaw/lib-std";
import { Project } from "../project";
export declare class Recording {
    #private;
    static get isRecording(): boolean;
    static start(project: Project, countIn: boolean): Promise<Terminable>;
    private constructor();
}
//# sourceMappingURL=Recording.d.ts.map