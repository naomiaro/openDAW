import { SoundfontFileBox } from "@opendaw/studio-boxes";
import { Option, UUID } from "@opendaw/lib-std";
import { Address } from "@opendaw/lib-box";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { BoxAdapter } from "../BoxAdapter";
import { SoundfontLoader } from "./SoundfontLoader";
import type { SoundFont2 } from "soundfont2";
export declare class SoundfontFileBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: SoundfontFileBox);
    get box(): SoundfontFileBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get soundfont(): Option<SoundFont2>;
    getOrCreateLoader(): SoundfontLoader;
    terminate(): void;
}
//# sourceMappingURL=SoundfontFileBoxAdapter.d.ts.map