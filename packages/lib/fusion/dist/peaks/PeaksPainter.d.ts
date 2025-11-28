import { int } from "@opendaw/lib-std";
import { Peaks } from "./Peaks";
export declare namespace PeaksPainter {
    interface Layout {
        x0: number;
        x1: number;
        u0: number;
        u1: number;
        y0: number;
        y1: number;
        v0: number;
        v1: number;
    }
    const renderBlocks: (path: CanvasRenderingContext2D, peaks: Peaks, channelIndex: int, { u0, u1, v0, v1, x0, x1, y0, y1 }: Layout) => void;
}
//# sourceMappingURL=PeaksPainter.d.ts.map