import { Comparator, Func, int } from "./lang";
import { SortedSet } from "./sorted-set";
import { DataInput, DataOutput } from "./data";
export declare namespace UUID {
    type Bytes = Readonly<Uint8Array>;
    type String = `${string}-${string}-${string}-${string}-${string}`;
    const length: 16;
    const generate: () => Bytes;
    const sha256: (buffer: ArrayBuffer) => Promise<Bytes>;
    const validateBytes: (uuid: UUID.Bytes) => UUID.Bytes;
    const validateString: (uuid: string) => uuid is String;
    const asString: (uuid: string) => String;
    const fromDataInput: (input: DataInput) => Bytes;
    const toDataOutput: (output: DataOutput, uuid: UUID.Bytes) => void;
    const toString: (format: Bytes) => UUID.String;
    const parse: (string: string) => Uint8Array;
    const Comparator: Comparator<Bytes>;
    const equals: (a: UUID.Bytes, b: UUID.Bytes) => boolean;
    const newSet: <T>(key: Func<T, Bytes>) => SortedSet<Readonly<Uint8Array<ArrayBufferLike>>, T>;
    const Lowest: Bytes;
    const Highest: Bytes;
    const fromInt: (value: int) => Bytes;
    type ZodLike = {
        string: typeof import("zod").string;
    };
    const zType: (z: ZodLike) => import("zod").ZodPipe<import("zod").ZodString, import("zod").ZodTransform<`${string}-${string}-${string}-${string}-${string}`, string>>;
}
//# sourceMappingURL=uuid.d.ts.map