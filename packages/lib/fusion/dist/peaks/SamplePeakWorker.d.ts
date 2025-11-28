import { float, FloatArray, int, Procedure } from "@opendaw/lib-std";
import { Communicator, Messenger } from "@opendaw/lib-runtime";
export declare namespace SamplePeakWorker {
    const install: (messenger: Messenger) => Communicator.Executor<{
        generateAsync(progress: Procedure<number>, shifts: Uint8Array, frames: FloatArray[], numFrames: int, numChannels: int): Promise<ArrayBufferLike>;
    }>;
    const pack: (f0: float, f1: float) => int;
}
//# sourceMappingURL=SamplePeakWorker.d.ts.map