import { Option } from "@opendaw/lib-std";
import { Messenger } from "@opendaw/lib-runtime";
import type { OpfsProtocol, SamplePeakProtocol } from "@opendaw/lib-fusion";
export declare class Workers {
    static install(url: string): Promise<void>;
    static messenger: Option<Messenger>;
    static get Peak(): SamplePeakProtocol;
    static get Opfs(): OpfsProtocol;
}
//# sourceMappingURL=Workers.d.ts.map