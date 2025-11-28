import { RevampDeviceBox } from "@opendaw/studio-boxes";
import { int, UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
import { AutomatableParameterFieldAdapter } from "../../AutomatableParameterFieldAdapter";
export declare class RevampDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly highPass: PassParameters;
        readonly lowShelf: ShelfParameters;
        readonly lowBell: BellParameters;
        readonly midBell: BellParameters;
        readonly highBell: BellParameters;
        readonly highShelf: ShelfParameters;
        readonly lowPass: PassParameters;
    };
    constructor(context: BoxAdaptersContext, box: RevampDeviceBox);
    get box(): RevampDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get host(): PointerField<Pointers.AudioEffectHost>;
    get spectrum(): Address;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
export type Parameters = {
    enabled: AutomatableParameterFieldAdapter<boolean>;
    frequency: AutomatableParameterFieldAdapter<number>;
};
export type PassParameters = Parameters & {
    order: AutomatableParameterFieldAdapter<int>;
    q: AutomatableParameterFieldAdapter<number>;
};
export type ShelfParameters = Parameters & {
    gain: AutomatableParameterFieldAdapter<number>;
};
export type BellParameters = Parameters & {
    q: AutomatableParameterFieldAdapter<number>;
    gain: AutomatableParameterFieldAdapter<number>;
};
//# sourceMappingURL=RevampDeviceBoxAdapter.d.ts.map