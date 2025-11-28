import { PianoMode } from "@opendaw/studio-boxes";
import { float, int, Observer, Subscription } from "@opendaw/lib-std";
import { FieldAdapter } from "./FieldAdapter";
export declare class PianoModeAdapter {
    #private;
    constructor(object: PianoMode);
    subscribe(observer: Observer<this>): Subscription;
    get object(): PianoMode;
    get keyboard(): FieldAdapter<int>;
    get timeRangeInQuarters(): FieldAdapter<float>;
    get noteScale(): FieldAdapter<float>;
    get noteLabels(): FieldAdapter<boolean>;
    get transpose(): FieldAdapter<int>;
}
//# sourceMappingURL=PianoModeAdapter.d.ts.map