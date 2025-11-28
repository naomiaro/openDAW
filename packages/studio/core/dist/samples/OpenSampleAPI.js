var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Arrays, asDefined, DefaultObservableValue, Lazy, panic, RuntimeNotifier, tryCatch, UUID } from "@opendaw/lib-std";
import { network, Promises } from "@opendaw/lib-runtime";
import { Sample } from "@opendaw/studio-adapters";
import { base64Credentials, OpenDAWHeaders } from "../OpenDAWHeaders";
import { z } from "zod";
// Standard openDAW samples (considered to be non-removable)
export class OpenSampleAPI {
    static ApiRoot = "https://api.opendaw.studio/samples";
    static FileRoot = "https://assets.opendaw.studio/samples";
    static get() { return new OpenSampleAPI(); }
    static fromAudioBuffer(buffer) {
        return {
            frames: Arrays.create(channel => buffer.getChannelData(channel), buffer.numberOfChannels),
            sampleRate: buffer.sampleRate,
            numberOfFrames: buffer.length,
            numberOfChannels: buffer.numberOfChannels
        };
    }
    constructor() { }
    async all() {
        return Promises.guardedRetry(() => fetch(`${OpenSampleAPI.ApiRoot}/list.php`, OpenDAWHeaders)
            .then(x => x.json().then(x => z.array(Sample).parse(x)), () => []), (_error, count) => count < 10);
    }
    async get(uuid) {
        const url = `${OpenSampleAPI.ApiRoot}/get.php?uuid=${UUID.toString(uuid)}`;
        const sample = await Promises.retry(() => network.limitFetch(url, OpenDAWHeaders)
            .then(x => x.json().then(x => Sample.parse(x))))
            .then(x => { if ("error" in x) {
            return panic(x.error);
        }
        else {
            return x;
        } });
        return Object.freeze({ ...sample, origin: "openDAW" });
    }
    async load(context, uuid, progress) {
        console.debug(`load ${UUID.toString(uuid)}`);
        return this.get(uuid)
            .then(({ uuid, name, bpm }) => Promises.retry(() => network
            .limitFetch(`${OpenSampleAPI.FileRoot}/${uuid}`, OpenDAWHeaders))
            .then(response => {
            const total = parseInt(response.headers.get("Content-Length") ?? "0");
            let loaded = 0;
            return new Promise((resolve, reject) => {
                const reader = asDefined(response.body, "No body in response").getReader();
                const chunks = [];
                const nextChunk = ({ done, value }) => {
                    if (done) {
                        resolve(new Blob(chunks).arrayBuffer());
                    }
                    else {
                        chunks.push(value);
                        loaded += value.length;
                        progress(loaded / total);
                        reader.read().then(nextChunk, reject);
                    }
                };
                reader.read().then(nextChunk, reject);
            });
        })
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => ([OpenSampleAPI.fromAudioBuffer(audioBuffer), {
                uuid,
                bpm,
                name,
                duration: audioBuffer.duration,
                sample_rate: audioBuffer.sampleRate,
                origin: "openDAW"
            }])));
    }
    async upload(arrayBuffer, metaData) {
        const progress = new DefaultObservableValue(0.0);
        const dialog = RuntimeNotifier.progress({ headline: "Uploading", progress });
        const formData = new FormData();
        Object.entries(metaData).forEach(([key, value]) => formData.set(key, String(value)));
        const params = new URLSearchParams(location.search);
        const accessKey = asDefined(params.get("access-key"), "Cannot upload without access-key.");
        formData.set("key", accessKey);
        formData.append("file", new Blob([arrayBuffer]));
        console.log("upload data", Array.from(formData.entries()), arrayBuffer.byteLength);
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
                progress.setValue(event.loaded / event.total);
            }
        });
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                dialog.terminate();
                if (xhr.status === 200) {
                    RuntimeNotifier.info({ message: xhr.responseText });
                }
                else {
                    const { status, value } = tryCatch(() => JSON.parse(xhr.responseText).message ?? "Unknown error message");
                    RuntimeNotifier.info({
                        headline: "Upload Failure",
                        message: status === "success" ? value : "Unknown error"
                    });
                }
            }
        };
        xhr.open("POST", `${OpenSampleAPI.ApiRoot}/upload.php`, true);
        xhr.setRequestHeader("Authorization", `Basic ${base64Credentials}`);
        xhr.send(formData);
    }
    allowsUpload() { return false; }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenSampleAPI.prototype, "all", null);
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", OpenSampleAPI)
], OpenSampleAPI, "get", null);
