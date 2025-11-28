import { Provider, Terminable } from "@opendaw/lib-std";
import { BoxGraph } from "@opendaw/lib-box";
import * as Y from "yjs";
export type Construct<T> = {
    boxGraph: BoxGraph<T>;
    boxes: Y.Map<unknown>;
    conflict?: Provider<boolean>;
};
export declare class YSync<T> implements Terminable {
    #private;
    static isEmpty(doc: Y.Doc): boolean;
    static populateRoom<T>({ boxGraph, boxes }: Construct<T>): Promise<YSync<T>>;
    static joinRoom<T>({ boxGraph, boxes }: Construct<T>): Promise<YSync<T>>;
    constructor({ boxGraph, boxes, conflict }: Construct<T>);
    terminate(): void;
}
//# sourceMappingURL=YSync.d.ts.map