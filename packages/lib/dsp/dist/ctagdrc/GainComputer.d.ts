import { int } from "@opendaw/lib-std";
export declare class GainComputer {
    #private;
    setThreshold(newThreshold: number): void;
    setRatio(newRatio: number): void;
    setKnee(newKnee: number): void;
    applyCompression(input: number): number;
    applyCompressionToBuffer(src: Float32Array, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=GainComputer.d.ts.map