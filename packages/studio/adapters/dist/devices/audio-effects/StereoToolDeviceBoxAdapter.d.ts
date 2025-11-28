import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { StereoToolDeviceBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class StereoToolDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly volume: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly panning: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly stereo: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly invertL: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly invertR: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly swap: import("../..").AutomatableParameterFieldAdapter<boolean>;
    };
    constructor(context: BoxAdaptersContext, box: StereoToolDeviceBox);
    get box(): StereoToolDeviceBox;
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
//# sourceMappingURL=StereoToolDeviceBoxAdapter.d.ts.map