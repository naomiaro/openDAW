import { PrimitiveField, PrimitiveValues, ValueSerialization } from "./primitive";
import { Address } from "./address";
import { PointerField } from "./pointer";
import { DataInput, DataOutput, Option, UUID } from "@opendaw/lib-std";
import { BoxGraph } from "./graph";
export type Update = NewUpdate | PrimitiveUpdate | PointerUpdate | DeleteUpdate;
export declare namespace Updates {
    const decode: (input: DataInput) => ReadonlyArray<Update>;
}
interface Modification {
    forward(graph: BoxGraph): void;
    inverse(graph: BoxGraph): void;
    write(output: DataOutput): void;
}
export declare class NewUpdate implements Modification {
    #private;
    readonly type = "new";
    constructor(uuid: UUID.Bytes, name: string, settings: ArrayBufferLike);
    get uuid(): UUID.Bytes;
    get name(): string;
    get settings(): ArrayBufferLike;
    forward(graph: BoxGraph): void;
    inverse(graph: BoxGraph): void;
    write(output: DataOutput): void;
    toString(): string;
    toDebugString(_graph: BoxGraph): string;
}
export type FieldUpdate = PrimitiveUpdate | PointerUpdate;
export declare class PrimitiveUpdate<V extends PrimitiveValues = PrimitiveValues> implements Modification {
    #private;
    readonly type = "primitive";
    constructor(address: Address, serialization: ValueSerialization<V>, oldValue: V, newValue: V);
    get address(): Address;
    get oldValue(): V;
    get newValue(): V;
    matches(field: PrimitiveField): boolean;
    inverse(graph: BoxGraph): void;
    forward(graph: BoxGraph): void;
    field(graph: BoxGraph): PrimitiveField<V>;
    write(output: DataOutput): void;
    toString(): string;
}
export declare class PointerUpdate implements Modification {
    #private;
    readonly type = "pointer";
    constructor(address: Address, oldAddress: Option<Address>, newAddress: Option<Address>);
    get address(): Address;
    get oldAddress(): Option<Address>;
    get newAddress(): Option<Address>;
    matches(field: PointerField): boolean;
    inverse(graph: BoxGraph): void;
    forward(graph: BoxGraph): void;
    field(graph: BoxGraph): PointerField;
    write(output: DataOutput): void;
    toString(): string;
}
export declare class DeleteUpdate implements Modification {
    #private;
    readonly type = "delete";
    constructor(uuid: UUID.Bytes, name: string, settings: ArrayBufferLike);
    get uuid(): UUID.Bytes;
    get name(): string;
    get settings(): ArrayBufferLike;
    forward(graph: BoxGraph): void;
    inverse(graph: BoxGraph): void;
    write(output: DataOutput): void;
    toString(): string;
}
export {};
//# sourceMappingURL=updates.d.ts.map