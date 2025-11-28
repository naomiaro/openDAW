import { assert, ByteArrayInput, ByteArrayOutput, isUndefined, tryCatch } from "@opendaw/lib-std";
export var Serializer;
(function (Serializer) {
    const MAGIC_HEADER = 0x464c4453;
    Serializer.writeFields = (output, fields) => {
        const entries = Object.entries(fields).filter(([_, field]) => !field.deprecated);
        output.writeInt(MAGIC_HEADER);
        output.writeShort(entries.length);
        entries.forEach(([key, field]) => {
            const bytes = ByteArrayOutput.create();
            field.write(bytes);
            const buffer = new Int8Array(bytes.toArrayBuffer());
            output.writeShort(Number(key));
            output.writeInt(buffer.length);
            output.writeBytes(buffer);
        });
    };
    Serializer.readFields = (input, fields) => {
        assert(input.readInt() === MAGIC_HEADER, "Serializer header is corrupt");
        const numFields = input.readShort();
        for (let i = 0; i < numFields; i++) {
            const key = input.readShort();
            if (isUndefined(fields[key])) {
                continue;
            }
            const byteLength = input.readInt();
            const bytes = new Int8Array(byteLength);
            input.readBytes(bytes);
            const { status, error } = tryCatch(() => fields[key]?.read(new ByteArrayInput(bytes.buffer)));
            if (status === "failure") {
                console.warn(fields, error);
            }
        }
    };
})(Serializer || (Serializer = {}));
