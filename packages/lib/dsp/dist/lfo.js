import { ClassicWaveform } from "./classic-waveform";
export class LFO {
    sampleRate;
    #phase = 0.0;
    constructor(sampleRate) {
        this.sampleRate = sampleRate;
    }
    fill(buffer, shape, frequency, fromIndex, toIndex) {
        const phaseInc = frequency / this.sampleRate;
        switch (shape) {
            case ClassicWaveform.sine: {
                for (let i = fromIndex; i < toIndex; i++) {
                    buffer[i] = Math.sin(this.#phase * Math.PI * 2.0);
                    this.#phase += phaseInc;
                    if (this.#phase >= 1.0) {
                        this.#phase -= 1.0;
                    }
                }
                break;
            }
            case ClassicWaveform.triangle: {
                for (let i = fromIndex; i < toIndex; i++) {
                    const phase = this.#phase % 1.0;
                    buffer[i] = 4.0 * Math.abs(phase - 0.5) - 1.0;
                    this.#phase += phaseInc;
                    if (this.#phase >= 1.0) {
                        this.#phase -= 1.0;
                    }
                }
                break;
            }
            case ClassicWaveform.saw: {
                for (let i = fromIndex; i < toIndex; i++) {
                    const phase = this.#phase % 1.0;
                    buffer[i] = 2.0 * phase - 1.0;
                    this.#phase += phaseInc;
                    if (this.#phase >= 1.0) {
                        this.#phase -= 1.0;
                    }
                }
                break;
            }
            case ClassicWaveform.square: {
                for (let i = fromIndex; i < toIndex; i++) {
                    const phase = this.#phase % 1.0;
                    buffer[i] = phase < 0.5 ? 1.0 : -1.0;
                    this.#phase += phaseInc;
                    if (this.#phase >= 1.0) {
                        this.#phase -= 1.0;
                    }
                }
                break;
            }
        }
    }
    reset() {
        this.#phase = 0.0;
    }
}
