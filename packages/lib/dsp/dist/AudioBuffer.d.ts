import { int } from "@opendaw/lib-std";
export declare class AudioBuffer {
    #private;
    static Empty: AudioBuffer;
    constructor(numberOfChannels?: int);
    clear(start?: int, end?: int): void;
    numChannels(): int;
    getChannel(channelIndex: int): Float32Array;
    assertSanity(): void;
    channels(): ReadonlyArray<Float32Array>;
    replace(output: AudioBuffer): void;
    replaceInto(target: ReadonlyArray<Float32Array>): void;
    mixInto(target: ReadonlyArray<Float32Array>): void;
}
//# sourceMappingURL=AudioBuffer.d.ts.map