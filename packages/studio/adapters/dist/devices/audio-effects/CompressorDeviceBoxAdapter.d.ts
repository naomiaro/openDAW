import { CompressorDeviceBox } from "@opendaw/studio-boxes";
import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class CompressorDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly lookahead: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly automakeup: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly autoattack: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly autorelease: import("../..").AutomatableParameterFieldAdapter<boolean>;
        readonly inputgain: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly threshold: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly ratio: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly knee: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly attack: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly release: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly makeup: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly mix: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: CompressorDeviceBox);
    get box(): CompressorDeviceBox;
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
//# sourceMappingURL=CompressorDeviceBoxAdapter.d.ts.map