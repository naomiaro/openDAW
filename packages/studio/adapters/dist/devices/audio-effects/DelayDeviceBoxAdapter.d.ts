import { DelayDeviceBox } from "@opendaw/studio-boxes";
import { StringMapping, UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class DelayDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    static OffsetFractions: readonly (readonly [number, number])[];
    static OffsetStringMapping: StringMapping<number>;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly delay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly feedback: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly cross: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly filter: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly dry: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly wet: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: DelayDeviceBox);
    get box(): DelayDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get host(): PointerField<Pointers.AudioEffectHost>;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=DelayDeviceBoxAdapter.d.ts.map