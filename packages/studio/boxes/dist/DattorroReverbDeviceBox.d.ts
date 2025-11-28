import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type DattorroReverbDeviceBoxFields = {
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
    16: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    17: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    18: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    19: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    20: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    21: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class DattorroReverbDeviceBox extends Box<Pointers.Device | Pointers.Selection, DattorroReverbDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<DattorroReverbDeviceBox>): DattorroReverbDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get preDelay(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get bandwidth(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get inputDiffusion1(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get inputDiffusion2(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get decay(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get decayDiffusion1(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get decayDiffusion2(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get damping(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get excursionRate(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get excursionDepth(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get wet(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get dry(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): DattorroReverbDeviceBoxFields;
}
//# sourceMappingURL=DattorroReverbDeviceBox.d.ts.map