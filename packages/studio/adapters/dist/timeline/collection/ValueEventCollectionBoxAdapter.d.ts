import { ValueEventCollectionBox } from "@opendaw/studio-boxes";
import { int, Observer, Option, Subscription, unitValue, UUID } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { EventCollection, Interpolation, ppqn } from "@opendaw/lib-dsp";
import { BoxAdapter } from "../../BoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
import { ValueEventBoxAdapter } from "../event/ValueEventBoxAdapter";
type CreateEventParams = {
    position: ppqn;
    index: int;
    value: unitValue;
    interpolation: Interpolation;
};
export declare class ValueEventCollectionBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: ValueEventCollectionBox);
    valueAt(position: ppqn, fallback: unitValue): unitValue;
    copy(): ValueEventCollectionBoxAdapter;
    cut(position: ppqn): Option<ValueEventBoxAdapter>;
    subscribeChange(observer: Observer<this>): Subscription;
    createEvent({ position, index, value, interpolation }: CreateEventParams): ValueEventBoxAdapter;
    requestSorting(): void;
    onEventPropertyChanged(): void;
    terminate(): void;
    get box(): ValueEventCollectionBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get numOwners(): int;
    get events(): EventCollection<ValueEventBoxAdapter>;
    toString(): string;
}
export {};
//# sourceMappingURL=ValueEventCollectionBoxAdapter.d.ts.map