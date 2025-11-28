export var Stream;
(function (Stream) {
    Stream.read = async (reader) => {
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            chunks.push(value);
        }
        const length = chunks.reduce((acc, val) => acc + val.length, 0);
        const output = new Uint8Array(length);
        let position = 0 | 0;
        for (let chunk of chunks) {
            output.set(chunk, position);
            position += chunk.length;
        }
        return output.buffer;
    };
})(Stream || (Stream = {}));
