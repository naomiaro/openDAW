export class Mp3Converter {
    #worker;
    constructor(worker) { this.#worker = worker; }
    async convert(source, progress, options = {}) {
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
            const args = ["-y", "-i", "input.wav"];
            if (options.quality !== undefined) {
                // VBR mode: quality 0 (best) to 9 (worst), 2 is recommended
                args.push("-q:a", (options.quality ?? 2).toString());
            }
            else {
                // CBR mode: default to 320k (high quality)
                args.push("-b:a", options.bitrate ?? "320k");
            }
            args.push("output.mp3");
            await this.#worker.ffmpeg.exec(args);
            const outputData = await this.#worker.ffmpeg.readFile("output.mp3");
            if (typeof outputData === "string") {
                return Promise.reject(outputData);
            }
            return new Blob([new Uint8Array(outputData)], { type: "audio/mpeg" }).arrayBuffer();
        }
        finally {
            subscription.terminate();
            await this.#worker.cleanupFiles(["input.wav", "output.mp3"]);
        }
    }
}
