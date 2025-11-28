import { Address, Box } from "@opendaw/lib-box";
import * as Y from "yjs";
export declare namespace YMapper {
    const createBoxMap: (box: Box) => Y.Map<unknown>;
    const applyFromBoxMap: (box: Box, source: Y.Map<unknown>) => void;
    const pathToAddress: ([uuidAsString, _, ...fieldKeysFromPath]: ReadonlyArray<string | number>, leafKey: string) => Address;
    const findMap: (map: Y.Map<unknown>, fieldKeys: ReadonlyArray<string | number>) => Y.Map<unknown>;
}
//# sourceMappingURL=YMapper.d.ts.map