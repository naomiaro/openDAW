import { UUID } from "@opendaw/lib-std";
import { VaporisateurDeviceBox } from "@opendaw/studio-boxes";
import { Address, BooleanField, StringField } from "@opendaw/lib-box";
import { DeviceHost, InstrumentDeviceBoxAdapter } from "../../DeviceAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { TrackType } from "../../timeline/TrackType";
import { AudioUnitBoxAdapter } from "../../audio-unit/AudioUnitBoxAdapter";
export declare class VaporisateurDeviceBoxAdapter implements InstrumentDeviceBoxAdapter {
    #private;
    readonly type = "instrument";
    readonly accepts = "midi";
    readonly namedParameter: {
        readonly oscillators: {
            waveform: import("../..").AutomatableParameterFieldAdapter<number>;
            volume: import("../..").AutomatableParameterFieldAdapter<number>;
            octave: import("../..").AutomatableParameterFieldAdapter<number>;
            tune: import("../..").AutomatableParameterFieldAdapter<number>;
        }[];
        readonly noise: {
            readonly volume: import("../..").AutomatableParameterFieldAdapter<number>;
            readonly attack: import("../..").AutomatableParameterFieldAdapter<number>;
            readonly hold: import("../..").AutomatableParameterFieldAdapter<number>;
            readonly release: import("../..").AutomatableParameterFieldAdapter<number>;
        };
        readonly filterOrder: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly cutoff: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly resonance: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly attack: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly decay: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly sustain: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly release: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly filterEnvelope: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly filterKeyboard: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly voicingMode: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly glideTime: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly unisonCount: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly unisonDetune: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly unisonStereo: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly lfoWaveform: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly lfoRate: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly lfoTargetTune: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly lfoTargetVolume: import("../..").AutomatableParameterFieldAdapter<number>;
        readonly lfoTargetCutoff: import("../..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: VaporisateurDeviceBox);
    get box(): VaporisateurDeviceBox;
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
//# sourceMappingURL=VaporisateurDeviceBoxAdapter.d.ts.map