import { ByteArrayInput, ByteArrayOutput } from "./data";
import { panic } from "./lang";
export var SyncStream;
(function (SyncStream) {
    let State;
    (function (State) {
        State[State["READING"] = 0] = "READING";
        State[State["READ"] = 1] = "READ";
        State[State["WRITING"] = 2] = "WRITING";
        State[State["WRITTEN"] = 3] = "WRITTEN";
    })(State || (State = {}));
    SyncStream.writer = (io, buffer, populate) => {
        if (io.bytesTotal + 1 > buffer.byteLength) {
            return panic("Insufficient memory allocated.");
        }
        const array = new Uint8Array(buffer);
        const output = ByteArrayOutput.use(buffer, 1);
        Atomics.store(array, 0, State.READ);
        return {
            tryWrite: () => {
                if (Atomics.compareExchange(array, 0, State.READ, State.WRITING) === State.WRITING) {
                    populate(io.object);
                    output.position = 0;
                    io.write(output);
                    Atomics.store(array, 0, State.WRITTEN);
                    return true;
                }
                return false;
            }
        };
    };
    SyncStream.reader = (io, procedure) => {
        const buffer = new SharedArrayBuffer(io.bytesTotal + 1);
        const array = new Uint8Array(buffer);
        const input = new ByteArrayInput(buffer, 1);
        return {
            buffer,
            tryRead: () => {
                if (Atomics.compareExchange(array, 0, State.WRITTEN, State.READING) === State.READING) {
                    input.position = 0;
                    io.read(input);
                    procedure(io.object);
                    Atomics.store(array, 0, State.READ);
                    return true;
                }
                return false;
            }
        };
    };
})(SyncStream || (SyncStream = {}));
