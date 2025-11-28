import { DataInput, DataOutput, JSONValue, Maybe, Observer, Option, Optional, Provider, Subscription } from "@opendaw/lib-std";
import { Vertex, VertexVisitor } from "./vertex";
import { Address } from "./address";
import { PointerHub } from "./pointer-hub";
import { Field, FieldConstruct } from "./field";
declare const _Unreferenceable: unique symbol;
export type UnreferenceableType = typeof _Unreferenceable;
export type PointerTypes = number | string | UnreferenceableType;
export interface SpecialEncoder {
    map(pointer: PointerField): Option<Address>;
}
export interface SpecialDecoder {
    map(pointer: PointerField, newAddress: Option<Address>): Option<Address>;
}
export declare class PointerField<P extends PointerTypes = PointerTypes> extends Field<UnreferenceableType, never> {
    #private;
    static create<P extends PointerTypes>(construct: FieldConstruct<UnreferenceableType>, pointerType: P, mandatory: boolean): PointerField<P>;
    static encodeWith<R>(encoder: SpecialEncoder, exec: Provider<R>): R;
    static decodeWith<R>(decoder: SpecialDecoder, exec: Provider<R>): R;
    private constructor();
    get pointerHub(): PointerHub;
    get pointerType(): P;
    get mandatory(): boolean;
    accept<RETURN>(visitor: VertexVisitor<RETURN>): Maybe<RETURN>;
    subscribe(observer: Observer<this>): Subscription;
    catchupAndSubscribe(observer: Observer<this>): Subscription;
    refer<TARGET extends PointerTypes>(vertex: Vertex<P & TARGET extends never ? never : TARGET>): void;
    defer(): void;
    get targetVertex(): Option<Vertex>;
    set targetVertex(option: Option<Vertex>);
    get targetAddress(): Option<Address>;
    set targetAddress(newValue: Option<Address>);
    isEmpty(): boolean;
    nonEmpty(): boolean;
    resolvedTo(newTarget: Option<Vertex>): void;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    toJSON(): Optional<JSONValue>;
    fromJSON(value: JSONValue): void;
}
export {};
//# sourceMappingURL=pointer.d.ts.map