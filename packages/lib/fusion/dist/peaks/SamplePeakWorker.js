import { Arrays, Float16, panic } from "@opendaw/lib-std";
import { Communicator, stopwatch } from "@opendaw/lib-runtime";
import { Peaks, SamplePeaks } from "./Peaks";
export var SamplePeakWorker;
(function (SamplePeakWorker) {
    SamplePeakWorker.install = (messenger) => Communicator.executor(messenger.channel("peaks"), new class {
        async generateAsync(progress, shifts, frames, numFrames, numChannels) {
            return generatePeaks(progress, shifts, frames, numFrames, numChannels).toArrayBuffer();
        }
    });
    const generatePeaks = (progress, shifts, frames, numFrames, numChannels) => {
        if (frames.length !== numChannels) {
            return panic(`Invalid numberOfChannels. Expected: ${numChannels}. Got ${frames.length}`);
        }
        class State {
            min = Number.POSITIVE_INFINITY;
            max = Number.NEGATIVE_INFINITY;
            index = 0;
        }
        const time = stopwatch();
        const numShifts = shifts.length;
        const [stages, dataOffset] = initStages(shifts, numFrames);
        const data = Arrays.create(() => new Int32Array(dataOffset), numChannels);
        const minMask = (1 << stages[0].shift) - 1;
        const total = numChannels * numFrames;
        let count = 0;
        for (let channel = 0; channel < numChannels; ++channel) {
            const channelData = data[channel];
            const channelFrames = frames[channel];
            const states = Arrays.create(() => new State(), numShifts);
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            let position = 0;
            for (let i = 0; i < numFrames; ++i) {
                const frame = channelFrames[i];
                min = Math.min(frame, min);
                max = Math.max(frame, max);
                if ((++position & minMask) === 0) {
                    for (let j = 0; j < numShifts; ++j) {
                        const stage = stages[j];
                        const state = states[j];
                        state.min = Math.min(state.min, min);
                        state.max = Math.max(state.max, max);
                        if ((((1 << stage.shift) - 1) & position) === 0) {
                            channelData[stage.dataOffset + state.index++] = SamplePeakWorker.pack(state.min, state.max);
                            state.min = Number.POSITIVE_INFINITY;
                            state.max = Number.NEGATIVE_INFINITY;
                        }
                    }
                    min = Number.POSITIVE_INFINITY;
                    max = Number.NEGATIVE_INFINITY;
                }
                if ((++count & 0xFFFF) === 0) {
                    progress(count / total);
                }
            }
        }
        progress(1.0);
        time.lab(`SamplePeaks '${self.constructor.name}'`);
        return new SamplePeaks(stages, data, numFrames, numChannels);
    };
    const initStages = (shifts, numFrames) => {
        let dataOffset = 0;
        const stages = Arrays.create((index) => {
            const shift = shifts[index];
            const numPeaks = Math.ceil(numFrames / (1 << shift));
            const stage = new Peaks.Stage(shift, numPeaks, dataOffset);
            dataOffset += numPeaks;
            return stage;
        }, shifts.length);
        return [stages, dataOffset];
    };
    SamplePeakWorker.pack = (f0, f1) => {
        const bits0 = Float16.floatToIntBits(f0);
        const bits1 = Float16.floatToIntBits(f1);
        return bits0 | (bits1 << 16);
    };
})(SamplePeakWorker || (SamplePeakWorker = {}));
