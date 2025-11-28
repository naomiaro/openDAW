import { BoxGraph } from "./graph";
import { Editing, Maybe, Option, Provider } from "@opendaw/lib-std";
export interface ModificationProcess {
    approve(): void;
    revert(): void;
}
export declare class BoxEditing implements Editing {
    #private;
    constructor(graph: BoxGraph);
    get graph(): BoxGraph;
    isEmpty(): boolean;
    clear(): void;
    undo(): boolean;
    redo(): boolean;
    mustModify(): boolean;
    modify<R>(modifier: Provider<Maybe<R>>, mark?: boolean): Option<R>;
    beginModification(): ModificationProcess;
    mark(): void;
    clearPending(): void;
    disable(): void;
}
//# sourceMappingURL=editing.d.ts.map