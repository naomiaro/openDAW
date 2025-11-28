import { int } from "./lang";
export declare class Bits {
    #private;
    static readonly every: (set: int, flag: int) => boolean;
    static readonly some: (set: int, flag: int) => boolean;
    constructor(numBits?: int);
    getBit(index: int): boolean;
    setBit(index: int, value: boolean): boolean;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    set buffer(value: ArrayBufferLike);
    get buffer(): ArrayBufferLike;
    replace(buffer: ArrayBufferLike): boolean;
    toString(): string;
    clear(): void;
}
//# sourceMappingURL=bits.d.ts.map