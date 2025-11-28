import { AssertType, Class, Terminable } from "@opendaw/lib-std";
import { Box } from "@opendaw/lib-box";
import { BoxAdaptersContext } from "./BoxAdaptersContext";
import { BoxAdapter } from "./BoxAdapter";
export declare class BoxAdapters implements Terminable {
    #private;
    constructor(context: BoxAdaptersContext);
    terminate(): void;
    adapterFor<BOX extends Box, T extends BoxAdapter>(box: BOX, checkType: Class<T> | AssertType<T>): T;
}
//# sourceMappingURL=BoxAdapters.d.ts.map