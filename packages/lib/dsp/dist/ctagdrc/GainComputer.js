import { gainToDecibels } from "./conversation";
export class GainComputer {
    #threshold = -20.0;
    #ratio = 2.0;
    #knee = 6.0;
    #kneeHalf = 3.0;
    #slope = -0.5;
    setThreshold(newThreshold) {
        this.#threshold = newThreshold;
    }
    setRatio(newRatio) {
        if (this.#ratio !== newRatio) {
            this.#ratio = newRatio;
            if (this.#ratio > 23.9) {
                this.#ratio = -Infinity;
            }
            this.#slope = 1.0 / newRatio - 1.0;
        }
    }
    setKnee(newKnee) {
        if (newKnee !== this.#knee) {
            this.#knee = newKnee;
            this.#kneeHalf = newKnee / 2.0;
        }
    }
    applyCompression(input) {
        const overshoot = input - this.#threshold;
        if (overshoot <= -this.#kneeHalf) {
            return 0.0;
        }
        if (overshoot > -this.#kneeHalf && overshoot <= this.#kneeHalf) {
            return 0.5 * this.#slope * ((overshoot + this.#kneeHalf) * (overshoot + this.#kneeHalf)) / this.#knee;
        }
        return this.#slope * overshoot;
    }
    applyCompressionToBuffer(src, fromIndex, toIndex) {
        for (let i = fromIndex; i < toIndex; ++i) {
            const level = Math.max(Math.abs(src[i]), 1e-6);
            const levelInDecibels = gainToDecibels(level);
            src[i] = this.applyCompression(levelInDecibels);
        }
    }
}
