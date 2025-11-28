import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type StereoToolDeviceBoxFields = {
    1: PointerField<Pointers.AudioEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    20: Int32Field;
};
export declare class StereoToolDeviceBox extends Box<Pointers.Device | Pointers.Selection, StereoToolDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<StereoToolDeviceBox>): StereoToolDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get volume(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get panning(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get stereo(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get invertL(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get invertR(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get swap(): BooleanField<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get panningMixing(): Int32Field;
    initializeFields(): StereoToolDeviceBoxFields;
}
//# sourceMappingURL=StereoToolDeviceBox.d.ts.map