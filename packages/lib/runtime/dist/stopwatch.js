export const stopwatch = (level = "debug") => {
    const startTime = performance.now();
    return {
        lab: (label) => console[level].call(console, `${label} in ${(performance.now() - startTime).toFixed(1)}ms`)
    };
};
