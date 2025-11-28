import { panic } from "./lang";
import { nextPowOf2 } from "./math";
import { Float, Float64 } from "./numeric";
import { Iterables } from "./iterables";
export class ByteArrayOutput {
    static create(initialCapacity = 1024) {
        return this.use(new ArrayBuffer(initialCapacity));
    }
    static use(buffer, byteOffset = 0 | 0) {
        return new ByteArrayOutput(new DataView(buffer, byteOffset));
    }
    littleEndian = false;
    #view;
    #position = 0;
    constructor(view) { this.#view = view; }
    get remaining() { return this.#view.byteLength - this.#position; }
    get position() { return this.#position; }
    set position(value) {
        if (value < 0) {
            panic(`position(${value}) cannot be negative.`);
        }
        else if (value > this.#view.byteLength) {
            panic(`position(${value}) is outside range (${this.#view.byteLength}).`);
        }
        else {
            this.#position = value;
        }
    }
    writeBoolean(value) { this.writeByte(value ? 1 : 0); }
    writeByte(value) {
        this.#ensureSpace(1);
        this.#view.setInt8(this.#position++, value);
    }
    writeShort(value) {
        this.#ensureSpace(Int16Array.BYTES_PER_ELEMENT);
        this.#view.setInt16(this.#position, value, this.littleEndian);
        this.#position += Int16Array.BYTES_PER_ELEMENT;
    }
    writeInt(value) {
        this.#ensureSpace(Int32Array.BYTES_PER_ELEMENT);
        this.#view.setInt32(this.#position, value, this.littleEndian);
        this.#position += Int32Array.BYTES_PER_ELEMENT;
    }
    writeLong(value) {
        this.#ensureSpace(BigInt64Array.BYTES_PER_ELEMENT);
        this.#view.setBigInt64(this.#position, value, this.littleEndian);
        this.#position += BigInt64Array.BYTES_PER_ELEMENT;
    }
    writeFloat(value) {
        this.#ensureSpace(Float32Array.BYTES_PER_ELEMENT);
        this.#view.setFloat32(this.#position, value, this.littleEndian);
        this.#position += Float32Array.BYTES_PER_ELEMENT;
    }
    writeDouble(value) {
        this.#ensureSpace(Float64Array.BYTES_PER_ELEMENT);
        this.#view.setFloat64(this.#position, value, this.littleEndian);
        this.#position += Float64Array.BYTES_PER_ELEMENT;
    }
    writeBytes(bytes) {
        this.#ensureSpace(bytes.length);
        for (let i = 0; i < bytes.length; ++i) {
            this.#view.setInt8(this.#position++, bytes[i]);
        }
    }
    writeString(value) {
        const length = value.length;
        this.#ensureSpace(Int32Array.BYTES_PER_ELEMENT + length * Int16Array.BYTES_PER_ELEMENT);
        this.writeInt(length);
        for (let i = 0; i < length; i++) {
            this.writeShort(value.charCodeAt(i));
        }
    }
    toArrayBuffer() { return this.#view.buffer.slice(0, this.#position); }
    #ensureSpace(count) {
        const capacity = this.#view.byteLength;
        if (this.#position + count > capacity) {
            const o = this.#view;
            this.#view = new DataView(new ArrayBuffer(nextPowOf2(capacity + count)));
            for (let i = 0; i < this.#position; i++) {
                this.#view.setInt8(i, o.getInt8(i));
            }
        }
    }
}
export class ByteCounter {
    #count = 0 | 0;
    writeByte(_) { this.#count++; }
    writeShort(_) { this.#count += 2; }
    writeInt(_) { this.#count += 4; }
    writeLong(_) { this.#count += 8; }
    writeFloat(_) { this.#count += 4; }
    writeDouble(_) { this.#count += 8; }
    writeBoolean(_) { this.#count++; }
    writeBytes(bytes) { this.#count += bytes.length; }
    writeString(value) { this.#count += value.length + 4; }
    get count() { return this.#count; }
}
export class Checksum {
    #result;
    #cursor = 0;
    constructor(length = 32) {
        this.#result = new Int8Array(length);
    }
    result() { return this.#result; }
    equals(other) {
        if (other === this) {
            return true;
        }
        return this.#result.every((value, index) => other.#result[index] === value);
    }
    writeBoolean(value) {
        this.writeByte(value ? 31 : 11);
    }
    writeShort(value) {
        this.writeByte(value & 0xff);
        this.writeByte((value >>> 8) & 0xff);
    }
    writeByte(value) {
        if (this.#cursor >= this.#result.length) {
            this.#cursor = 0;
        }
        this.#result[this.#cursor++] ^= value;
    }
    writeInt(value) {
        this.writeByte(value & 0xff);
        this.writeByte((value >>> 8) & 0xff);
        this.writeByte((value >>> 16) & 0xff);
        this.writeByte((value >>> 24) & 0xff);
    }
    writeBytes(bytes) {
        bytes.forEach(value => this.writeByte(value));
    }
    writeFloat(value) {
        this.writeInt(Float.floatToIntBits(value));
    }
    writeDouble(value) {
        this.writeLong(Float64.float64ToLongBits(value));
    }
    writeLong(value) {
        this.writeByte(Number(value) & 0xff);
        this.writeByte(Number(value >> 8n) & 0xff);
        this.writeByte(Number(value >> 16n) & 0xff);
        this.writeByte(Number(value >> 24n) & 0xff);
        this.writeByte(Number(value >> 32n) & 0xff);
        this.writeByte(Number(value >> 40n) & 0xff);
        this.writeByte(Number(value >> 48n) & 0xff);
        this.writeByte(Number(value >> 56n) & 0xff);
    }
    writeString(value) {
        for (let i = 0; i < value.length; i++) {
            this.writeShort(value.charCodeAt(i));
        }
    }
    toHexString() {
        return Array.from(Iterables.map(this.#result.values(), value => (value & 0xff).toString(16).padStart(2, "0"))).join("");
    }
}
export class ByteArrayInput {
    littleEndian = false;
    #view;
    #position = 0;
    constructor(buffer, byteOffset = 0) { this.#view = new DataView(buffer, byteOffset); }
    get position() { return this.#position; }
    set position(value) {
        if (value < 0) {
            panic(`position(${value}) cannot be negative.`);
        }
        else if (value > this.#view.byteLength) {
            panic(`position(${value}) is outside range (${this.#view.byteLength}).`);
        }
        else {
            this.#position = value;
        }
    }
    readByte() { return this.#view.getInt8(this.#position++); }
    readShort() {
        const read = this.#view.getInt16(this.#position, this.littleEndian);
        this.#position += Int16Array.BYTES_PER_ELEMENT;
        return read;
    }
    readInt() {
        const read = this.#view.getInt32(this.#position, this.littleEndian);
        this.#position += Int32Array.BYTES_PER_ELEMENT;
        return read;
    }
    readLong() {
        const read = this.#view.getBigInt64(this.#position, this.littleEndian);
        this.#position += BigInt64Array.BYTES_PER_ELEMENT;
        return read;
    }
    readFloat() {
        const read = this.#view.getFloat32(this.#position, this.littleEndian);
        this.#position += Float32Array.BYTES_PER_ELEMENT;
        return read;
    }
    readDouble() {
        const read = this.#view.getFloat64(this.#position, this.littleEndian);
        this.#position += Float64Array.BYTES_PER_ELEMENT;
        return read;
    }
    readBoolean() { return this.readByte() === 1; }
    readBytes(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = this.readByte();
        }
    }
    readString() {
        const length = this.readInt();
        let result = "";
        for (let i = 0; i < length; i++) {
            result += String.fromCharCode(this.readShort());
        }
        return result;
    }
    available(count) { return this.#position + count <= this.#view.byteLength; }
    remaining() { return this.#view.byteLength - this.#position; }
    skip(count) { this.position += count; }
}
