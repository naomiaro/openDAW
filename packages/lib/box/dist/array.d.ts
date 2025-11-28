import { Field, FieldConstruct } from "./field";
import { UnreferenceableType } from "./pointer";
import { DataInput, DataOutput, int, JSONValue, Maybe, Option, Optional } from "@opendaw/lib-std";
import { VertexVisitor } from "./vertex";
export type ArrayFieldFactory<FIELD extends Field> = (construct: FieldConstruct<UnreferenceableType>) => FIELD;
export declare class ArrayField<FIELD extends Field = Field> extends Field<UnreferenceableType, Record<int, FIELD>> {
    #private;
    static create<FIELD extends Field>(construct: FieldConstruct<UnreferenceableType>, factory: ArrayFieldFactory<FIELD>, length: int): ArrayField<FIELD>;
    private constructor();
    accept<RETURN>(visitor: VertexVisitor<RETURN>): Maybe<RETURN>;
    fields(): ReadonlyArray<FIELD>;
    record(): Readonly<Record<string, Field>>;
    getField(key: keyof Record<int, FIELD>): Record<int, FIELD>[keyof Record<int, FIELD>];
    optField(key: keyof Record<int, FIELD>): Option<Record<int, FIELD>[keyof Record<int, FIELD>]>;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    size(): int;
    toJSON(): Optional<JSONValue>;
    fromJSON(values: JSONValue): void;
}
//# sourceMappingURL=array.d.ts.map