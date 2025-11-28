import { BiquadCoeff } from "./biquad-coeff";
import { Arrays, clampUnit } from "@opendaw/lib-std";
export class BiquadMono {
    #x1 = 0.0;
    #x2 = 0.0;
    #y1 = 0.0;
    #y2 = 0.0;
    reset() {
        this.#x1 = 0.0;
        this.#x2 = 0.0;
        this.#y1 = 0.0;
        this.#y2 = 0.0;
    }
    process({ a1, a2, b0, b1, b2 }, source, target, fromIndex, toIndex) {
        let x1 = this.#x1;
        let x2 = this.#x2;
        let y1 = this.#y1;
        let y2 = this.#y2;
        for (let i = fromIndex; i < toIndex; i++) {
            const x = source[i];
            const y = target[i] = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) + 1e-18 - 1e-18;
            x2 = x1;
            x1 = x;
            y2 = y1;
            y1 = y;
        }
        this.#x1 = x1;
        this.#x2 = x2;
        this.#y1 = y1;
        this.#y2 = y2;
    }
    processFrame({ a1, a2, b0, b1, b2 }, x) {
        const y = (b0 * x + b1 * this.#x1 + b2 * this.#x2 - a1 * this.#y1 - a2 * this.#y2) + 1e-18 - 1e-18;
        this.#x2 = this.#x1;
        this.#x1 = x;
        this.#y2 = this.#y1;
        this.#y1 = y;
        return y;
    }
}
export class BiquadStack {
    #stack;
    #order;
    constructor(maxOrder) {
        this.#stack = Arrays.create(() => new BiquadMono(), maxOrder);
        this.#order = this.#stack.length;
    }
    get order() { return this.#order; }
    set order(value) {
        if (this.#order === value) {
            return;
        }
        this.#order = value;
        this.reset();
    }
    reset() { this.#stack.forEach(processor => processor.reset()); }
    process(coeff, source, target, fromIndex, toIndex) {
        for (let i = 0; i < this.#order; i++) {
            this.#stack[i].process(coeff, source, target, fromIndex, toIndex);
            source = target;
        }
    }
    processFrame(coeff, x) {
        for (let i = 0; i < this.#order; i++) {
            x = this.#stack[i].processFrame(coeff, x);
        }
        return x;
    }
}
const LUT_SIZE = 512;
export class ModulatedBiquad {
    #freqLUT;
    #coeff = new BiquadCoeff();
    #filter;
    #lastIdx = -1;
    constructor(minFreq, maxFreq, sampleRate) {
        this.#filter = new BiquadStack(4);
        this.#freqLUT = new Float32Array(LUT_SIZE + 1);
        const logRatio = Math.log(maxFreq / minFreq);
        const invSampleRate = 1.0 / sampleRate;
        for (let i = 0; i <= LUT_SIZE; i++) {
            this.#freqLUT[i] = minFreq * Math.exp(i / LUT_SIZE * logRatio) * invSampleRate;
        }
    }
    get order() { return this.#filter.order; }
    set order(value) { this.#filter.order = value; }
    reset() { this.#filter.reset(); }
    process(input, output, cutoffs, q, fromIndex, toIndex) {
        const freqLUT = this.#freqLUT;
        const filter = this.#filter;
        const coeff = this.#coeff;
        const qReduced = q / (filter.order ** 1.25);
        let from = fromIndex;
        let lastIdx = this.#lastIdx;
        while (from < toIndex) {
            const idx = Math.floor(clampUnit(cutoffs[from]) * LUT_SIZE);
            let to = from + 1;
            while (to < toIndex && Math.floor(clampUnit(cutoffs[to]) * LUT_SIZE) === idx)
                ++to;
            if (idx !== lastIdx) {
                lastIdx = idx;
                coeff.setLowpassParams(freqLUT[idx], qReduced);
            }
            filter.process(coeff, input, output, from, to);
            from = to;
        }
        this.#lastIdx = lastIdx;
    }
}
