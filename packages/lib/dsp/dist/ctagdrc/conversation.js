// Helper functions for dB conversion
export const gainToDecibels = (gain) => gain > 0 ? 20.0 * Math.log10(gain) : -100.0;
export const decibelsToGain = (db) => Math.pow(10.0, db * 0.05);
