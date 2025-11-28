import { Maybe, UUID, Procedure } from "@opendaw/lib-std";
import { Box, BoxGraph, PointerField, Int32Field, StringField, BooleanField, Float32Field } from "@opendaw/lib-box";
import { BoxVisitor } from ".";
import { Pointers } from "@opendaw/studio-enums";
export type ArpeggioDeviceBoxFields = {
    1: PointerField<Pointers.MidiEffectHost>;
    2: Int32Field;
    3: StringField;
    4: BooleanField;
    5: BooleanField;
    10: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    11: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    12: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    13: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    14: Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    15: Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
};
export declare class ArpeggioDeviceBox extends Box<Pointers.Device | Pointers.Selection, ArpeggioDeviceBoxFields> {
    static create(graph: BoxGraph, uuid: UUID.Bytes, constructor?: Procedure<ArpeggioDeviceBox>): ArpeggioDeviceBox;
    static readonly ClassName: string;
    private constructor();
    accept<R>(visitor: BoxVisitor<R>): Maybe<R>;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get index(): Int32Field;
    get label(): StringField;
    get enabled(): BooleanField;
    get minimized(): BooleanField;
    get modeIndex(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get numOctaves(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get rateIndex(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get gate(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get repeat(): Int32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    get velocity(): Float32Field<Pointers.Modulation | Pointers.Automation | Pointers.MidiControl>;
    initializeFields(): ArpeggioDeviceBoxFields;
}
//# sourceMappingURL=ArpeggioDeviceBox.d.ts.map