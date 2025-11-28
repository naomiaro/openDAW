import { Func, int, Option, Subscription, Terminable, UUID } from "@opendaw/lib-std";
import { Box, Field, Int32Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AdapterCollectionListener } from "./BoxAdapterCollection";
import { BoxAdapter } from "./BoxAdapter";
export interface IndexedBoxAdapter extends BoxAdapter {
    indexField: Int32Field;
}
export interface IndexedAdapterCollectionListener<A extends IndexedBoxAdapter> extends AdapterCollectionListener<A> {
    onReorder(adapter: A): void;
}
export declare class IndexedBoxAdapterCollection<A extends IndexedBoxAdapter, P extends Pointers> implements Terminable {
    #private;
    static create<A extends IndexedBoxAdapter, P extends Pointers>(field: Field<P>, provider: Func<Box, A>, pointers: P): IndexedBoxAdapterCollection<A, P>;
    private constructor();
    field(): Field<P>;
    subscribe(listener: IndexedAdapterCollectionListener<A>): Subscription;
    catchupAndSubscribe(listener: IndexedAdapterCollectionListener<A>): Subscription;
    getAdapterByIndex(index: int): Option<A>;
    getAdapterById(uuid: UUID.Bytes): Option<A>;
    getMinFreeIndex(): int;
    adapters(): ReadonlyArray<A>;
    move(adapter: A, delta: int): void;
    moveIndex(startIndex: int, delta: int): void;
    size(): int;
    isEmpty(): boolean;
    terminate(): void;
}
//# sourceMappingURL=IndexedBoxAdapterCollection.d.ts.map