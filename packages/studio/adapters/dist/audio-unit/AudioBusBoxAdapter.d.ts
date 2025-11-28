import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { Observer, Subscription, UUID } from "@opendaw/lib-std";
import { AudioBusBox } from "@opendaw/studio-boxes";
import { DeviceBoxAdapter, DeviceHost } from "../DeviceAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "./AudioUnitBoxAdapter";
import { IconSymbol } from "@opendaw/studio-enums";
export declare class AudioBusBoxAdapter implements DeviceBoxAdapter {
    #private;
    readonly type = "bus";
    readonly accepts = "audio";
    constructor(context: BoxAdaptersContext, box: AudioBusBox);
    catchupAndSubscribe(observer: Observer<this>): Subscription;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get box(): AudioBusBox;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get iconField(): StringField;
    get labelField(): StringField;
    get colorField(): StringField;
    get iconSymbol(): IconSymbol;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
    toString(): string;
}
//# sourceMappingURL=AudioBusBoxAdapter.d.ts.map