import { Field } from "./field";
import { Class, int } from "@opendaw/lib-std";
import { Int32Field } from "./primitive";
import { Box } from "./box";
/**
 * Utility functions for managing indexed box collections with automatic index adjustment.
 */
export type IndexedBox = Box & Record<"index", Int32Field>;
export declare namespace IndexedBox {
    const insertOrder: (field: Field, insertIndex?: int) => int;
    const removeOrder: (field: Field, removeIndex: int) => void;
    const moveIndex: (field: Field, startIndex: int, delta: int) => void;
    const isIndexedBox: (box: Box) => box is IndexedBox;
    const collectIndexedBoxes: <B extends IndexedBox>(field: Field, type?: Class<B>) => ReadonlyArray<B>;
}
//# sourceMappingURL=indexed-box.d.ts.map