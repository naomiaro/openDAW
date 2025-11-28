import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, StringField, Int32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type CaptureMidiBoxFields = {
    1: StringField;
    2: StringField;
    10: Int32Field;
};
export declare class CaptureMidiBox extends Box<Pointers.Capture, CaptureMidiBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<CaptureMidiBox>): CaptureMidiBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get deviceId(): StringField;
    get recordMode(): StringField;
    get channel(): Int32Field;
    initializeFields(): CaptureMidiBoxFields;
}
//# sourceMappingURL=CaptureMidiBox.d.ts.map