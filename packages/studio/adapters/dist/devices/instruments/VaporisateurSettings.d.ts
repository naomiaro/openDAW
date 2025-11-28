import { StringMapping, ValueMapping } from "@opendaw/lib-std";
import { ClassicWaveform } from "@opendaw/lib-dsp";
export declare const VaporisateurSettings: {
    MIN_CUTOFF: number;
    MAX_CUTOFF: number;
    CUTOFF_VALUE_MAPPING: ValueMapping<number>;
    CUTOFF_STRING_MAPPING: StringMapping<number>;
    FILTER_ORDER_VALUES: number[];
    FILTER_ORDER_STRINGS: string[];
    FILTER_ORDER_VALUE_MAPPING: ValueMapping<number>;
    FILTER_ORDER_STRING_MAPPING: StringMapping<number>;
    LFO_WAVEFORM_VALUES: ClassicWaveform[];
    LFO_WAVEFORM_STRINGS: string[];
    LFO_WAVEFORM_VALUE_MAPPING: ValueMapping<ClassicWaveform>;
    LFO_WAVEFORM_STRING_MAPPING: StringMapping<ClassicWaveform>;
};
//# sourceMappingURL=VaporisateurSettings.d.ts.map