import { DefaultObservableValue, ObservableValue, Observer, Option, Terminable } from "@opendaw/lib-std";
import { PointerHub } from "@opendaw/lib-box";
import { IconSymbol } from "@opendaw/studio-enums";
import { AudioUnitInputAdapter } from "./AudioUnitInputAdapter";
import { BoxAdapters } from "../BoxAdapters";
export declare class AudioUnitInput implements ObservableValue<Option<AudioUnitInputAdapter>>, Terminable {
    #private;
    constructor(pointerHub: PointerHub, boxAdapters: BoxAdapters);
    getValue(): Option<AudioUnitInputAdapter>;
    subscribe(observer: Observer<ObservableValue<Option<AudioUnitInputAdapter>>>): Terminable;
    catchupAndSubscribe(observer: Observer<ObservableValue<Option<AudioUnitInputAdapter>>>): Terminable;
    catchupAndSubscribeLabelChange(observer: Observer<Option<string>>): Terminable;
    catchupAndSubscribeIconChange(observer: Observer<ObservableValue<IconSymbol>>): Terminable;
    set label(value: string);
    get label(): Option<string>;
    set icon(value: IconSymbol);
    get icon(): IconSymbol;
    get iconValue(): DefaultObservableValue<IconSymbol>;
    terminate(): void;
}
//# sourceMappingURL=AudioUnitInput.d.ts.map