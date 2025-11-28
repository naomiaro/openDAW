import { int, Observer, Option, Subscription, unitValue, UUID } from "@opendaw/lib-std";
import { Address, BooleanField, Int32Field, PointerField } from "@opendaw/lib-box";
import { ppqn } from "@opendaw/lib-dsp";
import { BoxAdapter } from "../BoxAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { TrackClips } from "./TrackClips";
import { TrackRegions } from "./TrackRegions";
import { TrackType } from "./TrackType";
import { AnyClipBoxAdapter, AnyRegionBoxAdapter } from "../UnionAdapterTypes";
import { AudioUnitBox, TrackBox } from "@opendaw/studio-boxes";
import { Pointers } from "@opendaw/studio-enums";
export declare class TrackBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: TrackBox);
    catchupAndSubscribePath(observer: Observer<Option<[string, string]>>): Subscription;
    set targetDeviceName(value: string);
    get targetDeviceName(): Option<string>;
    terminate(): void;
    get audioUnit(): AudioUnitBox;
    get target(): PointerField<Pointers.Automation>;
    get clips(): TrackClips;
    get regions(): TrackRegions;
    get enabled(): BooleanField;
    get indexField(): Int32Field;
    get type(): TrackType;
    get box(): TrackBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get listIndex(): int;
    set listIndex(value: int);
    accepts(subject: AnyClipBoxAdapter | AnyRegionBoxAdapter): boolean;
    valueAt(position: ppqn, fallback: unitValue): unitValue;
}
//# sourceMappingURL=TrackBoxAdapter.d.ts.map