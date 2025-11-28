import { ReverbDeviceBox } from "@opendaw/studio-boxes";
import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class ReverbDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly decay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly preDelay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly damp: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly filter: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly dry: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly wet: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: ReverbDeviceBox);
    get box(): ReverbDeviceBox;
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
//# sourceMappingURL=ReverbDeviceBoxAdapter.d.ts.map