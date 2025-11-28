export class Smooth {
    #a;
    value = 0.0;
    constructor(time, sampleRate) {
        this.#a = 1.0 - Math.exp(-1.0 / (time * sampleRate));
    }
    process(x) {
        this.value += this.#a * (x - this.value);
        return this.value;
    }
}
