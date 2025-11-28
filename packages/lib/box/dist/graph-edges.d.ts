import { Address } from "./address";
import { PointerField } from "./pointer";
import { Vertex } from "./vertex";
import { Box } from "./box";
export declare class GraphEdges {
    #private;
    constructor();
    watchVertex(vertex: Vertex | PointerField): void;
    unwatchVerticesOf(...boxes: ReadonlyArray<Box>): void;
    connect(source: PointerField, target: Address): void;
    disconnect(source: PointerField): void;
    isConnected(source: PointerField, target: Address): boolean;
    outgoingEdgesOf(box: Box): ReadonlyArray<[PointerField, Address]>;
    incomingEdgesOf(vertex: Box | Vertex): ReadonlyArray<PointerField>;
    validateRequirements(): void;
}
//# sourceMappingURL=graph-edges.d.ts.map