import { int } from "@opendaw/lib-std";
import { TimelineRange } from "./TimelineRange";
export declare namespace TimeGrid {
    type Signature = [int, int];
    type Options = {
        minLength?: number;
    };
    type Fragment = {
        bars: int;
        beats: int;
        ticks: int;
        isBar: boolean;
        isBeat: boolean;
        pulse: number;
    };
    type Designer = (fragment: Fragment) => void;
    const fragment: ([nominator, denominator]: Signature, range: TimelineRange, designer: Designer, options?: Options) => void;
}
//# sourceMappingURL=TimeGrid.d.ts.map