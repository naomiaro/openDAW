import { int, Observer, Subscription, Terminable } from "@opendaw/lib-std";
export type PeakSchema = {
    peak: Float32Array;
    rms: Float32Array;
};
export declare class MeterWorklet extends AudioWorkletNode implements Terminable {
    #private;
    constructor(context: BaseAudioContext, numberOfChannels: int);
    subscribe(observer: Observer<PeakSchema>): Subscription;
    terminate(): void;
}
//# sourceMappingURL=MeterWorklet.d.ts.map