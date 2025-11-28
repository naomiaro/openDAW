import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { CrusherDeviceBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class CrusherDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly crush: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly bits: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly boost: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly mix: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: CrusherDeviceBox);
    get box(): CrusherDeviceBox;
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
//# sourceMappingURL=CrusherDeviceBoxAdapter.d.ts.map