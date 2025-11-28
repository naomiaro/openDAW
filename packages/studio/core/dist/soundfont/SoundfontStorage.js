var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EmptyExec, Lazy, UUID } from "@opendaw/lib-std";
import { Workers } from "../Workers";
import { Storage } from "../Storage";
export class SoundfontStorage extends Storage {
    static Folder = "soundfont";
    static get() { return new SoundfontStorage(); }
    constructor() { super(SoundfontStorage.Folder); }
    async save({ uuid, file, meta }) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        console.debug(`save soundfont '${path}'`);
        return Promise.all([
            Workers.Opfs.write(`${path}/soundfont.sf2`, new Uint8Array(file)),
            Workers.Opfs.write(`${path}/meta.json`, new TextEncoder().encode(JSON.stringify(meta)))
        ]).then(EmptyExec);
    }
    async load(uuid) {
        const path = `${this.folder}/${UUID.toString(uuid)}`;
        return Promise.all([
            Workers.Opfs.read(`${path}/soundfont.sf2`)
                .then(bytes => bytes.buffer),
            Workers.Opfs.read(`${path}/meta.json`)
                .then(bytes => JSON.parse(new TextDecoder().decode(bytes)))
        ]);
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", SoundfontStorage)
], SoundfontStorage, "get", null);
