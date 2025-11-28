import { Box, BoxGraph } from "@opendaw/lib-box";
import { BoxIO } from "@opendaw/studio-boxes";
import { DeviceBox } from "@opendaw/studio-adapters";
export declare namespace DeviceIO {
    const exportDevice: (box: Box) => ArrayBufferLike;
    const importDevice: (boxGraph: BoxGraph<BoxIO.TypeMap>, buffer: ArrayBufferLike) => DeviceBox;
}
//# sourceMappingURL=DeviceIO.d.ts.map