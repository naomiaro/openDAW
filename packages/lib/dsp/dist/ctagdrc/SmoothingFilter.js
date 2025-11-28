// Smoothing Filter (1-pole IIR filter)
export class SmoothingFilter {
    #sampleRate;
    #a1 = 1.0;
    #b1 = 0.0;
    #state = 0.0;
    #first = true;
    constructor(sampleRate) {
        this.#sampleRate = sampleRate;
        this.#a1 = 1;
        this.#b1 = 1 - this.#a1;
    }
    process(sample) {
        if (this.#first) {
            this.#state = sample;
            this.#first = false;
        }
        this.#state = this.#a1 * sample + this.#b1 * this.#state;
    }
    setAlpha(a) {
        this.#a1 = a;
        this.#b1 = 1 - this.#a1;
    }
    setAlphaWithTime(timeInSeconds) {
        this.#a1 = Math.exp(-1.0 / (this.#sampleRate * timeInSeconds));
        this.#b1 = 1 - this.#a1;
    }
    getState() {
        return this.#state;
    }
}
