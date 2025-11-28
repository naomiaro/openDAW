import { Field, FieldConstruct } from "./field";
import { PointerTypes, UnreferenceableType } from "./pointer";
import { ByteArrayInput, ByteArrayOutput, DataInput, DataOutput, float, int, JSONValue, Maybe, MutableObservableValue, ObservableValue, Observer, Optional, Subscription } from "@opendaw/lib-std";
import { VertexVisitor } from "./vertex";
import { Constraints } from "./constraints";
export type PrimitiveValues = float | int | string | boolean | Readonly<Int8Array>;
export declare enum PrimitiveType {
    Boolean = "boolean",
    Float32 = "float32",
    Int32 = "int32",
    String = "string",
    Bytes = "bytes"
}
export interface ValueSerialization<V extends PrimitiveValues = PrimitiveValues> {
    get type(): PrimitiveType;
    encode(output: DataOutput, value: V): void;
    decode(input: DataInput): V;
}
export declare const ValueSerialization: {
    readonly boolean: {
        readonly type: PrimitiveType.Boolean;
        readonly encode: (output: DataOutput, value: boolean) => void;
        readonly decode: (input: DataInput) => boolean;
    };
    readonly float32: {
        readonly type: PrimitiveType.Float32;
        readonly encode: (output: DataOutput, value: float) => void;
        readonly decode: (input: DataInput) => float;
    };
    readonly int32: {
        readonly type: PrimitiveType.Int32;
        readonly encode: (output: DataOutput, value: int) => void;
        readonly decode: (input: DataInput) => int;
    };
    readonly string: {
        readonly type: PrimitiveType.String;
        readonly encode: (output: DataOutput, value: string) => void;
        readonly decode: (input: DataInput) => string;
    };
    readonly bytes: {
        readonly type: PrimitiveType.Bytes;
        readonly encode: (output: DataOutput, value: Readonly<Int8Array>) => void;
        readonly decode: (input: DataInput) => Readonly<Int8Array>;
    };
};
export declare abstract class PrimitiveField<V extends PrimitiveValues = PrimitiveValues, P extends PointerTypes = UnreferenceableType> extends Field<P, never> implements MutableObservableValue<V> {
    #private;
    protected constructor(field: FieldConstruct<P>, type: PrimitiveType, value: V);
    accept<RETURN>(visitor: VertexVisitor<RETURN>): Maybe<RETURN>;
    subscribe(observer: Observer<ObservableValue<V>>): Subscription;
    catchupAndSubscribe(observer: Observer<ObservableValue<V>>): Subscription;
    abstract serialization(): ValueSerialization<V>;
    abstract equals(value: V): boolean;
    abstract clamp(value: V): V;
    get type(): PrimitiveType;
    get initValue(): V;
    setInitValue(value: V): void;
    getValue(): V;
    setValue(value: V): void;
    writeValue(output: ByteArrayOutput, value: V): void;
    readValue(input: ByteArrayInput): V;
    toJSON(): Optional<JSONValue>;
    fromJSON(_value: JSONValue): void;
    reset(): void;
}
export declare class BooleanField<E extends PointerTypes = UnreferenceableType> extends PrimitiveField<boolean, E> {
    static create<E extends PointerTypes = UnreferenceableType>(construct: FieldConstruct<E>, value?: boolean): BooleanField<E>;
    private constructor();
    toggle(): void;
    serialization(): ValueSerialization<boolean>;
    equals(value: boolean): boolean;
    clamp(value: boolean): boolean;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    fromJSON(value: JSONValue): void;
}
export declare class Float32Field<E extends PointerTypes = UnreferenceableType> extends PrimitiveField<float, E> {
    #private;
    static create<E extends PointerTypes = UnreferenceableType>(construct: FieldConstruct<E>, constraints: Constraints.Float32, unit: string, value?: float): Float32Field<E>;
    private constructor();
    serialization(): ValueSerialization<float>;
    equals(value: float): boolean;
    clamp(value: float): float;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    get unit(): string;
    get constraints(): Constraints.Float32;
    fromJSON(value: JSONValue): void;
}
export declare class Int32Field<E extends PointerTypes = UnreferenceableType> extends PrimitiveField<int, E> {
    #private;
    static create<E extends PointerTypes = UnreferenceableType>(construct: FieldConstruct<E>, constraints: Constraints.Int32, unit: string, value?: int): Int32Field<E>;
    private constructor();
    serialization(): ValueSerialization<int>;
    equals(value: int): boolean;
    clamp(value: int): int;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    get unit(): string;
    get constraints(): Constraints.Int32;
    fromJSON(value: JSONValue): void;
}
export declare class StringField<E extends PointerTypes = UnreferenceableType> extends PrimitiveField<string, E> {
    static create<E extends PointerTypes = UnreferenceableType>(construct: FieldConstruct<E>, value?: string): StringField<E>;
    private constructor();
    serialization(): ValueSerialization<string>;
    equals(value: string): boolean;
    clamp(value: string): string;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    fromJSON(value: JSONValue): void;
}
export declare class ByteArrayField<E extends PointerTypes = UnreferenceableType> extends PrimitiveField<Readonly<Int8Array>, E> {
    #private;
    static create<E extends PointerTypes = UnreferenceableType>(construct: FieldConstruct<E>, value?: Readonly<Int8Array>): ByteArrayField<E>;
    private constructor();
    serialization(): ValueSerialization<Readonly<Int8Array>>;
    equals(value: Readonly<Int8Array>): boolean;
    clamp(value: Readonly<Int8Array>): Readonly<Int8Array>;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    toJSON(): Optional<JSONValue>;
    fromJSON(value: JSONValue): void;
}
//# sourceMappingURL=primitive.d.ts.map