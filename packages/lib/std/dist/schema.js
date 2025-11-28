import { ByteCounter } from "./data";
/**
 * Schema defines a fixed structure for numbers and boolean
 */
export var Schema;
(function (Schema) {
    class Serializer {
    }
    Schema.createBuilder = (schema) => {
        const replace = (schema) => {
            const clone = schema instanceof Array ? [] : {};
            Object.entries(schema).forEach(([key, value]) => {
                if (value instanceof Serializer) {
                    clone[key] = value.initialValue();
                }
                else if (typeof value === "object") {
                    clone[key] = replace(value);
                }
            });
            return clone;
        };
        return () => new IOImpl(schema, Object.seal(replace(schema)));
    };
    Schema.bool = new class extends Serializer {
        read(input) { return input.readByte() === 1; }
        write(output, value) { output.writeByte(value ? 1 : 0); }
        initialValue() { return false; }
    };
    Schema.int8 = new class extends Serializer {
        read(input) { return input.readByte(); }
        write(output, value) { output.writeByte(value); }
        initialValue() { return 0; }
    };
    Schema.int16 = new class extends Serializer {
        read(input) { return input.readShort(); }
        write(output, value) { output.writeShort(value); }
        initialValue() { return 0; }
    };
    Schema.int32 = new class extends Serializer {
        read(input) { return input.readInt(); }
        write(output, value) { output.writeInt(value); }
        initialValue() { return 0; }
    };
    Schema.float = new class extends Serializer {
        read(input) { return input.readFloat(); }
        write(output, value) { output.writeFloat(value); }
        initialValue() { return 0.0; }
    };
    Schema.double = new class extends Serializer {
        read(input) { return input.readDouble(); }
        write(output, value) { output.writeDouble(value); }
        initialValue() { return 0.0; }
    };
    Schema.int64 = new class extends Serializer {
        read(input) { return input.readLong(); }
        write(output, value) { output.writeLong(value); }
        initialValue() { return 0n; }
    };
    Schema.floats = (length) => new class extends Serializer {
        read(input, values) {
            for (let i = 0; i < values.length; i++) {
                values[i] = input.readFloat();
            }
            return values;
        }
        write(output, values) {
            for (let i = 0; i < values.length; i++) {
                output.writeFloat(values[i]);
            }
        }
        initialValue() { return new Float32Array(length); }
    };
    Schema.doubles = (length) => new class extends Serializer {
        read(input, values) {
            for (let i = 0; i < values.length; i++) {
                values[i] = input.readDouble();
            }
            return values;
        }
        write(output, values) {
            for (let i = 0; i < values.length; i++) {
                output.writeDouble(values[i]);
            }
        }
        initialValue() { return new Float64Array(length); }
    };
    class IOImpl {
        #schema;
        #object;
        #bytesTotal;
        constructor(schema, object) {
            this.#schema = schema;
            this.#object = object;
            this.#bytesTotal = this.#count();
        }
        get object() { return this.#object; }
        get bytesTotal() { return this.#bytesTotal; }
        read(input) {
            const collector = (schema, object) => {
                Object.entries(schema).forEach(([key, value]) => {
                    const data = object;
                    if (value instanceof Serializer) {
                        data[key] = value.read(input, data[key]);
                    }
                    else if (typeof value === "object") {
                        collector(value, data[key]);
                    }
                });
            };
            collector(this.#schema, this.#object);
        }
        write(output) {
            const collector = (schema, object) => {
                Object.entries(schema).forEach(([key, value]) => {
                    const data = object;
                    if (value instanceof Serializer) {
                        value.write(output, data[key]);
                    }
                    else if (typeof value === "object") {
                        collector(value, data[key]);
                    }
                });
            };
            collector(this.#schema, this.#object);
        }
        #count() {
            const counter = new ByteCounter();
            this.write(counter);
            return counter.count;
        }
    }
})(Schema || (Schema = {}));
