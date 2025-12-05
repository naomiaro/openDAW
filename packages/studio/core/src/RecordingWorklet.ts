import {
    ByteArrayInput,
    int,
    Notifier,
    Observer,
    Option,
    panic,
    Progress,
    Subscription,
    Terminable,
    Terminator,
    UUID
} from "@naomiarotest/lib-std"
import {BPMTools} from "@naomiarotest/lib-dsp"
import {Peaks, SamplePeaks} from "@naomiarotest/lib-fusion"
import {
    AudioData,
    mergeChunkPlanes,
    RingBuffer,
    SampleLoader,
    SampleLoaderState,
    SampleMetaData
} from "@naomiarotest/studio-adapters"
import {SampleStorage} from "./samples"
import {RenderQuantum} from "./RenderQuantum"
import {Workers} from "./Workers"
import {PeaksWriter} from "./PeaksWriter"

/**
 * Data emitted for each audio chunk during recording.
 * Allows external consumers to process audio in real-time.
 */
export interface RecordingChunk {
    /** UUID of this recording session */
    readonly recordingId: string
    /** UUID of the capture device (maps to track/audio unit) */
    readonly captureId: string
    /** Audio data - one Float32Array per channel, each with 128 samples */
    readonly channels: ReadonlyArray<Float32Array>
    /** Cumulative frame index (0, 128, 256, ...) */
    readonly frameIndex: int
    /** Sample rate of the audio context */
    readonly sampleRate: number
    /** Number of channels */
    readonly channelCount: int
}

export class RecordingWorklet extends AudioWorkletNode implements Terminable, SampleLoader {
    readonly #terminator: Terminator = new Terminator()

    readonly uuid: UUID.Bytes = UUID.generate()

    readonly #output: Array<ReadonlyArray<Float32Array>>
    readonly #notifier: Notifier<SampleLoaderState>
    readonly #chunkNotifier: Notifier<RecordingChunk> = new Notifier<RecordingChunk>()
    readonly #reader: RingBuffer.Reader
    readonly #peakWriter: PeaksWriter
    readonly #captureId: UUID.Bytes

    #data: Option<AudioData> = Option.None
    #peaks: Option<Peaks> = Option.None
    #isRecording: boolean = true
    #limitSamples: int = Number.POSITIVE_INFINITY
    #state: SampleLoaderState = {type: "record"}
    #internalPeaksEnabled: boolean = true
    #frameIndex: int = 0

    constructor(context: BaseAudioContext, config: RingBuffer.Config, outputLatency: number, captureId: UUID.Bytes) {
        super(context, "recording-processor", {
            numberOfInputs: 1,
            channelCount: config.numberOfChannels,
            channelCountMode: "explicit",
            processorOptions: config
        })

        this.#captureId = captureId
        this.#peakWriter = new PeaksWriter(config.numberOfChannels)
        this.#peaks = Option.wrap(this.#peakWriter)
        this.#output = []
        this.#notifier = new Notifier<SampleLoaderState>()
        this.#reader = RingBuffer.reader(config, array => {
            if (this.#isRecording) {
                this.#output.push(array)
                const latencyInSamples = (outputLatency * this.context.sampleRate) | 0
                if (this.numberOfFrames >= latencyInSamples) {
                    if (this.#internalPeaksEnabled) {
                        this.#peakWriter.append(array)
                    }
                }

                // Notify external chunk subscribers
                this.#chunkNotifier.notify({
                    recordingId: UUID.toString(this.uuid),
                    captureId: UUID.toString(this.#captureId),
                    channels: array,
                    frameIndex: this.#frameIndex,
                    sampleRate: this.context.sampleRate,
                    channelCount: array.length
                })
                this.#frameIndex += array[0].length

                const need = this.numberOfFrames - latencyInSamples
                if (need >= this.#limitSamples) {
                    this.#finalize().catch(error => console.warn(error))
                }
            }
        })
    }

    /** Subscribe to receive audio chunks in real-time during recording */
    subscribeToChunks(observer: Observer<RecordingChunk>): Subscription {
        return this.#chunkNotifier.subscribe(observer)
    }

    /** Disable internal peak generation (use when handling peaks externally) */
    disableInternalPeaks(): void {
        this.#internalPeaksEnabled = false
    }

    /** Get the capture device UUID associated with this recording */
    get captureId(): UUID.Bytes {
        return this.#captureId
    }

    own<T extends Terminable>(terminable: T): T {return this.#terminator.own(terminable)}

    limit(count: int): void {this.#limitSamples = count}

    setFillLength(value: int): void {this.#peakWriter.numFrames = value}

    get numberOfFrames(): int {return this.#output.length * RenderQuantum}
    get data(): Option<AudioData> {return this.#data}
    get peaks(): Option<Peaks> {return this.#peaks.isEmpty() ? Option.wrap(this.#peakWriter) : this.#peaks}
    get state(): SampleLoaderState {return this.#state}

    invalidate(): void {}

    subscribe(observer: Observer<SampleLoaderState>): Subscription {
        if (this.#state.type === "loaded") {
            observer(this.#state)
            return Terminable.Empty
        }
        return this.#notifier.subscribe(observer)
    }

    terminate(): void {
        this.#reader.stop()
        this.#isRecording = false
        this.#terminator.terminate()
    }

    toString(): string {return `{RecordingWorklet}`}

    async #finalize(): Promise<SampleStorage.NewSample> {
        this.#isRecording = false
        this.#reader.stop()
        if (this.#output.length === 0) {return panic("No recording data available")}
        const totalSamples: int = this.#limitSamples
        const sample_rate = this.context.sampleRate
        const numberOfChannels = this.channelCount
        const frames = mergeChunkPlanes(this.#output, RenderQuantum, this.#output.length * RenderQuantum)
            .map(frame => frame.slice(-totalSamples))
        const audioData: AudioData = {
            sampleRate: sample_rate,
            numberOfChannels,
            numberOfFrames: totalSamples,
            frames
        }
        this.#data = Option.wrap(audioData)
        const shifts = SamplePeaks.findBestFit(totalSamples)
        const peaks = await Workers
            .Peak.generateAsync(Progress.Empty, shifts, frames, totalSamples, numberOfChannels)
        this.#peaks = Option.wrap(SamplePeaks.from(new ByteArrayInput(peaks)))
        const bpm = BPMTools.detect(frames[0], sample_rate)
        const duration = totalSamples / sample_rate
        const meta: SampleMetaData = {name: "Recording", bpm, sample_rate, duration, origin: "recording"}
        const sample: SampleStorage.NewSample = {
            uuid: this.uuid,
            audio: audioData,
            peaks: peaks as ArrayBuffer,
            meta
        }
        await SampleStorage.get().save(sample)
        this.#setState({type: "loaded"})
        this.terminate()
        return sample
    }

    #setState(value: SampleLoaderState): void {
        this.#state = value
        this.#notifier.notify(this.#state)
    }
}