export class C64Noise {
    #state = 0x7FFFFF; // 23-bit LFSR
    #mask = (1 << 23) - 1;
    #phaseInc;
    #phase = 0;
    constructor(frequency, sampleRate) {
        this.#phaseInc = frequency / sampleRate;
    }
    process() {
        this.#phase += this.#phaseInc;
        while (this.#phase >= 1.0) {
            this.#phase -= 1.0;
            // advance the LFSR every phase wrap
            const bit = ((this.#state >> 22) ^ (this.#state >> 17)) & 1;
            this.#state = ((this.#state << 1) | bit) & this.#mask;
        }
        // the SID outputs the top 12 bits as a DAC value
        const value = (this.#state >> 11) & 0xFFF;
        return (value / 2047.5) - 1.0;
    }
    reset() {
        this.#state = 0x7FFFFF;
        this.#phase = 0;
    }
}
