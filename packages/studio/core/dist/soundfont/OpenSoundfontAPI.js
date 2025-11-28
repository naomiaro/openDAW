var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { asDefined, Lazy, RuntimeNotifier, UUID } from "@opendaw/lib-std";
import { Soundfont } from "@opendaw/studio-adapters";
import { OpenDAWHeaders } from "../OpenDAWHeaders";
import { Promises } from "@opendaw/lib-runtime";
import { z } from "zod";
export class OpenSoundfontAPI {
    static ApiRoot = "https://api.opendaw.studio/soundfonts";
    static FileRoot = "https://assets.opendaw.studio/soundfonts";
    static get() { return new OpenSoundfontAPI(); }
    #memoized = Promises.memoizeAsync(() => Promises.guardedRetry(() => fetch(`${OpenSoundfontAPI.ApiRoot}/list.json`, OpenDAWHeaders)
        .then(x => x.json())
        .then(x => z.array(Soundfont).parse(x))
        .catch(reason => RuntimeNotifier.info({
        headline: "OpenSoundfont API",
        message: `Could not connect to OpenSoundfont API\nReason: '${reason}'`
    }).then(() => [])), (_error, count) => count < 10));
    constructor() { }
    async all() { return this.#memoized(); }
    async get(uuid) {
        const uuidAsString = UUID.toString(uuid);
        return this.all().then(list => asDefined(list
            .find(({ uuid }) => uuid === uuidAsString), "Could not find Soundfont"));
    }
    async load(uuid, progress) {
        return this.get(uuid).then(async (soundfont) => {
            const url = `${OpenSoundfontAPI.FileRoot}/${soundfont.uuid}`;
            return fetch(url, OpenDAWHeaders)
                .then(response => {
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
                            progress(loaded / soundfont.size);
                            reader.read().then(nextChunk, reject);
                        }
                    };
                    reader.read().then(nextChunk, reject);
                });
            })
                .then(buffer => [buffer, soundfont]);
        });
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", OpenSoundfontAPI)
], OpenSoundfontAPI, "get", null);
