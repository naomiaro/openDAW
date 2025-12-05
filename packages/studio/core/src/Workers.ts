import {assert, FloatArray, int, Lazy, Option, Procedure} from "@naomiarotest/lib-std"
import {Communicator, Messenger} from "@naomiarotest/lib-runtime"
import type {OpfsProtocol, SamplePeakProtocol} from "@naomiarotest/lib-fusion"

export class Workers {
    static async install(url: string): Promise<void> {
        console.debug("install Workers")
        assert(this.messenger.isEmpty(), "Workers are already installed")
        const message = Messenger.for(new Worker(url, {type: "module"}))
        this.messenger = Option.wrap(message)
        const {resolve, promise} = Promise.withResolvers<void>()
        const subscription = message.channel("initialize").subscribe(data => {
            if (data === "ready") {
                console.debug("Workers ready")
                resolve()
                subscription.terminate()
            }
        })
        return promise
    }

    static messenger: Option<Messenger> = Option.None

    @Lazy
    static get Peak(): SamplePeakProtocol {
        return Communicator
            .sender<SamplePeakProtocol>(this.messenger.unwrap("Workers are not installed").channel("peaks"),
                router => new class implements SamplePeakProtocol {
                    async generateAsync(
                        progress: Procedure<number>,
                        shifts: Uint8Array,
                        frames: ReadonlyArray<FloatArray>,
                        numFrames: int,
                        numChannels: int): Promise<ArrayBufferLike> {
                        return router.dispatchAndReturn(this.generateAsync, progress, shifts, frames, numFrames, numChannels)
                    }
                })
    }

    @Lazy
    static get Opfs(): OpfsProtocol {
        return Communicator
            .sender<OpfsProtocol>(this.messenger.unwrap("Workers are not installed").channel("opfs"),
                router => new class implements OpfsProtocol {
                    write(path: string, data: Uint8Array): Promise<void> {return router.dispatchAndReturn(this.write, path, data)}
                    read(path: string): Promise<Uint8Array> {return router.dispatchAndReturn(this.read, path)}
                    delete(path: string): Promise<void> {return router.dispatchAndReturn(this.delete, path)}
                    list(path: string): Promise<ReadonlyArray<OpfsProtocol.Entry>> {return router.dispatchAndReturn(this.list, path)}
                })
    }
}