import { AudioBuffer } from "./AudioBuffer";
export declare class SimpleLimiter {
    #private;
    constructor(sampleRate: number);
    clear(): void;
    replace(buffer: AudioBuffer, fromIndex: number, toIndex: number): void;
}
//# sourceMappingURL=simple-limiter.d.ts.map