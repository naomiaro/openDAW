import { Arrays, assert, BinarySearch, SortedSet, UUID } from "@opendaw/lib-std";
export class Address {
    static newSet(keyExtractor) {
        return new SortedSet(keyExtractor, Address.Comparator);
    }
    static compose = (uuid, ...fieldKeys) => {
        const keys = fieldKeys.length === 0 ? this.#EMPTY_FIELD_KEYS : new Int16Array(fieldKeys);
        assert(keys.every((value, index) => value === fieldKeys[index]), `fieldKeys (${keys.join(",")}) only allows i16`);
        return new Address(uuid, keys);
    };
    static decode(str) {
        const parts = str.split("/");
        assert(parts.length > 0, "Unable to parse Address");
        return Address.compose(UUID.parse(parts[0]), ...parts.slice(1).map(x => parseInt(x)));
    }
    static reconstruct(layout) { return this.compose(layout[0], ...layout[1]); }
    static boxRange(set, id, map) {
        const sorted = set.values();
        const startIndex = BinarySearch.leftMostMapped(sorted, id, UUID.Comparator, map);
        const length = sorted.length;
        if (startIndex < 0 || startIndex >= length) {
            return null;
        }
        for (let endIndex = startIndex; endIndex < length; endIndex++) {
            if (UUID.Comparator(map(sorted[endIndex]), id) !== 0) {
                if (startIndex < endIndex) {
                    return [startIndex, endIndex];
                }
                else {
                    return null;
                }
            }
        }
        return [startIndex, length];
    }
    static Comparator = (a, b) => {
        const compareId = UUID.Comparator(a.#uuid, b.#uuid);
        if (compareId !== 0) {
            return compareId;
        }
        const n = Math.min(a.#fieldKeys.length, b.#fieldKeys.length);
        for (let i = 0; i < n; i++) {
            const comparison = (a.#fieldKeys)[i] - (b.#fieldKeys)[i];
            if (comparison !== 0) {
                return comparison;
            }
        }
        return a.#fieldKeys.length - b.#fieldKeys.length;
    };
    static MinimalComparator = (a, b) => {
        const compareId = UUID.Comparator(a.#uuid, b.#uuid);
        if (compareId !== 0) {
            return compareId;
        }
        const n = Math.min(a.#fieldKeys.length, b.#fieldKeys.length);
        for (let i = 0; i < n; i++) {
            const comparison = (a.#fieldKeys)[i] - (b.#fieldKeys)[i];
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    };
    static LengthComparator = (a, b) => {
        const compareId = UUID.Comparator(a.#uuid, b.#uuid);
        if (compareId !== 0) {
            return compareId;
        }
        return b.#fieldKeys.length - a.#fieldKeys.length;
    };
    static #EMPTY_FIELD_KEYS = new Int16Array(0);
    #uuid;
    #fieldKeys;
    constructor(uuid, fieldKeys) {
        this.#uuid = uuid;
        this.#fieldKeys = fieldKeys;
    }
    get uuid() { return this.#uuid; }
    get fieldKeys() { return this.#fieldKeys; }
    isBox() { return this.#fieldKeys.length === 0; }
    isContent() { return !this.isBox(); }
    equals(other) { return Address.Comparator(this, other) === 0; }
    compareTo(other) { return Address.Comparator(this, other); }
    append(key) {
        return new Address(this.#uuid, new Int16Array([...this.#fieldKeys, key]));
    }
    startsWith(other) {
        return UUID.Comparator(other.#uuid, this.#uuid) === 0
            && other.#fieldKeys.length <= this.#fieldKeys.length
            && other.#fieldKeys.every((value, index) => this.#fieldKeys[index] === value);
    }
    write(output) {
        output.writeBytes(new Int8Array(this.#uuid.buffer));
        output.writeByte(this.#fieldKeys.length);
        this.#fieldKeys.forEach(key => output.writeShort(key));
    }
    moveTo(target) { return new Address(target, this.#fieldKeys); }
    decompose() { return [this.#uuid, this.#fieldKeys]; }
    toJSON() { return { uuid: Array.from(this.#uuid.values()), fields: Array.from(this.#fieldKeys.values()) }; }
    toArrayBuffer() {
        const array = new Uint8Array(UUID.length + this.#fieldKeys.length);
        array.set(this.#uuid, 0);
        array.set(this.#fieldKeys, UUID.length);
        return array.buffer;
    }
    toString() { return [UUID.toString(this.#uuid), ...this.#fieldKeys].join("/"); }
    static read(input) {
        const uuidBytes = UUID.fromDataInput(input);
        const numFields = input.readByte();
        return Address.compose(uuidBytes, ...Arrays.create(() => input.readShort(), numFields));
    }
}
export var Addressable;
(function (Addressable) {
    Addressable.AddressReader = (addressable) => addressable.address;
    Addressable.Comparator = ({ address: a }, { address: b }) => Address.Comparator(a, b);
    Addressable.equals = (address, sorted) => {
        const [l, r] = BinarySearch.rangeMapped(sorted, address, Address.Comparator, Addressable.AddressReader);
        return sorted.slice(l, r + 1);
    };
    Addressable.startsWith = (address, sorted) => {
        const [l, r] = BinarySearch.rangeMapped(sorted, address, Address.MinimalComparator, Addressable.AddressReader);
        return sorted
            .slice(l, r + 1)
            .filter((addressable) => addressable.address.startsWith(address));
    };
    Addressable.endsWith = (address, sorted) => {
        const l = BinarySearch.leftMostMapped(sorted, address, Address.LengthComparator, Addressable.AddressReader);
        const r = BinarySearch.rightMostMapped(sorted, address, Address.MinimalComparator, Addressable.AddressReader);
        return sorted
            .slice(l, r + 1)
            .filter((addressable) => address.startsWith(addressable.address));
    };
})(Addressable || (Addressable = {}));
export class AddressIdEncoder {
    #ids;
    #idCount;
    constructor() {
        this.#ids = Address.newSet(({ address }) => address);
        this.#idCount = 0;
    }
    getOrCreate(address) {
        return `id${this.#ids.getOrCreate(address, () => ({ address, id: `${++this.#idCount}` })).id}`;
    }
}
