import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type TapeDeviceBoxFields = {
    1: PointerField<Pointers.InstrumentHost>;
    2: StringField;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class TapeDeviceBox extends Box<Pointers.Device | Pointers.Selection | Pointers.Automation, TapeDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<TapeDeviceBox>): TapeDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.InstrumentHost>;
    get label(): StringField;
    get icon(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get flutter(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get wow(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get noise(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get saturation(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): TapeDeviceBoxFields;
}
//# sourceMappingURL=TapeDeviceBox.d.ts.map