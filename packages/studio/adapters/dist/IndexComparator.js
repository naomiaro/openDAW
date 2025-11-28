import { panic } from "@opendaw/lib-std";
export const IndexComparator = (a, b) => {
    if (a === b) {
        return 0;
    }
    const difference = a - b;
    if (difference === 0) {
        return panic(`Indices cannot be equal (${a}, ${b})`);
    }
    return difference;
};
