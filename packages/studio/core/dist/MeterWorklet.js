import { Notifier, Schema, SyncStream, Terminator } from "@opendaw/lib-std";
import { AnimationFrame } from "@opendaw/lib-dom";
export class MeterWorklet extends AudioWorkletNode {
    #terminator = new Terminator();
    #notifier = this.#terminator.own(new Notifier());
    constructor(context, numberOfChannels) {
        const receiver = SyncStream.reader(Schema.createBuilder({
            peak: Schema.floats(numberOfChannels),
            rms: Schema.floats(numberOfChannels)
        })(), (data) => this.#notifier.notify(data));
        super(context, "meter-processor", {
            numberOfInputs: 1,
            channelCount: numberOfChannels,
            channelCountMode: "explicit",
            processorOptions: {
                sab: receiver.buffer,
                numberOfChannels,
                rmsWindowInSeconds: 0.100,
                valueDecay: 0.200
            }
        });
        this.#terminator.ownAll(AnimationFrame.add(() => receiver.tryRead()));
    }
    subscribe(observer) { return this.#notifier.subscribe(observer); }
    terminate() { this.#terminator.terminate(); }
}
