import { ClassicWaveform } from "./classic-waveform";
export class BandLimitedOscillator {
    #invSampleRate;
    #phase = 0.0;
    #integrator = 0.0;
    constructor(sampleRate) {
        this.#invSampleRate = 1.0 / sampleRate;
    }
    generate(output, frequency, waveform, fromIndex, toIndex) {
        const phaseInc = frequency * this.#invSampleRate;
        switch (waveform) {
            case ClassicWaveform.sine:
                this.#genSineConst(output, phaseInc, fromIndex, toIndex);
                break;
            case ClassicWaveform.saw:
                this.#genSawConst(output, phaseInc, fromIndex, toIndex);
                break;
            case ClassicWaveform.square:
                this.#genSquareConst(output, phaseInc, fromIndex, toIndex);
                break;
            case ClassicWaveform.triangle:
                this.#genTriangleConst(output, phaseInc, fromIndex, toIndex);
                break;
        }
    }
    generateFromFrequencies(output, freqBuffer, waveform, fromIndex, toIndex) {
        switch (waveform) {
            case ClassicWaveform.sine:
                this.#genSine(output, freqBuffer, fromIndex, toIndex);
                break;
            case ClassicWaveform.saw:
                this.#genSaw(output, freqBuffer, fromIndex, toIndex);
                break;
            case ClassicWaveform.square:
                this.#genSquare(output, freqBuffer, fromIndex, toIndex);
                break;
            case ClassicWaveform.triangle:
                this.#genTriangle(output, freqBuffer, fromIndex, toIndex);
                break;
        }
    }
    #genSineConst(output, phaseInc, fromIndex, toIndex) {
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            output[i] = Math.sin(2.0 * Math.PI * (phase % 1.0));
            phase += phaseInc;
        }
        this.#phase = phase;
    }
    #genSawConst(output, phaseInc, fromIndex, toIndex) {
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            const t = phase % 1.0;
            output[i] = 2.0 * t - 1.0 - polyBLEP(t, phaseInc);
            phase += phaseInc;
        }
        this.#phase = phase;
    }
    #genSquareConst(output, phaseInc, fromIndex, toIndex) {
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            const t = phase % 1.0;
            output[i] = (t < 0.5 ? 1.0 : -1.0) + polyBLEP(t, phaseInc) - polyBLEP((t + 0.5) % 1.0, phaseInc);
            phase += phaseInc;
        }
        this.#phase = phase;
    }
    #genTriangleConst(output, phaseInc, fromIndex, toIndex) {
        let phase = this.#phase;
        let integrator = this.#integrator;
        const scale = 4.0 * phaseInc;
        for (let i = fromIndex; i < toIndex; i++) {
            const t = phase % 1.0;
            const sq = (t < 0.5 ? 1.0 : -1.0) + polyBLEP(t, phaseInc) - polyBLEP((t + 0.5) % 1.0, phaseInc);
            integrator = integrator * 0.9995 + sq * scale;
            output[i] = integrator;
            phase += phaseInc;
        }
        this.#phase = phase;
        this.#integrator = integrator;
    }
    #genSine(output, freqBuffer, fromIndex, toIndex) {
        const invSR = this.#invSampleRate;
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            output[i] = Math.sin(2.0 * Math.PI * (phase % 1.0));
            phase += freqBuffer[i] * invSR;
        }
        this.#phase = phase;
    }
    #genSaw(output, freqBuffer, fromIndex, toIndex) {
        const invSR = this.#invSampleRate;
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            const phaseInc = freqBuffer[i] * invSR;
            const t = phase % 1.0;
            output[i] = 2.0 * t - 1.0 - polyBLEP(t, phaseInc);
            phase += phaseInc;
        }
        this.#phase = phase;
    }
    #genSquare(output, freqBuffer, fromIndex, toIndex) {
        const invSR = this.#invSampleRate;
        let phase = this.#phase;
        for (let i = fromIndex; i < toIndex; i++) {
            const phaseInc = freqBuffer[i] * invSR;
            const t = phase % 1.0;
            output[i] = (t < 0.5 ? 1.0 : -1.0) + polyBLEP(t, phaseInc) - polyBLEP((t + 0.5) % 1.0, phaseInc);
            phase += phaseInc;
        }
        this.#phase = phase;
    }
    #genTriangle(output, freqBuffer, fromIndex, toIndex) {
        const invSR = this.#invSampleRate;
        let phase = this.#phase;
        let integrator = this.#integrator;
        for (let i = fromIndex; i < toIndex; i++) {
            const inc = freqBuffer[i] * invSR;
            const t = phase % 1.0;
            const sq = (t < 0.5 ? 1.0 : -1.0) + polyBLEP(t, inc) - polyBLEP((t + 0.5) % 1.0, inc);
            integrator = integrator * 0.9995 + sq * (4.0 * inc);
            output[i] = integrator;
            phase += inc;
        }
        this.#phase = phase;
        this.#integrator = integrator;
    }
}
const polyBLEP = (t, dt) => {
    if (t < dt) {
        t /= dt;
        return t + t - t * t - 1.0;
    }
    else if (t > 1.0 - dt) {
        t = (t - 1.0) / dt;
        return t * t + t + t + 1.0;
    }
    return 0.0;
};
