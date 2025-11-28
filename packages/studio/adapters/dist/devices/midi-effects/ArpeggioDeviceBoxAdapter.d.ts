import { ArpeggioDeviceBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { StringMapping, UUID } from "@opendaw/lib-std";
import { DeviceHost, MidiEffectDeviceAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class ArpeggioDeviceBoxAdapter implements MidiEffectDeviceAdapter {
    #private;
    static RateFractions: readonly (readonly [number, number])[];
    static RateStringMapping: StringMapping<number>;
    readonly type = "midi-effect";
    readonly accepts = "midi";
    readonly namedParameter: {
        readonly modeIndex: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly numOctaves: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly rate: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly gate: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly repeat: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly velocity: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: ArpeggioDeviceBox);
    get box(): ArpeggioDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get host(): PointerField<Pointers.MidiEffectHost>;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=ArpeggioDeviceBoxAdapter.d.ts.map