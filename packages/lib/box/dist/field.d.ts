import { DataInput, DataOutput, JSONValue, Maybe, Option, Optional, short } from "@opendaw/lib-std";
import { Address } from "./address";
import { Box } from "./box";
import { PointerRules, Vertex, VertexVisitor } from "./vertex";
import { PointerTypes } from "./pointer";
import { PointerHub } from "./pointer-hub";
import { BoxGraph } from "./graph";
export type FieldKey = number;
export type FieldKeys = Readonly<Int16Array>;
export type Fields = Record<FieldKey, Field>;
export type FieldConstruct<T extends PointerTypes> = {
    parent: Vertex;
    fieldKey: FieldKey;
    fieldName: string;
    pointerRules: PointerRules<T>;
    deprecated: boolean;
};
export declare class Field<P extends PointerTypes = PointerTypes, F extends Fields = Fields> implements Vertex<P, F> {
    #private;
    static hook<P extends PointerTypes>(construct: FieldConstruct<P>): Field<P, Fields>;
    protected constructor({ parent, fieldKey, fieldName, pointerRules, deprecated }: FieldConstruct<P>);
    accept<RETURN>(visitor: VertexVisitor<RETURN>): Maybe<RETURN>;
    get box(): Box;
    get graph(): BoxGraph;
    get parent(): Vertex;
    get fieldKey(): short;
    get fieldName(): string;
    get pointerRules(): PointerRules<P>;
    get deprecated(): boolean;
    get pointerHub(): PointerHub;
    get address(): Address;
    get debugPath(): string;
    isBox(): this is Box;
    isField(): this is Field;
    isAttached(): boolean;
    fields(): ReadonlyArray<Field>;
    record(): Record<string, Field>;
    getField(_key: keyof F): F[keyof F];
    optField(_key: keyof F): Option<F[keyof F]>;
    read(_input: DataInput): void;
    write(_output: DataOutput): void;
    toJSON(): Optional<JSONValue>;
    fromJSON(_value: JSONValue): void;
    disconnect(): void;
    toString(): string;
}
//# sourceMappingURL=field.d.ts.map