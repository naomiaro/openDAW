import { int, Observer, Option, Subscription, Terminable, UUID } from "@opendaw/lib-std";
import { Peaks } from "@opendaw/lib-fusion";
import { AudioData, RingBuffer, SampleLoader, SampleLoaderState } from "@opendaw/studio-adapters";
/**
 * Data emitted for each audio chunk during recording.
 * Allows external consumers to process audio in real-time.
 */
export interface RecordingChunk {
    /** UUID of this recording session */
    readonly recordingId: string;
    /** UUID of the capture device (maps to track/audio unit) */
    readonly captureId: string;
    /** Audio data - one Float32Array per channel, each with 128 samples */
    readonly channels: ReadonlyArray<Float32Array>;
    /** Cumulative frame index (0, 128, 256, ...) */
    readonly frameIndex: int;
    /** Sample rate of the audio context */
    readonly sampleRate: number;
    /** Number of channels */
    readonly channelCount: int;
}
export declare class RecordingWorklet extends AudioWorkletNode implements Terminable, SampleLoader {
    #private;
    readonly uuid: UUID.Bytes;
    constructor(context: BaseAudioContext, config: RingBuffer.Config, outputLatency: number, captureId: UUID.Bytes);
    /** Subscribe to receive audio chunks in real-time during recording */
    subscribeToChunks(observer: Observer<RecordingChunk>): Subscription;
    /** Disable internal peak generation (use when handling peaks externally) */
    disableInternalPeaks(): void;
    /** Get the capture device UUID associated with this recording */
    get captureId(): UUID.Bytes;
    own<T extends Terminable>(terminable: T): T;
    limit(count: int): void;
    setFillLength(value: int): void;
    get numberOfFrames(): int;
    get data(): Option<AudioData>;
    get peaks(): Option<Peaks>;
    get state(): SampleLoaderState;
    invalidate(): void;
    subscribe(observer: Observer<SampleLoaderState>): Subscription;
    terminate(): void;
    toString(): string;
}
//# sourceMappingURL=RecordingWorklet.d.ts.map