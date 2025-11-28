import { panic } from "./lang";
export var Random;
(function (Random) {
    Random.create = (seed = 0xF123F42) => new Mulberry32(seed);
    /**
     * Generates a monotone ascending sequence of random unitValue numbers.
     * @param target The target array to fill with random values.
     * @param noise Tell the method how noisy the sequence should be. 0 leads to a linear sequence.
     * @param random The random number generator to use.
     * @returns The target array.
     */
    Random.monotoneAscending = (target, noise = 128, random = Random.create()) => {
        const length = target.length;
        if (length < 2) {
            return panic("Array must have at least 2 elements");
        }
        let sum = 0.0;
        for (let i = 1; i < length; i++) {
            const value = Math.floor(random.uniform() * (1.0 + noise)) + 1.0;
            target[i] = value;
            sum += value;
        }
        let acc = 0.0;
        target[0] = 0.0;
        for (let i = 1; i < length; i++) {
            acc += target[i];
            target[i] = acc / sum;
        }
        return target;
    };
})(Random || (Random = {}));
export class Mulberry32 {
    #seed = 0;
    constructor(seed) { this.setSeed(seed); }
    setSeed(value) { this.#seed = value & 0xFFFFFFFF; }
    nextDouble(min, max) { return min + this.uniform() * (max - min); }
    nextInt(min, max) { return min + Math.floor(this.uniform() * (max - min)); }
    nextElement(array) { return array[Math.floor(this.uniform() * array.length)]; }
    nextBoolean() { return this.uniform() < 0.5; }
    uniform() {
        let t = this.#seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296.0;
    }
}
