import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { UnknownMidiEffectDeviceBox } from "@opendaw/studio-boxes";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { DeviceHost, MidiEffectDeviceAdapter } from "../../DeviceAdapter";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class UnknownMidiEffectDeviceBoxAdapter implements MidiEffectDeviceAdapter {
    #private;
    readonly type = "midi-effect";
    readonly accepts = "midi";
    constructor(context: BoxAdaptersContext, box: UnknownMidiEffectDeviceBox);
    get box(): UnknownMidiEffectDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get indexField(): Int32Field;
    get labelField(): StringField;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get host(): PointerField<Pointers.MidiEffectHost>;
    get commentField(): StringField;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=UnknownMidiEffectDeviceBoxAdapter.d.ts.map