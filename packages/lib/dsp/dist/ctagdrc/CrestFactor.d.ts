import { int } from "@opendaw/lib-std";
export declare class CrestFactor {
    #private;
    constructor(sampleRate: number);
    process(src: Float32Array, fromIndex: int, toIndex: int): void;
    getAvgAttack(): number;
    getAvgRelease(): number;
}
//# sourceMappingURL=CrestFactor.d.ts.map