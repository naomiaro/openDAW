import { PointerField, PointerTypes } from "./pointer";
import { Vertex } from "./vertex";
import { int, Option, Subscription } from "@opendaw/lib-std";
export interface PointerListener {
    onAdded(pointer: PointerField): void;
    onRemoved(pointer: PointerField): void;
}
export declare class PointerHub {
    #private;
    static validate(pointer: PointerField, target: Vertex): Option<string>;
    constructor(vertex: Vertex);
    subscribe(listener: PointerListener, ...filter: ReadonlyArray<PointerTypes>): Subscription;
    catchupAndSubscribe(listener: PointerListener, ...filter: ReadonlyArray<PointerTypes>): Subscription;
    filter<P extends PointerTypes>(...types: ReadonlyArray<P>): Array<PointerField<P>>;
    size(): int;
    isEmpty(): boolean;
    nonEmpty(): boolean;
    contains(pointer: PointerField): boolean;
    incoming(): ReadonlyArray<PointerField>;
    onAdded(pointerField: PointerField): void;
    onRemoved(pointerField: PointerField): void;
    toString(): string;
}
//# sourceMappingURL=pointer-hub.d.ts.map