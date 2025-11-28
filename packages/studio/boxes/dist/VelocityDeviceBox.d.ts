import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type VelocityDeviceBoxFields = {
    1: PointerField<Pointers.MidiEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Int32Field;
    13: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class VelocityDeviceBox extends Box<Pointers.Device | Pointers.Selection, VelocityDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<VelocityDeviceBox>): VelocityDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get magnetPosition(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get magnetStrength(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get randomSeed(): Int32Field;
    get randomAmount(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get offset(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get mix(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): VelocityDeviceBoxFields;
}
//# sourceMappingURL=VelocityDeviceBox.d.ts.map