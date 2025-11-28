import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type NanoDeviceBoxFields = {
    1: PointerField<Pointers.InstrumentHost>;
    2: StringField;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: PointerField<Pointers.AudioFile>;
    20: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class NanoDeviceBox extends Box<Pointers.Device | Pointers.Selection, NanoDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<NanoDeviceBox>): NanoDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.InstrumentHost>;
    get label(): StringField;
    get icon(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get volume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get file(): PointerField<Pointers.AudioFile>;
    get release(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): NanoDeviceBoxFields;
}
//# sourceMappingURL=NanoDeviceBox.d.ts.map