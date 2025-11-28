import { Box, BoxGraph } from "@opendaw/lib-box";
import { AudioUnitBox } from "@opendaw/studio-boxes";
import { AudioEffects } from "./Api";
export declare class AudioEffectFactory {
    static write(boxGraph: BoxGraph, audioUnitBox: AudioUnitBox, effect: Required<AudioEffects[keyof AudioEffects]>): Box;
}
//# sourceMappingURL=AudioEffectFactory.d.ts.map