import { Pointers } from "@opendaw/studio-enums";
import { unitValue, UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { VelocityDeviceBox } from "@opendaw/studio-boxes";
import { DeviceHost, MidiEffectDeviceAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
import { ppqn } from "@opendaw/lib-dsp";
export declare class VelocityDeviceBoxAdapter implements MidiEffectDeviceAdapter {
    #private;
    readonly type = "midi-effect";
    readonly accepts = "midi";
    readonly namedParameter: {
        readonly magnetPosition: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly magnetStrength: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly randomSeed: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly randomAmount: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly offset: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly mix: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: VelocityDeviceBox);
    computeVelocity(position: ppqn, original: unitValue): unitValue;
    get box(): VelocityDeviceBox;
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
//# sourceMappingURL=VelocityDeviceBoxAdapter.d.ts.map