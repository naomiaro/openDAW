import { asDefined, Option } from "@opendaw/lib-std";
import { EngineWorklet } from "./EngineWorklet";
import { MeterWorklet } from "./MeterWorklet";
import { RecordingWorklet } from "./RecordingWorklet";
import { RenderQuantum } from "./RenderQuantum";
export class AudioWorklets {
    static install(url) {
        console.debug(`WorkletUrl: '${url}'`);
        this.#workletUrl = Option.wrap(url);
    }
    static #workletUrl = Option.None;
    static async createFor(context) {
        return context.audioWorklet.addModule(this.#workletUrl.unwrap("WorkletUrl is missing (call 'install' first)")).then(() => {
            const worklets = new AudioWorklets(context);
            this.#map.set(context, worklets);
            return worklets;
        });
    }
    static get(context) { return asDefined(this.#map.get(context), "Worklets not installed"); }
    static #map = new WeakMap();
    #context;
    constructor(context) { this.#context = context; }
    get context() { return this.#context; }
    createMeter(numberOfChannels) {
        return new MeterWorklet(this.#context, numberOfChannels);
    }
    createEngine({ project, exportConfiguration, options }) {
        return new EngineWorklet(this.#context, project, exportConfiguration, options);
    }
    createRecording(numberOfChannels, numChunks, outputLatency, captureId) {
        const audioBytes = numberOfChannels * numChunks * RenderQuantum * Float32Array.BYTES_PER_ELEMENT;
        const pointerBytes = Int32Array.BYTES_PER_ELEMENT * 2;
        const sab = new SharedArrayBuffer(audioBytes + pointerBytes);
        const buffer = { sab, numChunks, numberOfChannels, bufferSize: RenderQuantum };
        return new RecordingWorklet(this.#context, buffer, outputLatency, captureId);
    }
}
