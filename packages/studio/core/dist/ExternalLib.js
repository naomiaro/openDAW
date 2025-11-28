import { Promises } from "@opendaw/lib-runtime";
export var ExternalLib;
(function (ExternalLib) {
    const callback = (error, count) => {
        console.debug(`ExternalLib.importFailure count: ${count}, online: ${navigator.onLine}`, error);
        return count < 10;
    };
    ExternalLib.JSZip = async () => await Promises.guardedRetry(() => import("jszip").then(({ default: JSZip }) => JSZip), callback);
    ExternalLib.SoundFont2 = async () => await Promises.guardedRetry(() => import("soundfont2").then(({ SoundFont2 }) => SoundFont2), callback);
})(ExternalLib || (ExternalLib = {}));
