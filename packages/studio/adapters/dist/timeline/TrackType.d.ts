import { IconSymbol } from "@opendaw/studio-enums";
export declare enum TrackType {
    Undefined = 0,
    Notes = 1,
    Audio = 2,
    Value = 3
}
export declare namespace TrackType {
    const toLabelString: (type: TrackType) => string;
    const toIconSymbol: (type: TrackType) => IconSymbol.AudioBus | IconSymbol.Automation | IconSymbol.Piano | IconSymbol.Unknown | IconSymbol.Waveform;
}
//# sourceMappingURL=TrackType.d.ts.map