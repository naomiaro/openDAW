import { MIDIEffects } from "./Api";
import { Box, BoxGraph } from "@opendaw/lib-box";
import { AudioUnitBox } from "@opendaw/studio-boxes";
export declare class MIDIEffectFactory {
    static write(boxGraph: BoxGraph, audioUnitBox: AudioUnitBox, effect: Required<MIDIEffects[keyof MIDIEffects]>): Box;
}
//# sourceMappingURL=MIDIEffectFactory.d.ts.map