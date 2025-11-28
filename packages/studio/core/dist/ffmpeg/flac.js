export class FlacConverter {
    #worker;
    constructor(worker) { this.#worker = worker; }
    async convert(source, progress, options) {
        const subscription = this.#worker.progressNotifier.subscribe(progress);
        try {
            let inputData;
            if (source instanceof File || source instanceof Blob) {
                inputData = new Uint8Array(await source.arrayBuffer());
            }
            else {
                inputData = await this.#worker.fetchFileData(source);
            }
            await this.#worker.ffmpeg.writeFile("input.wav", inputData);
            await this.#worker.ffmpeg.exec([
                "-y",
                "-i", "input.wav",
                "-compression_level", String(options?.compression ?? 8),
                "output.flac"
            ]);
            const outputData = await this.#worker.ffmpeg.readFile("output.flac");
            if (typeof outputData === "string") {
                return Promise.reject(outputData);
            }
            return new Blob([new Uint8Array(outputData)], { type: "audio/flac" }).arrayBuffer();
        }
        finally {
            subscription.terminate();
            await this.#worker.cleanupFiles(["input.wav", "output.flac"]);
        }
    }
}
