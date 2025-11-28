import { Observer, Option, Subscription, Terminable } from "@opendaw/lib-std";
import { PointerField } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { BoxAdapters } from "../BoxAdapters";
import { AudioBusBoxAdapter } from "./AudioBusBoxAdapter";
export declare class AudioUnitOutput implements Terminable {
    #private;
    constructor(pointerField: PointerField<Pointers.AudioOutput>, boxAdapters: BoxAdapters);
    subscribe(observer: Observer<Option<AudioBusBoxAdapter>>): Subscription;
    catchupAndSubscribe(observer: Observer<Option<AudioBusBoxAdapter>>): Subscription;
    get adapter(): Option<AudioBusBoxAdapter>;
    terminate(): void;
}
//# sourceMappingURL=AudioUnitOutput.d.ts.map