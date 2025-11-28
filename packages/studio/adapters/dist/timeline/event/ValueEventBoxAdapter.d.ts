import { Comparator, int, Option, Selectable, unitValue, UUID } from "@opendaw/lib-std";
import { Interpolation, ppqn, ValueEvent } from "@opendaw/lib-dsp";
import { Address, Field } from "@opendaw/lib-box";
import { Pointers } from "@opendaw/studio-enums";
import { ValueEventBox } from "@opendaw/studio-boxes";
import { ValueEventCollectionBoxAdapter } from "../collection/ValueEventCollectionBoxAdapter";
import { BoxAdapter } from "../../BoxAdapter";
import { BoxAdaptersContext } from "../../BoxAdaptersContext";
type CopyToParams = {
    position?: ppqn;
    index?: int;
    value?: unitValue;
    interpolation?: Interpolation;
    events?: Field<Pointers.ValueEvents>;
};
export declare class ValueEventBoxAdapter implements ValueEvent, BoxAdapter, Selectable {
    #private;
    static readonly Comparator: Comparator<ValueEventBoxAdapter>;
    readonly type = "value-event";
    constructor(context: BoxAdaptersContext, box: ValueEventBox);
    onSelected(): void;
    onDeselected(): void;
    terminate(): void;
    get box(): ValueEventBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get position(): int;
    get index(): int;
    set interpolation(value: Interpolation);
    get interpolation(): Interpolation;
    get value(): int;
    get isSelected(): boolean;
    get collection(): Option<ValueEventCollectionBoxAdapter>;
    copyTo(options?: CopyToParams): ValueEventBoxAdapter;
    copyFrom(options?: CopyToParams): this;
    toString(): string;
}
export {};
//# sourceMappingURL=ValueEventBoxAdapter.d.ts.map