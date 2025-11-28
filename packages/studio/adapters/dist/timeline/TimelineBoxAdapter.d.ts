import { TimelineBox } from "@opendaw/studio-boxes";
import { int, Observer, Subscription, UUID } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { BoxAdapter } from "../BoxAdapter";
import { MarkerTrackAdapter } from "./MarkerTrackAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { ppqn } from "@opendaw/lib-dsp";
export declare class TimelineBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: TimelineBox);
    terminate(): void;
    get box(): TimelineBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get markerTrack(): MarkerTrackAdapter;
    get signature(): Readonly<[int, int]>;
    get signatureDuration(): ppqn;
    catchupAndSubscribeSignature(observer: Observer<Readonly<[int, int]>>): Subscription;
}
//# sourceMappingURL=TimelineBoxAdapter.d.ts.map