import { FloatArray, int, unitValue } from "./lang";
export interface Random {
    setSeed(value: int): void;
    nextDouble(min: number, max: number): number;
    nextInt(min: int, max: int): int;
    nextElement<T>(array: ArrayLike<T>): T;
    nextBoolean(): boolean;
    uniform(): unitValue;
}
export declare namespace Random {
    const create: (seed?: int) => Random;
    /**
     * Generates a monotone ascending sequence of random unitValue numbers.
     * @param target The target array to fill with random values.
     * @param noise Tell the method how noisy the sequence should be. 0 leads to a linear sequence.
     * @param random The random number generator to use.
     * @returns The target array.
     */
    const monotoneAscending: (target: FloatArray, noise?: int, random?: Random) => FloatArray;
}
export declare class Mulberry32 implements Random {
    #private;
    constructor(seed: int);
    setSeed(value: int): void;
    nextDouble(min: number, max: number): number;
    nextInt(min: int, max: int): int;
    nextElement<T>(array: ArrayLike<T>): T;
    nextBoolean(): boolean;
    uniform(): unitValue;
}
//# sourceMappingURL=random.d.ts.map