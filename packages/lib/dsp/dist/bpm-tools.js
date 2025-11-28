/**
 * BPM detector (90-180 BPM) for a mono Float32Array.
 * Port of Mark Hills bpm(1) with a light "low-BPM penalty" to dodge ½-tempo aliases.
 */
export var BPMTools;
(function (BPMTools) {
    function detect(buf, sampleRate, options = {}) {
        const { interval = 64, // samples between energy taps
        scanSteps = 1_024, // coarse grid
        scanSamples = 2_048, // autodiff averages / point
        minBPM = 90, maxBPM = 180 } = options;
        const env = new Float32Array(Math.floor(buf.length / interval));
        let v = 0.0, k = 0.0, i = 0;
        for (const x of buf) {
            const z = Math.abs(x);
            v += (z - v) * (z > v ? 1 / 8 : 1 / 512);
            if (++k === interval) {
                k = 0;
                env[i++] = v;
            }
        }
        if (!env.length)
            return NaN;
        const sample = (frames, index) => frames[Math.floor(index)] ?? 0.0;
        const bpmToIv = (b) => (sampleRate / (b / 60.0)) / interval;
        const ivToBpm = (iv) => (sampleRate / (iv * interval)) * 60.0;
        const BEATS = [-32, -16, -8, -4, -2, -1, 1, 2, 4, 8, 16, 32];
        const NO_BEATS = [-0.5, -0.25, 0.25, 0.5];
        const autodiff = (iv) => {
            const mid = Math.random() * env.length;
            const v0 = sample(env, mid);
            let d = 0, t = 0;
            for (const b of BEATS) {
                const w = 1 / Math.abs(b);
                d += w * Math.abs(sample(env, mid + b * iv) - v0);
                t += w;
            }
            for (const nb of NO_BEATS) {
                const w = Math.abs(nb);
                d -= w * Math.abs(sample(env, mid + nb * iv) - v0);
                t += w;
            }
            return d / t;
        };
        const avgDiff = (iv) => {
            let s = 0.0;
            for (let i = 0; i < scanSamples; ++i)
                s += autodiff(iv);
            return s / scanSamples;
        };
        const slow = bpmToIv(minBPM);
        const fast = bpmToIv(maxBPM);
        const step = (slow - fast) / scanSteps;
        let bestBpm = minBPM, bestScore = Infinity;
        for (let iv = fast; iv <= slow; iv += step) {
            const bpm = ivToBpm(iv);
            const cost = avgDiff(iv) * (minBPM / bpm);
            if (cost < bestScore) {
                bestScore = cost;
                bestBpm = bpm;
            }
        }
        return bestBpm;
    }
    BPMTools.detect = detect;
})(BPMTools || (BPMTools = {}));
