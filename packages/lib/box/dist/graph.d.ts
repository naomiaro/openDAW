import { Exec, int, JSONValue, Option, Optional, Predicate, Procedure, Subscription, UUID } from "@opendaw/lib-std";
import { Address } from "./address";
import { Vertex } from "./vertex";
import { PointerField } from "./pointer";
import { PrimitiveField, PrimitiveValues } from "./primitive";
import { Box } from "./box";
import { Update } from "./updates";
import { Propagation } from "./dispatchers";
import { GraphEdges } from "./graph-edges";
export type BoxFactory<BoxMap> = (name: keyof BoxMap, graph: BoxGraph<BoxMap>, uuid: UUID.Bytes, constructor: Procedure<Box>) => Box;
export interface TransactionListener {
    onBeginTransaction(): void;
    onEndTransaction(): void;
}
export interface UpdateListener {
    onUpdate(update: Update): void;
}
export type Dependencies = {
    boxes: Iterable<Box>;
    pointers: Iterable<PointerField>;
};
export declare class BoxGraph<BoxMap = any> {
    #private;
    constructor(boxFactory?: Option<BoxFactory<BoxMap>>);
    beginTransaction(): void;
    endTransaction(): void;
    inTransaction(): boolean;
    constructingBox(): boolean;
    createBox(name: keyof BoxMap, uuid: UUID.Bytes, constructor: Procedure<Box>): Box;
    stageBox<B extends Box>(box: B, constructor?: Procedure<B>): B;
    subscribeTransaction(listener: TransactionListener): Subscription;
    subscribeToAllUpdates(listener: UpdateListener): Subscription;
    subscribeToAllUpdatesImmediate(listener: UpdateListener): Subscription;
    subscribeVertexUpdates(propagation: Propagation, address: Address, procedure: Procedure<Update>): Subscription;
    subscribeEndTransaction(observer: Exec): void;
    unstageBox(box: Box): void;
    findBox<B extends Box = Box>(uuid: UUID.Bytes): Option<B>;
    findVertex(address: Address): Option<Vertex>;
    boxes(): ReadonlyArray<Box>;
    edges(): GraphEdges;
    checksum(): Int8Array;
    onPrimitiveValueUpdate<V extends PrimitiveValues>(field: PrimitiveField<V, any>, oldValue: V, newValue: V): void;
    onPointerAddressUpdated(pointerField: PointerField, oldValue: Option<Address>, newValue: Option<Address>): void;
    dependenciesOf(box: Box, options?: {
        excludeBox?: Predicate<Box>;
        alwaysFollowMandatory?: boolean;
    }): Dependencies;
    verifyPointers(): {
        count: int;
    };
    debugBoxes(): void;
    debugDependencies(): void;
    addressToDebugPath(address: Option<Address>): Option<string>;
    toArrayBuffer(): ArrayBufferLike;
    fromArrayBuffer(arrayBuffer: ArrayBufferLike): void;
    toJSON(): Optional<JSONValue>;
}
//# sourceMappingURL=graph.d.ts.map