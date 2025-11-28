import { byte, double, Equality, float, int, short } from "./lang";
export interface DataOutput {
    writeByte(value: byte): void;
    writeShort(value: short): void;
    writeInt(value: int): void;
    writeLong(value: bigint): void;
    writeFloat(value: float): void;
    writeDouble(value: double): void;
    writeBoolean(value: boolean): void;
    writeBytes(bytes: Int8Array): void;
    writeString(value: string): void;
}
export interface DataInput {
    readByte(): byte;
    readShort(): short;
    readInt(): int;
    readLong(): bigint;
    readFloat(): float;
    readDouble(): double;
    readBoolean(): boolean;
    readBytes(array: Int8Array): void;
    readString(): string;
    skip(count: int): void;
}
export declare class ByteArrayOutput implements DataOutput {
    #private;
    static create(initialCapacity?: int): ByteArrayOutput;
    static use(buffer: ArrayBufferLike, byteOffset?: int): ByteArrayOutput;
    littleEndian: boolean;
    private constructor();
    get remaining(): int;
    get position(): int;
    set position(value: int);
    writeBoolean(value: boolean): void;
    writeByte(value: byte): void;
    writeShort(value: short): void;
    writeInt(value: int): void;
    writeLong(value: bigint): void;
    writeFloat(value: float): void;
    writeDouble(value: double): void;
    writeBytes(bytes: Int8Array): void;
    writeString(value: string): void;
    toArrayBuffer(): ArrayBufferLike;
}
export declare class ByteCounter implements DataOutput {
    #private;
    writeByte(_: byte): void;
    writeShort(_: short): void;
    writeInt(_: int): void;
    writeLong(_: bigint): void;
    writeFloat(_: float): void;
    writeDouble(_: double): void;
    writeBoolean(_: boolean): void;
    writeBytes(bytes: Int8Array): void;
    writeString(value: string): void;
    get count(): int;
}
export declare class Checksum implements DataOutput, Equality<Checksum> {
    #private;
    constructor(length?: int);
    result(): Int8Array;
    equals(other: Checksum): boolean;
    writeBoolean(value: boolean): void;
    writeShort(value: short): void;
    writeByte(value: byte): void;
    writeInt(value: int): void;
    writeBytes(bytes: Int8Array): void;
    writeFloat(value: float): void;
    writeDouble(value: double): void;
    writeLong(value: bigint): void;
    writeString(value: string): void;
    toHexString(): string;
}
export declare class ByteArrayInput implements DataInput {
    #private;
    littleEndian: boolean;
    constructor(buffer: ArrayBufferLike, byteOffset?: int);
    get position(): int;
    set position(value: int);
    readByte(): byte;
    readShort(): short;
    readInt(): int;
    readLong(): bigint;
    readFloat(): float;
    readDouble(): double;
    readBoolean(): boolean;
    readBytes(array: Int8Array): void;
    readString(): string;
    available(count: int): boolean;
    remaining(): int;
    skip(count: int): void;
}
//# sourceMappingURL=data.d.ts.map