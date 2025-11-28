import { int } from "@opendaw/lib-std";
import { AudioBuffer } from "../AudioBuffer";
export declare class DelayLine {
    #private;
    constructor(sampleRate: number, delayInSeconds: number, maxBlockSize: int, numChannels: int);
    process(buffer: AudioBuffer, fromIndex: int, toIndex: int): void;
}
//# sourceMappingURL=DelayLine.d.ts.map