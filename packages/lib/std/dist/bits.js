import { Arrays } from "./arrays";
export class Bits {
    static every = (set, flag) => (set & flag) === flag;
    static some = (set, flag) => (set & flag) > 0;
    #numBits;
    #array;
    constructor(numBits = 32) {
        this.#numBits = numBits;
        this.#array = new Int32Array(((numBits - 1) >>> 5) + 1);
    }
    getBit(index) {
        const arrayIndex = index >>> 5;
        const byte = 1 << (index - (arrayIndex << 5));
        return (this.#array[arrayIndex] & byte) !== 0;
    }
    setBit(index, value) {
        const arrayIndex = index >>> 5;
        const byte = 1 << (index - (arrayIndex << 5));
        const was = this.#array[arrayIndex];
        const val = value ? was | byte : was & ~byte;
        if (val === was) {
            return false;
        }
        this.#array[arrayIndex] = val;
        return true;
    }
    isEmpty() { return this.#array.every(value => value === 0); }
    nonEmpty() { return this.#array.some(value => value > 0); }
    set buffer(value) { this.#array.set(new Int32Array(value)); }
    get buffer() { return this.#array.buffer; }
    replace(buffer) {
        const source = new Int32Array(buffer);
        let changes = false;
        for (let index = 0; index < source.length; index++) {
            if (this.#array[index] !== source[index]) {
                this.#array[index] = source[index];
                changes = true;
            }
        }
        return changes;
    }
    toString() {
        let result = "";
        for (const value of Arrays.iterateReverse(this.#array)) {
            result += value.toString(2).padStart(32, "0");
        }
        return result.substring(result.length - this.#numBits);
    }
    clear() { this.#array.fill(0); }
}
