var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EmptyExec, Lazy, Notifier, Progress } from "@opendaw/lib-std";
import { Mp3Converter } from "./mp3";
import { FlacConverter } from "./flac";
export class FFmpegWorker {
    static async load(progress = Progress.Empty) {
        return Loader.loadOrAttach(progress);
    }
    #ffmpeg;
    #progressNotifier;
    constructor(ffmpeg) {
        this.#ffmpeg = ffmpeg;
        this.#progressNotifier = new Notifier();
        this.#ffmpeg.on("log", ({ message }) => console.debug("[FFmpeg]", message));
        this.#ffmpeg.on("progress", event => this.#progressNotifier.notify(event.progress));
    }
    get ffmpeg() { return this.#ffmpeg; }
    get loaded() { return this.#ffmpeg.loaded; }
    get progressNotifier() { return this.#progressNotifier; }
    mp3Converter() { return new Mp3Converter(this); }
    flacConverter() { return new FlacConverter(this); }
    async fetchFileData(source) {
        const response = await fetch(source);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        return new Uint8Array(await response.arrayBuffer());
    }
    async cleanupFiles(files) {
        return Promise.all(files.map(file => this.#ffmpeg.deleteFile(file).catch())).then(EmptyExec);
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Mp3Converter)
], FFmpegWorker.prototype, "mp3Converter", null);
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", FlacConverter)
], FFmpegWorker.prototype, "flacConverter", null);
class Loader {
    static async loadOrAttach(progress) {
        if (this.#loader === null) {
            this.#loader = new Loader();
        }
        const subscription = this.#loader.#progressNotifier.subscribe(progress);
        return this.#loader.load().finally(() => subscription.terminate());
    }
    static #loader = null;
    #progressNotifier = new Notifier();
    async load() {
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const ffmpeg = new FFmpeg();
        ffmpeg.on("log", ({ type, message }) => {
            console.debug(`[FFmpeg ${type}]`, message);
        });
        ffmpeg.on("progress", event => {
            this.#progressNotifier.notify(event.progress);
        });
        const baseURL = "https://package.opendaw.studio"; // mirror of https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm
        console.debug("[FFmpeg] Downloading core files...");
        const downloadWithProgress = async (url) => {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Failed to fetch ${url}`);
            const contentLength = response.headers.get("content-length");
            const total = contentLength ? parseInt(contentLength, 10) : 0;
            if (!response.body || total === 0) {
                return response.arrayBuffer();
            }
            const reader = response.body.getReader();
            const chunks = [];
            let received = 0;
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                chunks.push(value);
                received += value.length;
                this.#progressNotifier.notify(received / total);
            }
            const result = new Uint8Array(received);
            let position = 0;
            for (const chunk of chunks) {
                result.set(chunk, position);
                position += chunk.length;
            }
            console.debug("position", position);
            return result.buffer;
        };
        const coreData = await downloadWithProgress(`${baseURL}/ffmpeg-core.js`);
        const wasmData = await downloadWithProgress(`${baseURL}/ffmpeg-core.wasm`);
        console.debug("[FFmpeg] Creating blob URLs...");
        const coreBlob = new Blob([coreData], { type: "text/javascript" });
        const wasmBlob = new Blob([wasmData], { type: "application/wasm" });
        const coreURL = URL.createObjectURL(coreBlob);
        const wasmURL = URL.createObjectURL(wasmBlob);
        console.debug("[FFmpeg] Initializing...");
        await ffmpeg.load({ coreURL, wasmURL });
        console.debug("[FFmpeg] Ready");
        return new FFmpegWorker(ffmpeg);
    }
}
