import { int, ObservableOption, UUID } from "@opendaw/lib-std";
import { SoundfontDeviceBox } from "@opendaw/studio-boxes";
import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { DeviceHost, InstrumentDeviceBoxAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { TrackType } from "../../timeline/TrackType";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
import { SoundfontLoader } from "../../soundfont/SoundfontLoader";
import type { Preset, SoundFont2 } from "soundfont2";
export declare class SoundfontDeviceBoxAdapter implements InstrumentDeviceBoxAdapter {
    #private;
    readonly type = "instrument";
    readonly accepts = "midi";
    readonly namedParameter: {};
    constructor(context: BoxAdaptersContext, box: SoundfontDeviceBox);
    get loader(): ObservableOption<SoundfontLoader>;
    get soundfont(): ObservableOption<SoundFont2>;
    get preset(): ObservableOption<Preset>;
    get presetIndex(): int;
    get box(): SoundfontDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get labelField(): StringField;
    get iconField(): StringField;
    get defaultTrackType(): TrackType;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get acceptsMidiEvents(): boolean;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=SoundfontDeviceBoxAdapter.d.ts.map