import { Pointers } from "@opendaw/studio-enums";
import { BooleanField, Box, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Maybe } from "@opendaw/lib-std";
export type DeviceBox = {
    host: PointerField;
    label: StringField;
    enabled: BooleanField;
    minimized: BooleanField;
} & Box;
export type InstrumentDeviceBox = {
    host: PointerField<Pointers.InstrumentHost>;
} & DeviceBox;
export type EffectDeviceBox = {
    host: PointerField<Pointers.AudioEffectHost | Pointers.MidiEffectHost>;
    index: Int32Field;
} & DeviceBox;
export declare namespace DeviceBoxUtils {
    const isDeviceBox: (box: Box) => box is DeviceBox;
    const isInstrumentDeviceBox: (box: Box) => box is InstrumentDeviceBox;
    const isEffectDeviceBox: (box: Box) => box is EffectDeviceBox;
    const lookupHostField: (box: Maybe<Box>) => PointerField;
    const lookupLabelField: (box: Maybe<Box>) => StringField;
    const lookupEnabledField: (box: Maybe<Box>) => BooleanField;
    const lookupMinimizedField: (box: Maybe<Box>) => BooleanField;
    const lookupIndexField: (box: Maybe<Box>) => Int32Field;
}
//# sourceMappingURL=DeviceBox.d.ts.map