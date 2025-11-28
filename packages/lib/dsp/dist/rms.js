export class RMS {
    #values;
    #inv;
    #index;
    #sum;
    constructor(n) {
        this.#values = new Float32Array(n);
        this.#inv = 1.0 / n;
        this.#index = 0 | 0;
        this.#sum = 0.0;
    }
    pushPop(x) {
        const squared = x * x;
        this.#sum -= this.#values[this.#index];
        this.#sum += squared;
        this.#values[this.#index] = squared;
        if (++this.#index === this.#values.length) {
            this.#index = 0;
        }
        return this.#sum <= 0.0 ? 0.0 : Math.sqrt(this.#sum * this.#inv);
    }
    processBlock(buffer, fromIndex, toIndex) {
        const values = this.#values;
        const len = values.length;
        let index = this.#index;
        let sum = this.#sum;
        for (let i = fromIndex; i < toIndex; i++) {
            const squared = buffer[i] * buffer[i];
            sum += squared - values[index];
            values[index] = squared;
            if (++index === len) {
                index = 0;
            }
        }
        this.#index = index;
        this.#sum = sum;
        return sum <= 0.0 ? 0.0 : Math.sqrt(sum * this.#inv);
    }
    clear() {
        this.#values.fill(0.0);
        this.#sum = 0.0;
        this.#index = 0 | 0;
    }
}
