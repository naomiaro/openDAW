var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { assert, Lazy, Option } from "@opendaw/lib-std";
import { Communicator, Messenger } from "@opendaw/lib-runtime";
export class Workers {
    static async install(url) {
        console.debug("install Workers");
        assert(this.messenger.isEmpty(), "Workers are already installed");
        const message = Messenger.for(new Worker(url, { type: "module" }));
        this.messenger = Option.wrap(message);
        const { resolve, promise } = Promise.withResolvers();
        const subscription = message.channel("initialize").subscribe(data => {
            if (data === "ready") {
                console.debug("Workers ready");
                resolve();
                subscription.terminate();
            }
        });
        return promise;
    }
    static messenger = Option.None;
    static get Peak() {
        return Communicator
            .sender(this.messenger.unwrap("Workers are not installed").channel("peaks"), router => new class {
            async generateAsync(progress, shifts, frames, numFrames, numChannels) {
                return router.dispatchAndReturn(this.generateAsync, progress, shifts, frames, numFrames, numChannels);
            }
        });
    }
    static get Opfs() {
        return Communicator
            .sender(this.messenger.unwrap("Workers are not installed").channel("opfs"), router => new class {
            write(path, data) { return router.dispatchAndReturn(this.write, path, data); }
            read(path) { return router.dispatchAndReturn(this.read, path); }
            delete(path) { return router.dispatchAndReturn(this.delete, path); }
            list(path) { return router.dispatchAndReturn(this.list, path); }
        });
    }
}
__decorate([
    Lazy,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Workers, "Peak", null);
__decorate([
    Lazy,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Workers, "Opfs", null);
