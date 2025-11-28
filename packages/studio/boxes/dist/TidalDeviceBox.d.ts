import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type TidalDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    20: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    21: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    22: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    23: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class TidalDeviceBox extends Box<Pointers.Device | Pointers.Selection, TidalDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<TidalDeviceBox>): TidalDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get slope(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get symmetry(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get rate(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get depth(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get offset(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get channelOffset(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): TidalDeviceBoxFields;
}
//# sourceMappingURL=TidalDeviceBox.d.ts.map