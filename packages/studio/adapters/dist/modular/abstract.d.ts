import { Address, Box, PointerTypes } from "@opendaw/lib-box";
import { Terminable } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { ModuleAttributes } from "@opendaw/studio-boxes";
import { ModuleAdapter } from "./module";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { ParameterAdapterSet } from "../ParameterAdapterSet";
import { Direction, ModuleConnectorAdapter } from "./connector";
import { ModularAdapter } from "./modular";
export declare abstract class AbstractModuleAdapter<BOX extends Box & {
    attributes: ModuleAttributes;
}> implements ModuleAdapter {
    #private;
    protected constructor(context: BoxAdaptersContext, box: BOX);
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
    own<T extends Terminable>(terminable: T): T;
    ownAll<T extends Terminable>(...terminables: ReadonlyArray<T>): void;
    onSelected(): void;
    onDeselected(): void;
    isSelected(): boolean;
    get box(): Box<PointerTypes, any>;
    get attributes(): ModuleAttributes;
    get uuid(): Readonly<Uint8Array>;
    get address(): Address;
    get parameters(): ParameterAdapterSet;
    get modular(): ModularAdapter;
    terminate(): void;
}
//# sourceMappingURL=abstract.d.ts.map