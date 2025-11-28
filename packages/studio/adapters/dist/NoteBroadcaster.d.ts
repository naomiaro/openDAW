import { LiveStreamBroadcaster } from "@opendaw/lib-fusion";
import { Address } from "@opendaw/lib-box";
import { int, Terminable } from "@opendaw/lib-std";
export declare class NoteBroadcaster implements Terminable {
    #private;
    constructor(broadcaster: LiveStreamBroadcaster, address: Address);
    noteOn(note: int): void;
    noteOff(note: int): void;
    reset(): void;
    clear(): void;
    terminate(): void;
    toString(): string;
}
//# sourceMappingURL=NoteBroadcaster.d.ts.map