import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type PitchDeviceBoxFields = {
    1: PointerField<Pointers.MidiEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class PitchDeviceBox extends Box<Pointers.Device | Pointers.Selection, PitchDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<PitchDeviceBox>): PitchDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get semiTones(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get cents(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get octaves(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): PitchDeviceBoxFields;
}
//# sourceMappingURL=PitchDeviceBox.d.ts.map