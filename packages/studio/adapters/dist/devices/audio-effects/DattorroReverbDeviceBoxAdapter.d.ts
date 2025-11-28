import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { DattorroReverbDeviceBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class DattorroReverbDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly preDelay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly bandwidth: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly inputDiffusion1: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly inputDiffusion2: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly decay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly decayDiffusion1: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly decayDiffusion2: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly damping: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly excursionRate: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly excursionDepth: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly wet: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly dry: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: DattorroReverbDeviceBox);
    get box(): DattorroReverbDeviceBox;
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
//# sourceMappingURL=DattorroReverbDeviceBoxAdapter.d.ts.map