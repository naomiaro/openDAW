// Pulses per quarter note (PPQN)
// 960 = 3*5*2^6
const Quarter = 960;
const Bar = Quarter << 2; // 3_840
const SemiQuaver = Quarter >>> 2; // 240
const fromSignature = (nominator, denominator) => Math.floor(Bar / denominator) * nominator;
const toParts = (ppqn, nominator = 4, denominator = 4) => {
    const lowerPulses = fromSignature(1, denominator);
    const beats = Math.floor(ppqn / lowerPulses);
    const bars = Math.floor(beats / nominator);
    const remainingPulses = Math.floor(ppqn) - fromSignature(bars * nominator, denominator);
    const ticks = remainingPulses % lowerPulses;
    const semiquavers = Math.floor(ticks / SemiQuaver);
    const remainingTicks = ticks % SemiQuaver;
    return {
        bars,
        beats: beats - bars * nominator,
        semiquavers,
        ticks: remainingTicks
    };
};
const secondsToPulses = (seconds, bpm) => seconds * bpm / 60.0 * Quarter;
const pulsesToSeconds = (pulses, bpm) => (pulses * 60.0 / Quarter) / bpm;
const secondsToBpm = (seconds, pulses) => (pulses * 60.0 / Quarter) / seconds;
const samplesToPulses = (samples, bpm, sampleRate) => secondsToPulses(samples / sampleRate, bpm);
const pulsesToSamples = (pulses, bpm, sampleRate) => pulsesToSeconds(pulses, bpm) * sampleRate;
export const PPQN = {
    Bar,
    Quarter,
    SemiQuaver,
    fromSignature,
    toParts,
    secondsToPulses,
    pulsesToSeconds,
    secondsToBpm,
    samplesToPulses,
    pulsesToSamples,
    toString: (pulses, nominator = 4, denominator = 4) => {
        const { bars, beats, semiquavers, ticks } = toParts(pulses | 0, nominator, denominator);
        return `${bars + 1}.${beats + 1}.${semiquavers + 1}:${ticks}`;
    }
};
