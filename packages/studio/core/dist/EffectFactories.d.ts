import { EffectFactory } from "./EffectFactory";
export declare namespace EffectFactories {
    const Arpeggio: EffectFactory;
    const Pitch: EffectFactory;
    const Velocity: EffectFactory;
    const Zeitgeist: EffectFactory;
    const StereoTool: EffectFactory;
    const Delay: EffectFactory;
    const DattorroReverb: EffectFactory;
    const Compressor: EffectFactory;
    const Reverb: EffectFactory;
    const Crusher: EffectFactory;
    const Fold: EffectFactory;
    const Tidal: EffectFactory;
    const Revamp: EffectFactory;
    const Modular: EffectFactory;
    const MidiNamed: {
        Arpeggio: EffectFactory;
        Pitch: EffectFactory;
        Velocity: EffectFactory;
        Zeitgeist: EffectFactory;
    };
    const AudioNamed: {
        StereoTool: EffectFactory;
        Compressor: EffectFactory;
        Delay: EffectFactory;
        Reverb: EffectFactory;
        DattorroReverb: EffectFactory;
        Revamp: EffectFactory;
        Crusher: EffectFactory;
        Fold: EffectFactory;
        Tidal: EffectFactory;
        Modular: EffectFactory;
    };
    const MidiList: ReadonlyArray<Readonly<EffectFactory>>;
    const AudioList: ReadonlyArray<Readonly<EffectFactory>>;
    const MergedNamed: {
        StereoTool: EffectFactory;
        Compressor: EffectFactory;
        Delay: EffectFactory;
        Reverb: EffectFactory;
        DattorroReverb: EffectFactory;
        Revamp: EffectFactory;
        Crusher: EffectFactory;
        Fold: EffectFactory;
        Tidal: EffectFactory;
        Modular: EffectFactory;
        Arpeggio: EffectFactory;
        Pitch: EffectFactory;
        Velocity: EffectFactory;
        Zeitgeist: EffectFactory;
    };
    type MidiEffectKeys = keyof typeof MidiNamed;
    type AudioEffectKeys = keyof typeof AudioNamed;
}
//# sourceMappingURL=EffectFactories.d.ts.map