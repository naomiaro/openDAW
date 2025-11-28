import { ModuleConnectionBox } from "@opendaw/studio-boxes";
import { Address, Vertex } from "@opendaw/lib-box";
import { BoxAdapter } from "../BoxAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
export declare class ModuleConnectionAdapter implements BoxAdapter {
    #private;
    constructor(_context: BoxAdaptersContext, box: ModuleConnectionBox);
    get box(): ModuleConnectionBox;
    get uuid(): Readonly<Uint8Array>;
    get address(): Address;
    get source(): Vertex;
    get target(): Vertex;
    terminate(): void;
}
//# sourceMappingURL=connection.d.ts.map