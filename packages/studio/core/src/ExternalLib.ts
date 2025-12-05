import {Promises} from "@naomiarotest/lib-runtime"
import {int} from "@naomiarotest/lib-std"

export namespace ExternalLib {
    const callback = (error: unknown, count: int) => {
        console.debug(`ExternalLib.importFailure count: ${count}, online: ${navigator.onLine}`, error)
        return count < 10
    }

    export const JSZip = async () => await Promises.guardedRetry(() =>
        import("jszip").then(({default: JSZip}) => JSZip), callback)

    export const SoundFont2 = async () => await Promises.guardedRetry(() =>
        import("soundfont2").then(({SoundFont2}) => SoundFont2), callback)
}