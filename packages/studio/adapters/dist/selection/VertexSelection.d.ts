import { Bijective, int, Predicate, Selection, SelectionListener, Subscription } from "@opendaw/lib-std";
import { Addressable, BoxGraph, BoxEditing, Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { SelectableVertex } from "./SelectableVertex";
import { FilteredSelection } from "./FilteredSelection";
/**
 * Represents the main selection management within a document.
 * This class maintains selections for different users, with each user having their own unique selection.
 */
export declare class VertexSelection implements Selection<SelectableVertex> {
    #private;
    readonly editing: BoxEditing;
    readonly boxGraph: BoxGraph;
    constructor(editing: BoxEditing, boxGraph: BoxGraph);
    switch(target: Field<Pointers.Selection>): this;
    release(): void;
    createFilteredSelection<T extends Addressable>(affiliate: Predicate<SelectableVertex>, map: Bijective<T, SelectableVertex>): FilteredSelection<T>;
    select(...selectables: ReadonlyArray<SelectableVertex>): void;
    deselect(...selectables: ReadonlyArray<SelectableVertex>): void;
    deselectAll(): void;
    distance(inventory: Iterable<SelectableVertex>): ReadonlyArray<SelectableVertex>;
    isEmpty(): boolean;
    count(): int;
    isSelected(selectable: SelectableVertex): boolean;
    selected(): ReadonlyArray<SelectableVertex>;
    subscribe(listener: SelectionListener<SelectableVertex>): Subscription;
    catchupAndSubscribe(listener: SelectionListener<SelectableVertex>): Subscription;
}
//# sourceMappingURL=VertexSelection.d.ts.map