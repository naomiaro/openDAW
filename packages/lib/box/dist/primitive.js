import { Field } from "./field";
import { assert, Float, Integer, panic, safeExecute } from "@opendaw/lib-std";
import { Propagation } from "./dispatchers";
import { Constraints } from "./constraints";
export var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType["Boolean"] = "boolean";
    PrimitiveType["Float32"] = "float32";
    PrimitiveType["Int32"] = "int32";
    PrimitiveType["String"] = "string";
    PrimitiveType["Bytes"] = "bytes";
})(PrimitiveType || (PrimitiveType = {}));
export const ValueSerialization = {
    [PrimitiveType.Boolean]: {
        type: PrimitiveType.Boolean,
        encode: (output, value) => output.writeBoolean(value),
        decode: (input) => input.readBoolean()
    },
    [PrimitiveType.Float32]: {
        type: PrimitiveType.Float32,
        encode: (output, value) => output.writeFloat(value),
        decode: (input) => input.readFloat()
    },
    [PrimitiveType.Int32]: {
        type: PrimitiveType.Int32,
        encode: (output, value) => output.writeInt(value),
        decode: (input) => input.readInt()
    },
    [PrimitiveType.String]: {
        type: PrimitiveType.String,
        encode: (output, value) => output.writeString(value),
        decode: (input) => input.readString()
    },
    [PrimitiveType.Bytes]: {
        type: PrimitiveType.Bytes,
        encode: (output, value) => {
            output.writeInt(value.length);
            output.writeBytes(value);
        },
        decode: (input) => {
            const array = new Int8Array(input.readInt());
            input.readBytes(array);
            return array;
        }
    }
};
export class PrimitiveField extends Field {
    #type;
    #initValue;
    #value;
    constructor(field, type, value) {
        super(field);
        this.#type = type;
        this.#initValue = value;
        this.#value = this.#initValue;
    }
    accept(visitor) {
        return safeExecute(visitor.visitPrimitiveField, this);
    }
    subscribe(observer) {
        return this.graph.subscribeVertexUpdates(Propagation.This, this.address, () => observer(this));
    }
    catchupAndSubscribe(observer) {
        observer(this);
        return this.subscribe(observer);
    }
    get type() { return this.#type; }
    get initValue() { return this.#initValue; }
    setInitValue(value) {
        assert(this.graph.constructingBox(), "Cannot change initial value at runtime");
        this.setValue(this.#initValue = this.clamp(value));
    }
    getValue() { return this.#value; }
    setValue(value) {
        const oldValue = this.#value;
        const newValue = this.clamp(value);
        if (this.equals(newValue)) {
            return;
        }
        this.#value = newValue;
        this.graph.onPrimitiveValueUpdate(this, oldValue, newValue);
    }
    writeValue(output, value) {
        assert(!this.deprecated, "PrimitiveField.write: deprecated field");
        this.serialization().encode(output, value);
    }
    readValue(input) { return this.serialization().decode(input); }
    toJSON() {
        if (this.deprecated) {
            return undefined;
        }
        const value = this.getValue();
        return ArrayBuffer.isView(value) ? panic("not implemented") : value;
    }
    fromJSON(_value) { return panic("Type mismatch"); }
    reset() { this.setValue(this.#initValue); }
}
export class BooleanField extends PrimitiveField {
    static create(construct, value = false) {
        return new BooleanField(construct, value);
    }
    constructor(construct, value) { super(construct, PrimitiveType.Boolean, value); }
    toggle() { this.setValue(!this.getValue()); }
    serialization() { return ValueSerialization[PrimitiveType.Boolean]; }
    equals(value) { return this.getValue() === value; }
    clamp(value) { return value; }
    read(input) { this.setValue(input.readBoolean()); }
    write(output) {
        assert(!this.deprecated, "BooleanField.write: deprecated field");
        output.writeBoolean(this.getValue());
    }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (typeof value === "boolean") {
            this.setValue(value);
        }
        else {
            console.warn("BooleanField Type mismatch", value, this.address.toString());
        }
    }
}
export class Float32Field extends PrimitiveField {
    static create(construct, constraints, unit, value = 0.0) {
        return new Float32Field(construct, constraints, unit, value);
    }
    #constraints;
    #unit;
    constructor(construct, constraints, unit, value) {
        super(construct, PrimitiveType.Float32, value);
        this.#constraints = constraints;
        this.#unit = unit;
    }
    serialization() { return ValueSerialization[PrimitiveType.Float32]; }
    equals(value) { return this.getValue() === value; }
    clamp(value) { return Constraints.clampFloat32(this.#constraints, Float.toFloat32(value)); }
    read(input) { this.setValue(input.readFloat()); }
    write(output) {
        assert(!this.deprecated, "FLoat32Field.write: deprecated field");
        output.writeFloat(this.getValue());
    }
    get unit() { return this.#unit; }
    get constraints() { return this.#constraints; }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (typeof value === "number") {
            this.setValue(value);
        }
        else {
            console.warn("Float32Field Type mismatch", value, this.address.toString());
        }
    }
}
export class Int32Field extends PrimitiveField {
    static create(construct, constraints, unit, value = 0) {
        return new Int32Field(construct, constraints, unit, value);
    }
    #constraints;
    #unit;
    constructor(construct, constraints, unit, value) {
        super(construct, PrimitiveType.Int32, value);
        this.#constraints = constraints;
        this.#unit = unit;
    }
    serialization() { return ValueSerialization[PrimitiveType.Int32]; }
    equals(value) { return this.getValue() === value; }
    clamp(value) { return Constraints.clampInt32(this.#constraints, Integer.toInt(value)); }
    read(input) { this.setValue(input.readInt()); }
    write(output) {
        assert(!this.deprecated, "Int32Field.write: deprecated field");
        output.writeInt(this.getValue());
    }
    get unit() { return this.#unit; }
    get constraints() { return this.#constraints; }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (typeof value === "number" && value === Math.floor(value)
            && value >= Integer.MIN_VALUE && value <= Integer.MAX_VALUE) {
            this.setValue(value);
        }
        else {
            console.warn("Int32Field Type mismatch", value, this.address.toString());
        }
    }
}
export class StringField extends PrimitiveField {
    static create(construct, value = "") {
        return new StringField(construct, value);
    }
    constructor(construct, value) { super(construct, PrimitiveType.String, value); }
    serialization() { return ValueSerialization[PrimitiveType.String]; }
    equals(value) { return this.getValue() === value; }
    clamp(value) { return value; }
    read(input) { this.setValue(input.readString()); }
    write(output) {
        assert(!this.deprecated, "StringField.write: deprecated field");
        output.writeString(this.getValue());
    }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (typeof value === "string") {
            this.setValue(value);
        }
        else {
            console.warn("StringField Type mismatch", value, this.address.toString());
        }
    }
}
export class ByteArrayField extends PrimitiveField {
    static create(construct, value = this.#empty) {
        return new ByteArrayField(construct, value);
    }
    static #empty = Object.freeze(new Int8Array(0));
    constructor(construct, value) { super(construct, PrimitiveType.Bytes, value); }
    serialization() { return ValueSerialization[PrimitiveType.Bytes]; }
    equals(value) {
        return this.getValue().length === value.length && this.getValue().every((x, index) => value[index] === x);
    }
    clamp(value) { return value; }
    read(input) {
        const bytes = new Int8Array(input.readInt());
        input.readBytes(bytes);
        this.setValue(bytes);
    }
    write(output) {
        assert(!this.deprecated, "ByteArrayField.write: deprecated field");
        const bytes = this.getValue();
        output.writeInt(bytes.length);
        output.writeBytes(bytes);
    }
    toJSON() {
        if (this.deprecated) {
            return undefined;
        }
        return Array.from(this.getValue().values());
    }
    fromJSON(value) {
        if (this.deprecated) {
            return;
        }
        if (Array.isArray(value) && value.every(number => typeof number === "number")) {
            this.setValue(new Int8Array(value));
        }
        else {
            console.warn("ByteArrayField Type mismatch", value, this.address.toString());
        }
    }
}
