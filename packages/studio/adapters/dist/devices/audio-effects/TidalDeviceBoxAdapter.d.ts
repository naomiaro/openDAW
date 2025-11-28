import { TidalDeviceBox } from "@opendaw/studio-boxes";
import { StringMapping, UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { Fraction } from "@opendaw/lib-dsp";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class TidalDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    static RateFractions: ReadonlyArray<Fraction>;
    static RateStringMapping: StringMapping<number>;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly slope: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly symmetry: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly rate: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly depth: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly offset: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly channelOffset: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: TidalDeviceBox);
    get box(): TidalDeviceBox;
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
//# sourceMappingURL=TidalDeviceBoxAdapter.d.ts.map