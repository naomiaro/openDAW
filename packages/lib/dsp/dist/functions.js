export const wavefold = (input) => {
    const scaled = 0.25 * input + 0.25;
    return 4.0 * (Math.abs(scaled - Math.round(scaled)) - 0.25);
};
