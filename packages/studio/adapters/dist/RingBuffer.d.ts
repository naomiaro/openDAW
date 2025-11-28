import { int, Procedure } from "@opendaw/lib-std";
export declare namespace RingBuffer {
    interface Config {
        sab: SharedArrayBuffer;
        numChunks: int;
        numberOfChannels: int;
        bufferSize: int;
    }
    interface Writer {
        write(channels: ReadonlyArray<Float32Array>): void;
    }
    interface Reader {
        stop(): void;
    }
    const reader: ({ sab, numChunks, numberOfChannels, bufferSize }: Config, append: Procedure<Array<Float32Array>>) => Reader;
    const writer: ({ sab, numChunks, numberOfChannels, bufferSize }: Config) => Writer;
}
export declare const mergeChunkPlanes: (chunks: ReadonlyArray<ReadonlyArray<Float32Array>>, bufferSize: int, maxFrames?: int) => ReadonlyArray<Float32Array>;
//# sourceMappingURL=RingBuffer.d.ts.map