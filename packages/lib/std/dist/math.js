// noinspection JSUnusedGlobalSymbols
export const TAU = Math.PI * 2.0;
export const PI_HALF = Math.PI / 2.0;
export const PI_QUART = Math.PI / 4.0;
export const INVERSE_SQRT_2 = 1.0 / Math.sqrt(2.0);
export const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
export const clampUnit = (value) => Math.max(0.0, Math.min(value, 1.0));
export const squashUnit = (value, margin) => margin + (1.0 - 2.0 * margin) * Math.max(0.0, Math.min(value, 1.0));
export const quantizeFloor = (value, interval) => Math.floor(value / interval) * interval;
export const quantizeCeil = (value, interval) => Math.ceil(value / interval) * interval;
export const quantizeRound = (value, interval) => Math.round(value / interval) * interval;
export const linear = (y1, y2, mu) => y1 + (y2 - y1) * mu;
export const exponential = (y1, y2, mu) => y1 * Math.pow(y2 / y1, mu);
export const cosine = (y1, y2, mu) => {
    const mu2 = (1.0 - Math.cos(mu * Math.PI)) * 0.5;
    return y1 * (1.0 - mu2) + y2 * mu2;
};
export const mod = (value, range) => fract(value / range) * range;
export const fract = (value) => value - Math.floor(value);
export const nextPowOf2 = (n) => Math.pow(2, Math.ceil(Math.log(n) / Math.log(2)));
export const radToDeg = (rad) => rad * 180.0 / Math.PI;
export const degToRad = (deg) => deg / 180.0 * Math.PI;
// Möbius-Ease Curve
// Only produces valid values between 0 and 1 (unitValues)
// https://www.desmos.com/calculator/ht8cytaxsz
// The inverse is h`=1-h
export const moebiusEase = (x, h) => (x * h) / ((2.0 * h - 1.0) * (x - 1.0) + h);
