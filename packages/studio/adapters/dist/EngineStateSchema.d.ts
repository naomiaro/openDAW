import { Schema } from "@opendaw/lib-std";
export declare const EngineStateSchema: () => Schema.IO<{
    position: number;
    playbackTimestamp: number;
    countInBeatsRemaining: number;
    isPlaying: boolean;
    isCountingIn: boolean;
    isRecording: boolean;
}>;
export type EngineState = ReturnType<typeof EngineStateSchema>["object"];
//# sourceMappingURL=EngineStateSchema.d.ts.map