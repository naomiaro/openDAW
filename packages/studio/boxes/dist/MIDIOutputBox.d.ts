import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Field, StringField, Int32Field, BooleanField, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type MIDIOutputBoxFields = {
    1: PointerField<Pointers.MIDIDevice>;
    2: Field<Pointers.MIDIDevice>;
    3: StringField;
    4: StringField;
    5: Int32Field;
    6: BooleanField;
};
export declare class MIDIOutputBox extends Box<UnreferenceableType, MIDIOutputBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<MIDIOutputBox>): MIDIOutputBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get root(): PointerField<Pointers.MIDIDevice>;
    get device(): Field<Pointers.MIDIDevice>;
    get id(): StringField;
    get label(): StringField;
    get delayInMs(): Int32Field;
    get sendTransportMessages(): BooleanField;
    initializeFields(): MIDIOutputBoxFields;
}
//# sourceMappingURL=MIDIOutputBox.d.ts.map