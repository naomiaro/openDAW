import { int } from "@opendaw/lib-std";
export declare class LevelDetector {
    #private;
    constructor(sampleRate: number);
    setAttack(attack: number): void;
    setRelease(release: number): void;
    setAutoAttack(isEnabled: boolean): void;
    setAutoRelease(isEnabled: boolean): void;
    applyBallistics(src: Float32Array, fromIndex: int, toIndex: int): void;
    processCrestFactor(src: Float32Array, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=LevelDetector.d.ts.map