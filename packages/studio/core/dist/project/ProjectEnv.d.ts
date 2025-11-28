import { SampleLoaderManager, SoundfontLoaderManager } from "@opendaw/studio-adapters";
import { AudioWorklets } from "../AudioWorklets";
export interface ProjectEnv {
    audioContext: AudioContext;
    audioWorklets: AudioWorklets;
    sampleManager: SampleLoaderManager;
    soundfontManager: SoundfontLoaderManager;
}
//# sourceMappingURL=ProjectEnv.d.ts.map