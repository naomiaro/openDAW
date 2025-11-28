import { Field } from "./field";
import { Arrays, asDefined, Option, panic, safeExecute } from "@opendaw/lib-std";
import { NoPointers } from "./vertex";
export class ArrayField extends Field {
    static create(construct, factory, length) {
        return new ArrayField(construct, factory, length);
    }
    #fields;
    constructor(construct, factory, length) {
        super(construct);
        this.#fields = Arrays.create((index) => factory({
            parent: this,
            fieldKey: index,
            fieldName: String(index),
            pointerRules: NoPointers,
            deprecated: construct.deprecated
        }), length);
    }
    accept(visitor) {
        return safeExecute(visitor.visitArrayField, this);
    }
    fields() { return this.#fields; }
    record() {
        return Arrays.toRecord(this.#fields, field => String(field.fieldKey));
    }
    getField(key) {
        return asDefined(this.#fields[key]);
    }
    optField(key) {
        return Option.wrap(this.#fields[key]);
    }
    read(input) { this.#fields.forEach(field => field.read(input)); }
    write(output) {
        this.#fields.filter(field => !field.deprecated)
            .forEach(field => field.write(output));
    }
    size() { return this.#fields.length; }
    toJSON() {
        if (this.deprecated) {
            return undefined;
        }
        return Object.values(this.#fields).map((field) => field.toJSON() ?? null);
    }
    fromJSON(values) {
        if (this.deprecated) {
            return;
        }
        if (Array.isArray(values)) {
            values.forEach((value, index) => this.#fields[index].fromJSON(value));
        }
        else {
            return panic("Type mismatch");
        }
    }
}
