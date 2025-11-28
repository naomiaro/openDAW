import { NanoDeviceBox } from "@opendaw/studio-boxes";
import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { DeviceHost, InstrumentDeviceBoxAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { TrackType } from "../../timeline/TrackType";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class NanoDeviceBoxAdapter implements InstrumentDeviceBoxAdapter {
    #private;
    readonly type = "instrument";
    readonly accepts = "midi";
    readonly namedParameter: {
        readonly volume: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly release: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: NanoDeviceBox);
    get box(): NanoDeviceBox;
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
//# sourceMappingURL=NanoDeviceBoxAdapter.d.ts.map