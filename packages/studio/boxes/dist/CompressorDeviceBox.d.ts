import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type CompressorDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    16: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    17: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    18: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    19: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    20: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    21: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class CompressorDeviceBox extends Box<Pointers.Device | Pointers.Selection, CompressorDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<CompressorDeviceBox>): CompressorDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get lookahead(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get automakeup(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get autoattack(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get autorelease(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get inputgain(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get threshold(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get ratio(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get knee(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get attack(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get release(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get makeup(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get mix(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): CompressorDeviceBoxFields;
}
//# sourceMappingURL=CompressorDeviceBox.d.ts.map