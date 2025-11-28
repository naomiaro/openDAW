import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, Int32Field, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type MIDIOutputParameterBoxFields = {
    1: PointerField<Pointers.Parameter>;
    2: StringField;
    3: Int32Field;
    4: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class MIDIOutputParameterBox extends Box<UnreferenceableType, MIDIOutputParameterBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<MIDIOutputParameterBox>): MIDIOutputParameterBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get owner(): PointerField<Pointers.Parameter>;
    get label(): StringField;
    get controller(): Int32Field;
    get value(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): MIDIOutputParameterBoxFields;
}
//# sourceMappingURL=MIDIOutputParameterBox.d.ts.map