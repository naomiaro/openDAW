import { PlayfieldDeviceBox } from "@opendaw/studio-boxes";
import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { UUID } from "@opendaw/lib-std";
import { DeviceHost, InstrumentDeviceBoxAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { IndexedBoxAdapterCollection } from "../../IndexedBoxAdapterCollection";
import { PlayfieldSampleBoxAdapter } from "./Playfield/PlayfieldSampleBoxAdapter";
import { TrackType } from "../../timeline/TrackType";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class PlayfieldDeviceBoxAdapter implements InstrumentDeviceBoxAdapter {
    #private;
    readonly type = "instrument";
    readonly accepts = "midi";
    constructor(context: BoxAdaptersContext, box: PlayfieldDeviceBox);
    reset(): void;
    get box(): PlayfieldDeviceBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get labelField(): StringField;
    get iconField(): StringField;
    get defaultTrackType(): TrackType;
    get enabledField(): BooleanField;
    get minimizedField(): BooleanField;
    get acceptsMidiEvents(): boolean;
    get samples(): IndexedBoxAdapterCollection<PlayfieldSampleBoxAdapter, Pointers.Sample>;
    get context(): BoxAdaptersContext;
    deviceHost(): DeviceHost;
    audioUnitBoxAdapter(): AudioUnitBoxAdapter;
    terminate(): void;
}
//# sourceMappingURL=PlayfieldDeviceBoxAdapter.d.ts.map