import { ModularDeviceBox } from "@opendaw/studio-boxes";
import { UUID } from "@opendaw/lib-std";
import { Pointers } from "@opendaw/studio-enums";
import { Address, BooleanField, FieldKeys, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { AudioEffectDeviceAdapter, DeviceHost } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AutomatableParameterFieldAdapter } from "../../AutomatableParameterFieldAdapter";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
import { ModularAdapter } from "../../modular/modular";
import { DeviceInterfaceKnobAdapter } from "../../modular/user-interface";
export declare class ModularDeviceBoxAdapter implements AudioEffectDeviceAdapter {
    #private;
    readonly type = "audio-effect";
    readonly accepts = "audio";
    constructor(context: BoxAdaptersContext, box: ModularDeviceBox);
    get box(): ModularDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get host(): PointerField<Pointers.AudioEffectHost>;
    parameterAt(_fieldIndices: FieldKeys): AutomatableParameterFieldAdapter;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    modular(): ModularAdapter;
    elements(): ReadonlyArray<DeviceInterfaceKnobAdapter>;
    terminate(): void;
}
//# sourceMappingURL=ModularDeviceBoxAdapter.d.ts.map