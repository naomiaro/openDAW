import { AudioFileBox } from "@opendaw/studio-boxes";
import { Option, UUID } from "@opendaw/lib-std";
import { Peaks } from "@opendaw/lib-fusion";
import { AudioData } from "./AudioData";
import { Address } from "@opendaw/lib-box";
import { SampleLoader } from "../sample/SampleLoader";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
import { BoxAdapter } from "../BoxAdapter";
export declare class AudioFileBoxAdapter implements BoxAdapter {
    #private;
    constructor(context: BoxAdaptersContext, box: AudioFileBox);
    get box(): AudioFileBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    get startInSeconds(): number;
    get endInSeconds(): number;
    get data(): Option<AudioData>;
    get peaks(): Option<Peaks>;
    getOrCreateLoader(): SampleLoader;
    terminate(): void;
}
//# sourceMappingURL=AudioFileBoxAdapter.d.ts.map