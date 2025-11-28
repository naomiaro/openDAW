import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, Float32Field, UnreferenceableType } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type AuxSendBoxFields = {
    1: PointerField<Pointers.AuxSend>;
    2: PointerField<Pointers.AudioOutput>;
    3: Int32Field;
    4: Int32Field;
    5: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    6: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class AuxSendBox extends Box<UnreferenceableType, AuxSendBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<AuxSendBox>): AuxSendBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get audioUnit(): PointerField<Pointers.AuxSend>;
    get targetBus(): PointerField<Pointers.AudioOutput>;
    get index(): Int32Field;
    get routing(): Int32Field;
    get sendGain(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get sendPan(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): AuxSendBoxFields;
}
//# sourceMappingURL=AuxSendBox.d.ts.map