import { Address } from "@opendaw/lib-box";
import { GrooveShuffleBox } from "@opendaw/studio-boxes";
import { int, UUID } from "@opendaw/lib-std";
import { ppqn } from "@opendaw/lib-dsp";
import { GrooveAdapter } from "./GrooveBoxAdapter";
import { BoxAdaptersContext } from "../BoxAdaptersContext";
export declare class GrooveShuffleBoxAdapter implements GrooveAdapter {
    #private;
    static readonly Durations: ReadonlyArray<[int, int]>;
    static readonly DurationPPQNs: ReadonlyArray<int>;
    static readonly DurationStrings: ReadonlyArray<string>;
    readonly type = "groove-adapter";
    readonly namedParameter: {
        readonly duration: import("..").AutomatableParameterFieldAdapter<number>;
        readonly amount: import("..").AutomatableParameterFieldAdapter<number>;
    };
    constructor(context: BoxAdaptersContext, box: GrooveShuffleBox);
    unwarp(position: ppqn): ppqn;
    warp(position: ppqn): ppqn;
    get box(): GrooveShuffleBox;
    get uuid(): UUID.Bytes;
    get address(): Address;
    terminate(): void;
}
//# sourceMappingURL=GrooveShuffleBoxAdapter.d.ts.map