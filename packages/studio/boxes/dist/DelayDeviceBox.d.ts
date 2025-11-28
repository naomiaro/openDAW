import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type DelayDeviceBoxFields = {
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
export declare class DelayDeviceBox extends Box<Pointers.Device | Pointers.Selection, DelayDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<DelayDeviceBox>): DelayDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get delay(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get feedback(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get cross(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get filter(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get wet(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get dry(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): DelayDeviceBoxFields;
}
//# sourceMappingURL=DelayDeviceBox.d.ts.map