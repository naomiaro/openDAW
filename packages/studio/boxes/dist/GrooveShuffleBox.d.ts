import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, StringField, Float32Field, Int32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type GrooveShuffleBoxFields = {
    1: StringField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class GrooveShuffleBox extends Box<Pointers.Groove, GrooveShuffleBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<GrooveShuffleBox>): GrooveShuffleBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get label(): StringField;
    get amount(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get duration(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): GrooveShuffleBoxFields;
}
//# sourceMappingURL=GrooveShuffleBox.d.ts.map