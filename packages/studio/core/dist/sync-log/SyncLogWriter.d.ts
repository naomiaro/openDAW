import { Observer, Terminable } from "@opendaw/lib-std";
import { Project } from "../project/Project";
import { Commit } from "./Commit";
export declare class SyncLogWriter implements Terminable {
    #private;
    static attach(project: Project, observer: Observer<Commit>, lastCommit?: Commit): SyncLogWriter;
    private constructor();
    terminate(): void;
}
//# sourceMappingURL=SyncLogWriter.d.ts.map