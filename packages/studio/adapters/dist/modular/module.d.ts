import { Box, Vertex } from "@opendaw/lib-box";
import { ModuleAttributes } from "@opendaw/studio-boxes";
import { Selectable } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { BoxAdapter } from "../BoxAdapter";
import { ParameterAdapterSet } from "../ParameterAdapterSet";
import { ModularAdapter } from "./modular";
import { Direction, ModuleConnectorAdapter } from "./connector";
import { BoxAdapters } from "../BoxAdapters";
export interface ModuleAdapter extends BoxAdapter, Selectable {
    get attributes(): ModuleAttributes;
    get parameters(): ParameterAdapterSet;
    get modular(): ModularAdapter;
    get inputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Input>>;
    get outputs(): ReadonlyArray<ModuleConnectorAdapter<Pointers.VoltageConnection, Direction.Output>>;
}
export declare namespace Modules {
    const isVertexOfModule: (vertex: Vertex) => boolean;
    const adapterFor: (adapters: BoxAdapters, box: Box) => ModuleAdapter;
}
//# sourceMappingURL=module.d.ts.map