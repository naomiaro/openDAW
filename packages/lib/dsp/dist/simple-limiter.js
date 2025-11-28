export class SimpleLimiter {
    static #LIMITER_ATTACK_SEC = 0.003;
    static #LIMITER_RELEASE_SEC = 0.020;
    #envelopeAttack;
    #envelopeRelease;
    #envelope = 0.0;
    constructor(sampleRate) {
        this.#envelopeAttack = Math.pow(0.01, 1.0 / (SimpleLimiter.#LIMITER_ATTACK_SEC * sampleRate));
        this.#envelopeRelease = Math.pow(0.01, 1.0 / (SimpleLimiter.#LIMITER_RELEASE_SEC * sampleRate));
    }
    clear() { this.#envelope = 0.0; }
    replace(buffer, fromIndex, toIndex) {
        const attack = this.#envelopeAttack;
        const release = this.#envelopeRelease;
        const [bufL, bufR] = buffer.channels();
        let env = this.#envelope;
        for (let i = fromIndex; i < toIndex; ++i) {
            const l = bufL[i];
            const r = bufR[i];
            const abs = Math.max(Math.abs(l), Math.abs(r));
            env = abs > env ? attack * (env - abs) + abs : release * (env - abs) + abs;
            if (env > 1.0) {
                const gain = 1.0 / env;
                bufL[i] = l * gain;
                bufR[i] = r * gain;
            }
        }
        this.#envelope = env;
    }
}
