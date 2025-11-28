import { Comparable, Comparator, DataInput, DataOutput, Func, int, Nullable, SortedSet, UUID } from "@opendaw/lib-std";
import { FieldKey, FieldKeys } from "./field";
export type AddressJSON = {
    uuid: Array<int>;
    fields: Array<int>;
};
export type AddressLayout = [UUID.Bytes, FieldKeys];
export declare class Address implements Comparable<Address> {
    #private;
    static newSet<T>(keyExtractor: Func<T, Address>): SortedSet<Address, T>;
    static readonly compose: (uuid: UUID.Bytes, ...fieldKeys: FieldKey[]) => Address;
    static decode(str: string): Address;
    static reconstruct(layout: AddressLayout): Address;
    static boxRange<T>(set: SortedSet<Address, T>, id: UUID.Bytes, map: Func<T, UUID.Bytes>): Nullable<[int, int]>;
    static readonly Comparator: Comparator<Address>;
    static readonly MinimalComparator: Comparator<Address>;
    static readonly LengthComparator: Comparator<Address>;
    constructor(uuid: UUID.Bytes, fieldKeys: FieldKeys);
    get uuid(): UUID.Bytes;
    get fieldKeys(): FieldKeys;
    isBox(): boolean;
    isContent(): boolean;
    equals(other: Address): boolean;
    compareTo(other: Address): int;
    append(key: FieldKey): Address;
    startsWith(other: Address): boolean;
    write(output: DataOutput): void;
    moveTo(target: UUID.Bytes): Address;
    decompose(): AddressLayout;
    toJSON(): {
        uuid: number[];
        fields: number[];
    };
    toArrayBuffer(): ArrayBufferLike;
    toString(): string;
    static read(input: DataInput): Address;
}
export interface Addressable {
    get address(): Address;
}
export declare namespace Addressable {
    const AddressReader: (addressable: Addressable) => Address;
    const Comparator: Comparator<Addressable>;
    const equals: <A extends Addressable>(address: Address, sorted: ReadonlyArray<A>) => Array<A>;
    const startsWith: <A extends Addressable>(address: Address, sorted: ReadonlyArray<A>) => Array<A>;
    const endsWith: <A extends Addressable>(address: Address, sorted: ReadonlyArray<A>) => Array<A>;
}
export declare class AddressIdEncoder {
    #private;
    constructor();
    getOrCreate(address: Address): string;
}
//# sourceMappingURL=address.d.ts.map