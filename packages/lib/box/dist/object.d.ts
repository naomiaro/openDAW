import { Field, FieldConstruct, Fields } from "./field";
import { UnreferenceableType } from "./pointer";
import { DataInput, DataOutput, JSONValue, Maybe, Observer, Option, Optional, Subscription } from "@opendaw/lib-std";
import { VertexVisitor } from "./vertex";
export declare abstract class ObjectField<FIELDS extends Fields> extends Field<UnreferenceableType, FIELDS> {
    #private;
    protected constructor(construct: FieldConstruct<UnreferenceableType>);
    protected abstract initializeFields(): FIELDS;
    accept<RETURN>(visitor: VertexVisitor<RETURN>): Maybe<RETURN>;
    fields(): ReadonlyArray<Field>;
    record(): Readonly<Record<string, Field>>;
    getField<K extends keyof FIELDS>(key: K): FIELDS[K];
    optField<K extends keyof FIELDS>(key: K): Option<FIELDS[K]>;
    subscribe(observer: Observer<this>): Subscription;
    read(input: DataInput): void;
    write(output: DataOutput): void;
    toJSON(): Optional<JSONValue>;
    fromJSON(record: JSONValue): void;
}
//# sourceMappingURL=object.d.ts.map