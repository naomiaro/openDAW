import { AssertType } from "@opendaw/lib-std";
import { Groove } from "@opendaw/lib-dsp";
import { BoxAdapter } from "../BoxAdapter";
export interface GrooveAdapter extends BoxAdapter, Groove {
    type: "groove-adapter";
}
export declare namespace GrooveAdapter {
    const checkType: AssertType<GrooveAdapter>;
}
//# sourceMappingURL=GrooveBoxAdapter.d.ts.map