import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type NoteEventCollectionBoxFields = {
    1: Field<Pointers.NoteEvents>;
    2: Field<Pointers.NoteEventCollection>;
};
export declare class NoteEventCollectionBox extends Box<Pointers.Selection, NoteEventCollectionBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<NoteEventCollectionBox>): NoteEventCollectionBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get events(): Field<Pointers.NoteEvents>;
    get owners(): Field<Pointers.NoteEventCollection>;
    initializeFields(): NoteEventCollectionBoxFields;
}
//# sourceMappingURL=NoteEventCollectionBox.d.ts.map