import { Arrays } from "./arrays";
import { assert, panic } from "./lang";
import { SortedSet } from "./sorted-set";
export var UUID;
(function (UUID) {
    UUID.length = 16;
    UUID.generate = () => fromUint8Array(crypto.getRandomValues(new Uint8Array(UUID.length)));
    UUID.sha256 = async (buffer) => {
        const isVitest = typeof process !== "undefined" && process.env?.VITEST === "true";
        return crypto.subtle.digest("SHA-256", isVitest ? new Uint8Array(buffer.slice(0)) : buffer)
            .then(buffer => fromUint8Array(new Uint8Array(buffer.slice(0, UUID.length))));
    };
    UUID.validateBytes = (uuid) => UUID.parse(UUID.toString(uuid));
    UUID.validateString = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    UUID.asString = (uuid) => UUID.validateString(uuid) ? uuid : panic(`Invalid UUID format: ${uuid}`);
    UUID.fromDataInput = (input) => {
        const array = new Uint8Array(UUID.length);
        input.readBytes(new Int8Array(array.buffer));
        return array;
    };
    UUID.toDataOutput = (output, uuid) => output.writeBytes(new Int8Array(uuid.buffer));
    UUID.toString = (format) => {
        const hex = Arrays.create(index => (index + 0x100).toString(16).substring(1), 256);
        return (hex[format[0]] + hex[format[1]] +
            hex[format[2]] + hex[format[3]] + "-" +
            hex[format[4]] + hex[format[5]] + "-" +
            hex[format[6]] + hex[format[7]] + "-" +
            hex[format[8]] + hex[format[9]] + "-" +
            hex[format[10]] + hex[format[11]] +
            hex[format[12]] + hex[format[13]] +
            hex[format[14]] + hex[format[15]]);
    };
    UUID.parse = (string) => {
        const cleanUuid = string.replace(/-/g, "").toLowerCase();
        if (cleanUuid.length !== 32) {
            return panic("Invalid UUID format");
        }
        const bytes = new Uint8Array(UUID.length);
        for (let i = 0, j = 0; i < 32; i += 2, j++) {
            bytes[j] = parseInt(cleanUuid.slice(i, i + 2), 16);
        }
        return bytes;
    };
    UUID.Comparator = (a, b) => {
        if (a.length !== UUID.length || b.length !== UUID.length) {
            return panic("Unexpected array length for uuid(v4)");
        }
        for (let i = 0; i < UUID.length; i++) {
            const delta = a[i] - b[i];
            if (delta !== 0) {
                return delta;
            }
        }
        return 0;
    };
    UUID.equals = (a, b) => UUID.Comparator(a, b) === 0;
    UUID.newSet = (key) => new SortedSet(key, UUID.Comparator);
    UUID.Lowest = UUID.parse("00000000-0000-4000-8000-000000000000");
    UUID.Highest = UUID.parse("FFFFFFFF-FFFF-4FFF-BFFF-FFFFFFFFFFFF");
    UUID.fromInt = (value) => {
        const result = new Uint8Array(UUID.Lowest);
        const array = new Uint8Array(new Uint32Array([value]).buffer);
        for (let i = 0; i < 4; i++) {
            result[i] = array[i];
        }
        return result;
    };
    UUID.zType = (z) => z.string()
        .refine((uuid) => UUID.validateString(uuid), { message: "Invalid UUID format" })
        .transform(uuid => uuid);
    const fromUint8Array = (arr) => {
        assert(arr.length === UUID.length, "UUID must be 16 bytes long");
        arr[6] = (arr[6] & 0x0f) | 0x40; // Version 4 (random)
        arr[8] = (arr[8] & 0x3f) | 0x80; // Variant 10xx for UUID
        return arr;
    };
})(UUID || (UUID = {}));
