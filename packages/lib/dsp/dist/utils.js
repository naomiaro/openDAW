const LogDb = Math.log(10.0) / 20.0;
export const midiToHz = (note = 60.0, baseFrequency = 440.0) => baseFrequency * Math.pow(2.0, (note + 3.0) / 12.0 - 6.0);
export const hzToMidi = (hz, baseFrequency = 440.0) => (12.0 * Math.log(hz / baseFrequency) + 69.0 * Math.LN2) / Math.LN2;
export const dbToGain = (db) => Math.exp(db * LogDb);
export const gainToDb = (gain) => Math.log(gain) / LogDb;
export const velocityToGain = (velocity) => dbToGain(20 * Math.log10(velocity));
export const barsToBpm = (bars, duration) => (bars * 240.0) / duration;
export const bpmToBars = (bpm, duration) => (bpm * duration) / 240.0;
export const estimateBpm = (duration, maxBpm = 180.0) => {
    const bpm = barsToBpm(Math.pow(2.0, Math.floor(Math.log(bpmToBars(maxBpm, duration)) / Math.LN2)), duration);
    return Math.round(bpm * 1000.0) / 1000.0;
};
export const semitoneToHz = (semitones) => 440 * Math.pow(2.0, (semitones - 69.0) / 12.0);
export const hzToSemitone = (hz) => 69.0 + 12.0 * Math.log2(hz / 440.0);
