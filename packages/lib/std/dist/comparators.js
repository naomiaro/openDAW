export const StringComparator = (a, b) => a > b ? 1 : b > a ? -1 : 0;
export const NumberComparator = (a, b) => a - b;
export const NumberArrayComparator = (a, b) => {
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) {
        const comparison = a[i] - b[i];
        if (comparison !== 0.0) {
            return comparison;
        }
    }
    return a.length - b.length;
};
