import { SamplePeakWorker } from "@opendaw/lib-fusion";
import { Arrays, assert } from "@opendaw/lib-std";
import { RenderQuantum } from "./RenderQuantum";
export class PeaksWriter {
    numChannels;
    data;
    stages;
    dataOffset = 0;
    shift = 7;
    dataIndex;
    #numFrames = 0 | 0;
    constructor(numChannels) {
        this.numChannels = numChannels;
        this.data = Arrays.create(() => new Int32Array(1 << 10), numChannels);
        this.dataIndex = new Int32Array(numChannels);
        this.stages = [this];
    }
    set numFrames(value) { this.#numFrames = value; }
    get numFrames() { return this.#numFrames; }
    get numPeaks() { return Math.ceil(this.#numFrames / (1 << this.shift)); }
    unitsEachPeak() { return 1 << this.shift; }
    append(frames) {
        for (let channel = 0; channel < this.numChannels; ++channel) {
            const channelFrames = frames[channel];
            assert(channelFrames.length === RenderQuantum, "Invalid number of frames.");
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < RenderQuantum; ++i) {
                const frame = channelFrames[i];
                min = Math.min(frame, min);
                max = Math.max(frame, max);
            }
            const channelData = this.data[channel];
            channelData[this.dataIndex[channel]++] = SamplePeakWorker.pack(min, max);
            if (this.dataIndex[channel] === channelData.length) {
                const newArray = new Int32Array(channelData.length << 1);
                newArray.set(channelData, 0);
                this.data[channel] = newArray;
            }
        }
    }
    nearest(_unitsPerPixel) { return this.stages.at(0) ?? null; }
}
