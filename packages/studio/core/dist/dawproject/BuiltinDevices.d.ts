import { int } from "@opendaw/lib-std";
import { BoxGraph, Field } from "@opendaw/lib-box";
import { EqualizerSchema } from "@opendaw/lib-dawproject";
import { Pointers } from "@opendaw/studio-enums";
import { RevampDeviceBox } from "@opendaw/studio-boxes";
export declare namespace BuiltinDevices {
    const equalizer: (boxGraph: BoxGraph, equalizer: EqualizerSchema, field: Field<Pointers.MidiEffectHost> | Field<Pointers.AudioEffectHost>, index: int) => RevampDeviceBox;
}
//# sourceMappingURL=BuiltinDevices.d.ts.map