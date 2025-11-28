import { Terminable } from "@opendaw/lib-std";
import { Messenger } from "@opendaw/lib-runtime";
import { BoxGraph } from "./graph";
export declare class SyncSource<M> implements Terminable {
    #private;
    static readonly DEBUG_CHECKSUM = false;
    constructor(graph: BoxGraph<M>, messenger: Messenger, initialize?: boolean);
    checksum(value: Int8Array): Promise<void>;
    terminate(): void;
}
//# sourceMappingURL=sync-source.d.ts.map