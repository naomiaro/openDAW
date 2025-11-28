import { Procedure, Provider } from "./lang";
import { Schema } from "./schema";
export declare namespace SyncStream {
    interface Writer {
        readonly tryWrite: Provider<boolean>;
    }
    interface Reader {
        readonly buffer: SharedArrayBuffer;
        readonly tryRead: Provider<boolean>;
    }
    const writer: <T extends object>(io: Schema.IO<T>, buffer: SharedArrayBuffer, populate: Procedure<T>) => Writer;
    const reader: <T extends object>(io: Schema.IO<T>, procedure: Procedure<T>) => Reader;
}
//# sourceMappingURL=sync-stream.d.ts.map