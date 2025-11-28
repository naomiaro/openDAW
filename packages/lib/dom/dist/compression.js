export var Compression;
(function (Compression) {
    Compression.encode = async (buffer, format = "gzip") => {
        const stream = new CompressionStream(format);
        const writer = stream.writable.getWriter();
        writer.write(new Uint8Array(buffer));
        writer.close();
        return new Response(stream.readable).arrayBuffer();
    };
    Compression.decode = async (buffer, format = "gzip") => {
        const stream = new DecompressionStream(format);
        const writer = stream.writable.getWriter();
        writer.write(new Uint8Array(buffer));
        writer.close();
        return new Response(stream.readable).arrayBuffer();
    };
})(Compression || (Compression = {}));
