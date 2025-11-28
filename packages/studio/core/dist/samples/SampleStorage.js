var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ByteArrayInput, EmptyExec, Lazy, UUID } from "@opendaw/lib-std";
import { SamplePeaks } from "@opendaw/lib-fusion";
import { Workers } from "../Workers";
import { WavFile } from "../WavFile";
import { Storage } from "../Storage";
export class SampleStorage extends Storage {
    static Folder = "samples/v2";
    static get() { return new SampleStorage(); }
    static async cleanDeprecated() { Workers.Opfs.delete("samples/v1").catch(EmptyExec); }
    constructor() { super(SampleStorage.Folder); }
    async save({ uuid, audio, peaks, meta }) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        const data = new Uint8Array(WavFile.encodeFloats({
            channels: audio.frames.slice(),
            numFrames: audio.numberOfFrames,
            sampleRate: audio.sampleRate
        }));
        console.debug(`save sample '${path}'`);
        return Promise.all([
            Workers.Opfs.write(`${path}/audio.wav`, data),
            Workers.Opfs.write(`${path}/peaks.bin`, new Uint8Array(peaks)),
            Workers.Opfs.write(`${path}/meta.json`, new TextEncoder().encode(JSON.stringify(meta)))
        ]).then(EmptyExec);
    }
    async updateSampleMeta(uuid, meta) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        return Workers.Opfs.write(`${path}/meta.json`, new TextEncoder().encode(JSON.stringify(meta)));
    }
    async load(uuid) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        return Promise.all([
            Workers.Opfs.read(`${path}/audio.wav`)
                .then(bytes => WavFile.decodeFloats(bytes.buffer)),
            Workers.Opfs.read(`${path}/peaks.bin`)
                .then(bytes => SamplePeaks.from(new ByteArrayInput(bytes.buffer))),
            Workers.Opfs.read(`${path}/meta.json`)
                .then(bytes => JSON.parse(new TextDecoder().decode(bytes)))
        ]).then(([buffer, peaks, meta]) => [{
                sampleRate: buffer.sampleRate,
                numberOfFrames: buffer.numFrames,
                numberOfChannels: buffer.channels.length,
                frames: buffer.channels
            }, peaks, meta]);
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", SampleStorage)
], SampleStorage, "get", null);
