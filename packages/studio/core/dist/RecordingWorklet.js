import { ByteArrayInput, Notifier, Option, panic, Progress, Terminable, Terminator, UUID } from "@opendaw/lib-std";
import { BPMTools } from "@opendaw/lib-dsp";
import { SamplePeaks } from "@opendaw/lib-fusion";
import { mergeChunkPlanes, RingBuffer } from "@opendaw/studio-adapters";
import { SampleStorage } from "./samples";
import { RenderQuantum } from "./RenderQuantum";
import { Workers } from "./Workers";
import { PeaksWriter } from "./PeaksWriter";
export class RecordingWorklet extends AudioWorkletNode {
    #terminator = new Terminator();
    uuid = UUID.generate();
    #output;
    #notifier;
    #chunkNotifier = new Notifier();
    #reader;
    #peakWriter;
    #captureId;
    #data = Option.None;
    #peaks = Option.None;
    #isRecording = true;
    #limitSamples = Number.POSITIVE_INFINITY;
    #state = { type: "record" };
    #internalPeaksEnabled = true;
    #frameIndex = 0;
    constructor(context, config, outputLatency, captureId) {
        super(context, "recording-processor", {
            numberOfInputs: 1,
            channelCount: config.numberOfChannels,
            channelCountMode: "explicit",
            processorOptions: config
        });
        this.#captureId = captureId;
        this.#peakWriter = new PeaksWriter(config.numberOfChannels);
        this.#peaks = Option.wrap(this.#peakWriter);
        this.#output = [];
        this.#notifier = new Notifier();
        this.#reader = RingBuffer.reader(config, array => {
            if (this.#isRecording) {
                this.#output.push(array);
                const latencyInSamples = (outputLatency * this.context.sampleRate) | 0;
                if (this.numberOfFrames >= latencyInSamples) {
                    if (this.#internalPeaksEnabled) {
                        this.#peakWriter.append(array);
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
                });
                this.#frameIndex += array[0].length;
                const need = this.numberOfFrames - latencyInSamples;
                if (need >= this.#limitSamples) {
                    this.#finalize().catch(error => console.warn(error));
                }
            }
        });
    }
    /** Subscribe to receive audio chunks in real-time during recording */
    subscribeToChunks(observer) {
        return this.#chunkNotifier.subscribe(observer);
    }
    /** Disable internal peak generation (use when handling peaks externally) */
    disableInternalPeaks() {
        this.#internalPeaksEnabled = false;
    }
    /** Get the capture device UUID associated with this recording */
    get captureId() {
        return this.#captureId;
    }
    own(terminable) { return this.#terminator.own(terminable); }
    limit(count) { this.#limitSamples = count; }
    setFillLength(value) { this.#peakWriter.numFrames = value; }
    get numberOfFrames() { return this.#output.length * RenderQuantum; }
    get data() { return this.#data; }
    get peaks() { return this.#peaks.isEmpty() ? Option.wrap(this.#peakWriter) : this.#peaks; }
    get state() { return this.#state; }
    invalidate() { }
    subscribe(observer) {
        if (this.#state.type === "loaded") {
            observer(this.#state);
            return Terminable.Empty;
        }
        return this.#notifier.subscribe(observer);
    }
    terminate() {
        this.#reader.stop();
        this.#isRecording = false;
        this.#terminator.terminate();
    }
    toString() { return `{RecordingWorklet}`; }
    async #finalize() {
        this.#isRecording = false;
        this.#reader.stop();
        if (this.#output.length === 0) {
            return panic("No recording data available");
        }
        const totalSamples = this.#limitSamples;
        const sample_rate = this.context.sampleRate;
        const numberOfChannels = this.channelCount;
        const frames = mergeChunkPlanes(this.#output, RenderQuantum, this.#output.length * RenderQuantum)
            .map(frame => frame.slice(-totalSamples));
        const audioData = {
            sampleRate: sample_rate,
            numberOfChannels,
            numberOfFrames: totalSamples,
            frames
        };
        this.#data = Option.wrap(audioData);
        const shifts = SamplePeaks.findBestFit(totalSamples);
        const peaks = await Workers
            .Peak.generateAsync(Progress.Empty, shifts, frames, totalSamples, numberOfChannels);
        this.#peaks = Option.wrap(SamplePeaks.from(new ByteArrayInput(peaks)));
        const bpm = BPMTools.detect(frames[0], sample_rate);
        const duration = totalSamples / sample_rate;
        const meta = { name: "Recording", bpm, sample_rate, duration, origin: "recording" };
        const sample = {
            uuid: this.uuid,
            audio: audioData,
            peaks: peaks,
            meta
        };
        await SampleStorage.get().save(sample);
        this.#setState({ type: "loaded" });
        this.terminate();
        return sample;
    }
    #setState(value) {
        this.#state = value;
        this.#notifier.notify(this.#state);
    }
}
