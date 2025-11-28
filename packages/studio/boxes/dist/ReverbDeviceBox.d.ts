import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ReverbDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class ReverbDeviceBox extends Box<Pointers.Device | Pointers.Selection, ReverbDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ReverbDeviceBox>): ReverbDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get decay(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get preDelay(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get damp(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get filter(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get wet(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get dry(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): ReverbDeviceBoxFields;
}
//# sourceMappingURL=ReverbDeviceBox.d.ts.map