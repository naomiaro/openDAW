import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { FoldDeviceBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class FoldDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly drive: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly volume: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: FoldDeviceBox);
    get box(): FoldDeviceBox;
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
//# sourceMappingURL=FoldDeviceBoxAdapter.d.ts.map