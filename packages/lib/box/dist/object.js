import { Field } from "./field";
import { asDefined, isDefined, isRecord, Option, panic, safeExecute } from "@opendaw/lib-std";
import { Serializer } from "./serializer";
import { Propagation } from "./dispatchers";
export class ObjectField extends Field {
    #fields;
    constructor(construct) {
        super(construct);
        this.#fields = this.initializeFields();
    }
    accept(visitor) {
        return safeExecute(visitor.visitObjectField, this);
    }
    fields() { return Object.values(this.#fields); }
    record() { return this.#fields; }
    getField(key) { return asDefined(this.#fields[key]); }
    optField(key) { return Option.wrap(this.#fields[key]); }
    subscribe(observer) {
        return this.graph.subscribeVertexUpdates(Propagation.Children, this.address, () => this.graph.subscribeEndTransaction(() => observer(this)));
    }
    read(input) { Serializer.readFields(input, this.#fields); }
    write(output) { Serializer.writeFields(output, this.#fields); }
    toJSON() {
        if (this.deprecated) {
            return undefined;
        }
        return Object.entries(this.#fields).reduce((result, [key, field]) => {
            result[key] = field.toJSON();
            return result;
        }, {});
    }
    fromJSON(record) {
        if (this.deprecated) {
            return;
        }
        if (isRecord(record)) {
            Object.entries(record).forEach(([key, value]) => {
                const field = this.#fields[parseInt(key)];
                if (isDefined(value)) {
                    field.fromJSON(value);
                }
            });
        }
        else {
            return panic("Type mismatch");
        }
    }
}
