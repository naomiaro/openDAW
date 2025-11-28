import { Bijective, int, Predicate, Selection, SelectionListener, Subscription, Terminable } from "@opendaw/lib-std";
import { Addressable } from "@opendaw/lib-box";
import { VertexSelection } from "./VertexSelection";
import { SelectableVertex } from "./SelectableVertex";
export declare class FilteredSelection<T extends Addressable> implements Selection<T>, Terminable {
    #private;
    constructor(selection: VertexSelection, filter: Predicate<SelectableVertex>, mapping: Bijective<T, SelectableVertex>);
    terminate(): void;
    select(...selectables: Array<T>): void;
    deselect(...selectables: Array<T>): void;
    deselectAll(): void;
    distance(inventory: ReadonlyArray<T>): ReadonlyArray<T>;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    count(): int;
    isSelected(selectable: T): boolean;
    selected(): ReadonlyArray<T>;
    subscribe(listener: SelectionListener<T>): Terminable;
    catchupAndSubscribe(listener: SelectionListener<T>): Subscription;
}
//# sourceMappingURL=FilteredSelection.d.ts.map