import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ValueEventCollectionBoxFields = {
    1: Field<Pointers.ValueEvents>;
    2: Field<Pointers.ValueEventCollection>;
};
export declare class ValueEventCollectionBox extends Box<Pointers.Selection, ValueEventCollectionBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ValueEventCollectionBox>): ValueEventCollectionBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get events(): Field<Pointers.ValueEvents>;
    get owners(): Field<Pointers.ValueEventCollection>;
    initializeFields(): ValueEventCollectionBoxFields;
}
//# sourceMappingURL=ValueEventCollectionBox.d.ts.map