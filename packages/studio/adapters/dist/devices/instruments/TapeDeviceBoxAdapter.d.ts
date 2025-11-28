import { TapeDeviceBox } from "@opendaw/studio-boxes";
import { UUID } from "@opendaw/lib-std";
import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { DeviceHost, InstrumentDeviceBoxAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
import { TrackType } from "../../timeline/TrackType";
export declare class TapeDeviceBoxAdapter implements InstrumentDeviceBoxAdapter {
    #private;
    readonly type = "instrument";
    readonly accepts = "audio";
    readonly namedParameter: {
        readonly flutter: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly wow: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly noise: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly saturation: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: TapeDeviceBox);
    get box(): TapeDeviceBox;
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
//# sourceMappingURL=TapeDeviceBoxAdapter.d.ts.map