import { Fields } from "./field";
import { DataInput, DataOutput } from "@opendaw/lib-std";
export declare namespace Serializer {
    const writeFields: <FIELDS extends Fields>(output: DataOutput, fields: FIELDS) => void;
    const readFields: <FIELDS extends Fields>(input: DataInput, fields: FIELDS) => void;
}
//# sourceMappingURL=serializer.d.ts.map