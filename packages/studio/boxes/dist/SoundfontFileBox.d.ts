import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, StringField } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type SoundfontFileBoxFields = {
    1: StringField;
};
export declare class SoundfontFileBox extends Box<Pointers.SoundfontFile, SoundfontFileBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<SoundfontFileBox>): SoundfontFileBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get fileName(): StringField;
    initializeFields(): SoundfontFileBoxFields;
}
//# sourceMappingURL=SoundfontFileBox.d.ts.map